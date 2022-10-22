package main

import (
	"context"

	"github.com/gozargah/marz/server"
	"github.com/mitchellh/mapstructure"
	"github.com/sagernet/sing-box/option"
)

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	InitializeDB()
	a.ctx = ctx
}

func (a *App) GetAllServers() []interface{} {
	return GetAllServers()
}

func (a *App) AddServer(serverNames string, server option.Outbound) {
	AddServer(serverNames, server)
}

func (a *App) RemoveServer(serverId string) {
	RemoveServer(serverId)
}

func (a *App) RunServer(id string) {
	doc, _ := db.Query("servers").FindById(id)
	var s option.Outbound
	mapstructure.Decode(doc.Get("server_options"), &s)
	go server.RunServer(s)
	server.ConnectedId = id
}

func (a *App) Disconnect() {
	server.Disconnect()
}
