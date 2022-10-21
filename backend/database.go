package backend

import (
	"log"
	"os"
	"path/filepath"
	"runtime"

	"github.com/xujiajun/nutsdb"
)

var db *nutsdb.DB
var bucket = "servers"

func UserHomeDir() string {
	if runtime.GOOS == "windows" {
		home := os.Getenv("HOMEDRIVE") + os.Getenv("HOMEPATH")
		if home == "" {
			home = os.Getenv("USERPROFILE")
		}
		return home
	}
	return os.Getenv("HOME")
}

func InitializeDB() {
	home := UserHomeDir()
	configDir := filepath.Join(home, ".marz")
	if _, err := os.Stat(configDir); os.IsNotExist(err) {
		os.MkdirAll(configDir, os.ModePerm)
	}

	con, err := nutsdb.Open(
		nutsdb.DefaultOptions,
		nutsdb.WithDir(configDir),
	)
	if err != nil {
		log.Fatal(err)
	}
	db = con
}

func AddServer(serverKey string, serverString string) {
	if err := db.Update(
		func(tx *nutsdb.Tx) error {
			key := []byte(serverKey)
			val := []byte(serverString)
			return tx.RPush(bucket, key, val)
		}); err != nil {
		log.Fatal(err)
	}
}

func GetAllServers() [][]byte {
	var servers [][]byte
	if err := db.View(
		func(tx *nutsdb.Tx) error {
			prefix := []byte("")
			if entries, _, err := tx.PrefixScan(bucket, prefix, 0, 100); err != nil {
				return err
			} else {
				for _, entry := range entries {
					servers = append(servers, entry.Value)
				}
			}
			return nil
		}); err != nil {
		log.Fatal(err)
	}
	return servers
}
