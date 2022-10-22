package server

import (
	"context"
	"fmt"
	"net/netip"
	"os"
	"os/signal"
	runtimeDebug "runtime/debug"
	"syscall"

	"github.com/labstack/gommon/log"
	box "github.com/sagernet/sing-box"
	"github.com/sagernet/sing-box/option"
	dns "github.com/sagernet/sing-dns"
)

var ConnectedId string
var ctx context.Context
var cancel context.CancelFunc
var instance *box.Box
var running bool

func Disconnect() {
	if cancel != nil {
		fmt.Println("Cancelling")
		cancel()
	}
	if instance != nil {
		fmt.Println("Closing")
		instance.Close()
	}
	running = false
	ConnectedId = ""
}

func RunServer(server option.Outbound) {
	osSignals := make(chan os.Signal, 1)
	signal.Notify(osSignals, os.Interrupt, syscall.SIGTERM, syscall.SIGHUP)

	prefix, err := netip.ParsePrefix("172.19.0.1/30")
	if err != nil {
		panic(err)
	}
	x := option.ListenPrefix(prefix)
	ctx, cancel = context.WithCancel(context.Background())
	instance, err = box.New(ctx, option.Options{
		DNS: &option.DNSOptions{
			Servers: []option.DNSServerOptions{
				{
					Tag:     "google",
					Address: "tls://8.8.8.8",
				},
			},
			DNSClientOptions: option.DNSClientOptions{
				Strategy: option.DomainStrategy(dns.DomainStrategyUseIPv4),
			},
		},
		Inbounds: []option.Inbound{
			{
				Type: "tun",
				TunOptions: option.TunInboundOptions{
					AutoRoute:    true,
					Inet4Address: &x,
					InboundOptions: option.InboundOptions{
						SniffEnabled: false,
					},
				},
			},
		},
		Outbounds: []option.Outbound{
			server,
			{
				Type: "direct",
				Tag:  "direct",
			},
			{
				Type: "block",
				Tag:  "block",
			},
			{
				Type: "dns",
				Tag:  "dns-out",
			},
		},
		Route: &option.RouteOptions{
			AutoDetectInterface: true,
			Rules: []option.Rule{
				{
					DefaultOptions: option.DefaultRule{
						Protocol: option.Listable[string]{"dns"},
						Outbound: "dns-out",
					},
				},
				{
					DefaultOptions: option.DefaultRule{
						Geosite:  option.Listable[string]{"category-ads-all"},
						Outbound: "block",
					},
				},
				{
					DefaultOptions: option.DefaultRule{
						Geosite:  option.Listable[string]{"cn"},
						Outbound: "direct",
						GeoIP:    option.Listable[string]{"cn"},
					},
				},
			},
		},
	})
	if err != nil {
		cancel()
		panic(err)
	}
	err = instance.Start()
	if err != nil {
		cancel()
		fmt.Println(err)
	}
	running = true
	runtimeDebug.FreeOSMemory()
	for {
		if !running {
			Disconnect()
			break
		}
		osSignal := <-osSignals
		if osSignal == syscall.SIGHUP {
			if err != nil {
				log.Error(err)
				continue
			}
		}
		Disconnect()
		if osSignal != syscall.SIGHUP {
			panic("end")
		}
		break
	}
}
