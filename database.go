package main

import (
	"os"
	"path/filepath"
	"runtime"

	c "github.com/ostafen/clover"
	"github.com/sagernet/sing-box/option"
)

var db *c.DB
var configDir string

func closeDB() {
	if db != nil {
		db.Close()
	}
}

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
	configDir = filepath.Join(home, ".marz")
	if _, err := os.Stat(configDir); os.IsNotExist(err) {
		os.MkdirAll(configDir, os.ModePerm)
	}

	con, _ := c.Open(configDir)
	db = con
	db.ImportCollection("servers", filepath.Join(configDir, "servers.json"))
}

func AddServer(serverNames string, newServer option.Outbound) {
	hasCollection, _ := db.HasCollection("servers")
	if !hasCollection {
		db.CreateCollection("servers")
	}
	server := c.NewDocument()
	server.Set("server_options", newServer)
	server.Set("name", serverNames)
	db.InsertOne("servers", server)

	err := db.ExportCollection("servers", filepath.Join(configDir, "servers.json"))
	if err != nil {
		panic(err)
	}
}

var empty []interface{}

func GetAllServers() []interface{} {
	docs, _ := db.Query("servers").FindAll()
	servers := empty

	for _, doc := range docs {
		todo := &struct {
			Id            string      `clover:"_id"`
			Name          string      `clover:"name"`
			ServerOptions interface{} `clover:"server_options"`
		}{}
		doc.Unmarshal(todo)
		servers = append(servers, todo)
	}

	return servers
}

func RemoveServer(id string) {
	db.Query("servers").DeleteById(id)
}
