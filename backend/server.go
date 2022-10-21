package backend

import (
	"context"
	"fmt"
	"net/netip"
	"os"
	"os/signal"
	runtimeDebug "runtime/debug"
	"syscall"

	E "github.com/sagernet/sing/common/exceptions"

	box "github.com/sagernet/sing-box"
	"github.com/sagernet/sing-box/log"
	"github.com/sagernet/sing-box/option"
	dns "github.com/sagernet/sing-dns"
)

func RunServer() {
	osSignals := make(chan os.Signal, 1)
	signal.Notify(osSignals, os.Interrupt, syscall.SIGTERM, syscall.SIGHUP)

	prefix, err := netip.ParsePrefix("172.19.0.1/30")
	if err != nil {
		panic(err)
	}
	x := option.ListenPrefix(prefix)
	ctx, cancel := context.WithCancel(context.Background())
	instance, err := box.New(ctx, option.Options{
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
			{
				Type: "vmess",
				Tag:  "vmess",
				VMessOptions: option.VMessOutboundOptions{
					UUID: "eb5a1e79-d557-45da-a960-ab979c820e20",
					ServerOptions: option.ServerOptions{
						Server:     "185.142.156.232",
						ServerPort: 443,
					},
					Security: "auto",
					AlterId:  0,
					Transport: &option.V2RayTransportOptions{
						Type: "ws",
					},
				},
			},
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
	runtimeDebug.FreeOSMemory()
	for {
		osSignal := <-osSignals
		if osSignal == syscall.SIGHUP {
			if err != nil {
				log.Error(E.Cause(err, "reload service"))
				continue
			}
		}
		fmt.Println("asdf")
		cancel()
		instance.Close()
		if osSignal != syscall.SIGHUP {
			panic("end")
		}
		break
	}

}
