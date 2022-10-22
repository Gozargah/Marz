package main

import (
	"context"

	"github.com/gozargah/marz/server"
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

func (a *App) RunServer() {
	server.RunServer()
}
