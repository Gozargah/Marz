export namespace option {
	
	export class DirectOutboundOptions {
	    detour?: string;
	    bind_interface?: string;
	    // Go type: ListenAddress
	    bind_address?: any;
	    protect_path?: string;
	    routing_mark?: number;
	    reuse_addr?: boolean;
	    connect_timeout?: number;
	    tcp_fast_open?: boolean;
	    domain_strategy?: number;
	    fallback_delay?: number;
	    override_address?: string;
	    override_port?: number;
	    proxy_protocol?: number;
	
	    static createFrom(source: any = {}) {
	        return new DirectOutboundOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.detour = source["detour"];
	        this.bind_interface = source["bind_interface"];
	        this.bind_address = this.convertValues(source["bind_address"], null);
	        this.protect_path = source["protect_path"];
	        this.routing_mark = source["routing_mark"];
	        this.reuse_addr = source["reuse_addr"];
	        this.connect_timeout = source["connect_timeout"];
	        this.tcp_fast_open = source["tcp_fast_open"];
	        this.domain_strategy = source["domain_strategy"];
	        this.fallback_delay = source["fallback_delay"];
	        this.override_address = source["override_address"];
	        this.override_port = source["override_port"];
	        this.proxy_protocol = source["proxy_protocol"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class OutboundTLSOptions {
	    enabled?: boolean;
	    disable_sni?: boolean;
	    server_name?: string;
	    insecure?: boolean;
	    alpn?: string[];
	    min_version?: string;
	    max_version?: string;
	    cipher_suites?: string[];
	    certificate?: string;
	    certificate_path?: string;
	
	    static createFrom(source: any = {}) {
	        return new OutboundTLSOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.enabled = source["enabled"];
	        this.disable_sni = source["disable_sni"];
	        this.server_name = source["server_name"];
	        this.insecure = source["insecure"];
	        this.alpn = source["alpn"];
	        this.min_version = source["min_version"];
	        this.max_version = source["max_version"];
	        this.cipher_suites = source["cipher_suites"];
	        this.certificate = source["certificate"];
	        this.certificate_path = source["certificate_path"];
	    }
	}
	export class HTTPOutboundOptions {
	    detour?: string;
	    bind_interface?: string;
	    // Go type: ListenAddress
	    bind_address?: any;
	    protect_path?: string;
	    routing_mark?: number;
	    reuse_addr?: boolean;
	    connect_timeout?: number;
	    tcp_fast_open?: boolean;
	    domain_strategy?: number;
	    fallback_delay?: number;
	    server: string;
	    server_port: number;
	    username?: string;
	    password?: string;
	    tls?: OutboundTLSOptions;
	
	    static createFrom(source: any = {}) {
	        return new HTTPOutboundOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.detour = source["detour"];
	        this.bind_interface = source["bind_interface"];
	        this.bind_address = this.convertValues(source["bind_address"], null);
	        this.protect_path = source["protect_path"];
	        this.routing_mark = source["routing_mark"];
	        this.reuse_addr = source["reuse_addr"];
	        this.connect_timeout = source["connect_timeout"];
	        this.tcp_fast_open = source["tcp_fast_open"];
	        this.domain_strategy = source["domain_strategy"];
	        this.fallback_delay = source["fallback_delay"];
	        this.server = source["server"];
	        this.server_port = source["server_port"];
	        this.username = source["username"];
	        this.password = source["password"];
	        this.tls = this.convertValues(source["tls"], OutboundTLSOptions);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class HysteriaOutboundOptions {
	    detour?: string;
	    bind_interface?: string;
	    // Go type: ListenAddress
	    bind_address?: any;
	    protect_path?: string;
	    routing_mark?: number;
	    reuse_addr?: boolean;
	    connect_timeout?: number;
	    tcp_fast_open?: boolean;
	    domain_strategy?: number;
	    fallback_delay?: number;
	    server: string;
	    server_port: number;
	    up?: string;
	    up_mbps?: number;
	    down?: string;
	    down_mbps?: number;
	    obfs?: string;
	    auth?: number[];
	    auth_str?: string;
	    recv_window_conn?: number;
	    recv_window?: number;
	    disable_mtu_discovery?: boolean;
	    network?: string;
	    tls?: OutboundTLSOptions;
	
	    static createFrom(source: any = {}) {
	        return new HysteriaOutboundOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.detour = source["detour"];
	        this.bind_interface = source["bind_interface"];
	        this.bind_address = this.convertValues(source["bind_address"], null);
	        this.protect_path = source["protect_path"];
	        this.routing_mark = source["routing_mark"];
	        this.reuse_addr = source["reuse_addr"];
	        this.connect_timeout = source["connect_timeout"];
	        this.tcp_fast_open = source["tcp_fast_open"];
	        this.domain_strategy = source["domain_strategy"];
	        this.fallback_delay = source["fallback_delay"];
	        this.server = source["server"];
	        this.server_port = source["server_port"];
	        this.up = source["up"];
	        this.up_mbps = source["up_mbps"];
	        this.down = source["down"];
	        this.down_mbps = source["down_mbps"];
	        this.obfs = source["obfs"];
	        this.auth = source["auth"];
	        this.auth_str = source["auth_str"];
	        this.recv_window_conn = source["recv_window_conn"];
	        this.recv_window = source["recv_window"];
	        this.disable_mtu_discovery = source["disable_mtu_discovery"];
	        this.network = source["network"];
	        this.tls = this.convertValues(source["tls"], OutboundTLSOptions);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class MultiplexOptions {
	    enabled?: boolean;
	    protocol?: string;
	    max_connections?: number;
	    min_streams?: number;
	    max_streams?: number;
	
	    static createFrom(source: any = {}) {
	        return new MultiplexOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.enabled = source["enabled"];
	        this.protocol = source["protocol"];
	        this.max_connections = source["max_connections"];
	        this.min_streams = source["min_streams"];
	        this.max_streams = source["max_streams"];
	    }
	}
	export class Outbound {
	    type: string;
	    tag?: string;
	
	    static createFrom(source: any = {}) {
	        return new Outbound(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.type = source["type"];
	        this.tag = source["tag"];
	    }
	}
	
	export class SSHOutboundOptions {
	    detour?: string;
	    bind_interface?: string;
	    // Go type: ListenAddress
	    bind_address?: any;
	    protect_path?: string;
	    routing_mark?: number;
	    reuse_addr?: boolean;
	    connect_timeout?: number;
	    tcp_fast_open?: boolean;
	    domain_strategy?: number;
	    fallback_delay?: number;
	    server: string;
	    server_port: number;
	    user?: string;
	    password?: string;
	    private_key?: string;
	    private_key_path?: string;
	    private_key_passphrase?: string;
	    host_key_algorithms?: string[];
	    client_version?: string;
	
	    static createFrom(source: any = {}) {
	        return new SSHOutboundOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.detour = source["detour"];
	        this.bind_interface = source["bind_interface"];
	        this.bind_address = this.convertValues(source["bind_address"], null);
	        this.protect_path = source["protect_path"];
	        this.routing_mark = source["routing_mark"];
	        this.reuse_addr = source["reuse_addr"];
	        this.connect_timeout = source["connect_timeout"];
	        this.tcp_fast_open = source["tcp_fast_open"];
	        this.domain_strategy = source["domain_strategy"];
	        this.fallback_delay = source["fallback_delay"];
	        this.server = source["server"];
	        this.server_port = source["server_port"];
	        this.user = source["user"];
	        this.password = source["password"];
	        this.private_key = source["private_key"];
	        this.private_key_path = source["private_key_path"];
	        this.private_key_passphrase = source["private_key_passphrase"];
	        this.host_key_algorithms = source["host_key_algorithms"];
	        this.client_version = source["client_version"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class SelectorOutboundOptions {
	    outbounds: string[];
	    default?: string;
	
	    static createFrom(source: any = {}) {
	        return new SelectorOutboundOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.outbounds = source["outbounds"];
	        this.default = source["default"];
	    }
	}
	export class ShadowTLSOutboundOptions {
	    detour?: string;
	    bind_interface?: string;
	    // Go type: ListenAddress
	    bind_address?: any;
	    protect_path?: string;
	    routing_mark?: number;
	    reuse_addr?: boolean;
	    connect_timeout?: number;
	    tcp_fast_open?: boolean;
	    domain_strategy?: number;
	    fallback_delay?: number;
	    server: string;
	    server_port: number;
	    tls?: OutboundTLSOptions;
	
	    static createFrom(source: any = {}) {
	        return new ShadowTLSOutboundOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.detour = source["detour"];
	        this.bind_interface = source["bind_interface"];
	        this.bind_address = this.convertValues(source["bind_address"], null);
	        this.protect_path = source["protect_path"];
	        this.routing_mark = source["routing_mark"];
	        this.reuse_addr = source["reuse_addr"];
	        this.connect_timeout = source["connect_timeout"];
	        this.tcp_fast_open = source["tcp_fast_open"];
	        this.domain_strategy = source["domain_strategy"];
	        this.fallback_delay = source["fallback_delay"];
	        this.server = source["server"];
	        this.server_port = source["server_port"];
	        this.tls = this.convertValues(source["tls"], OutboundTLSOptions);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class ShadowsocksOutboundOptions {
	    detour?: string;
	    bind_interface?: string;
	    // Go type: ListenAddress
	    bind_address?: any;
	    protect_path?: string;
	    routing_mark?: number;
	    reuse_addr?: boolean;
	    connect_timeout?: number;
	    tcp_fast_open?: boolean;
	    domain_strategy?: number;
	    fallback_delay?: number;
	    server: string;
	    server_port: number;
	    method: string;
	    password: string;
	    network?: string;
	    udp_over_tcp?: boolean;
	    multiplex?: MultiplexOptions;
	
	    static createFrom(source: any = {}) {
	        return new ShadowsocksOutboundOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.detour = source["detour"];
	        this.bind_interface = source["bind_interface"];
	        this.bind_address = this.convertValues(source["bind_address"], null);
	        this.protect_path = source["protect_path"];
	        this.routing_mark = source["routing_mark"];
	        this.reuse_addr = source["reuse_addr"];
	        this.connect_timeout = source["connect_timeout"];
	        this.tcp_fast_open = source["tcp_fast_open"];
	        this.domain_strategy = source["domain_strategy"];
	        this.fallback_delay = source["fallback_delay"];
	        this.server = source["server"];
	        this.server_port = source["server_port"];
	        this.method = source["method"];
	        this.password = source["password"];
	        this.network = source["network"];
	        this.udp_over_tcp = source["udp_over_tcp"];
	        this.multiplex = this.convertValues(source["multiplex"], MultiplexOptions);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class SocksOutboundOptions {
	    detour?: string;
	    bind_interface?: string;
	    // Go type: ListenAddress
	    bind_address?: any;
	    protect_path?: string;
	    routing_mark?: number;
	    reuse_addr?: boolean;
	    connect_timeout?: number;
	    tcp_fast_open?: boolean;
	    domain_strategy?: number;
	    fallback_delay?: number;
	    server: string;
	    server_port: number;
	    version?: string;
	    username?: string;
	    password?: string;
	    network?: string;
	    udp_over_tcp?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new SocksOutboundOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.detour = source["detour"];
	        this.bind_interface = source["bind_interface"];
	        this.bind_address = this.convertValues(source["bind_address"], null);
	        this.protect_path = source["protect_path"];
	        this.routing_mark = source["routing_mark"];
	        this.reuse_addr = source["reuse_addr"];
	        this.connect_timeout = source["connect_timeout"];
	        this.tcp_fast_open = source["tcp_fast_open"];
	        this.domain_strategy = source["domain_strategy"];
	        this.fallback_delay = source["fallback_delay"];
	        this.server = source["server"];
	        this.server_port = source["server_port"];
	        this.version = source["version"];
	        this.username = source["username"];
	        this.password = source["password"];
	        this.network = source["network"];
	        this.udp_over_tcp = source["udp_over_tcp"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class TorOutboundOptions {
	    detour?: string;
	    bind_interface?: string;
	    // Go type: ListenAddress
	    bind_address?: any;
	    protect_path?: string;
	    routing_mark?: number;
	    reuse_addr?: boolean;
	    connect_timeout?: number;
	    tcp_fast_open?: boolean;
	    domain_strategy?: number;
	    fallback_delay?: number;
	    executable_path?: string;
	    extra_args?: string[];
	    data_directory?: string;
	    torrc?: {[key: string]: string};
	
	    static createFrom(source: any = {}) {
	        return new TorOutboundOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.detour = source["detour"];
	        this.bind_interface = source["bind_interface"];
	        this.bind_address = this.convertValues(source["bind_address"], null);
	        this.protect_path = source["protect_path"];
	        this.routing_mark = source["routing_mark"];
	        this.reuse_addr = source["reuse_addr"];
	        this.connect_timeout = source["connect_timeout"];
	        this.tcp_fast_open = source["tcp_fast_open"];
	        this.domain_strategy = source["domain_strategy"];
	        this.fallback_delay = source["fallback_delay"];
	        this.executable_path = source["executable_path"];
	        this.extra_args = source["extra_args"];
	        this.data_directory = source["data_directory"];
	        this.torrc = source["torrc"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class V2RayTransportOptions {
	    type?: string;
	
	    static createFrom(source: any = {}) {
	        return new V2RayTransportOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.type = source["type"];
	    }
	}
	export class TrojanOutboundOptions {
	    detour?: string;
	    bind_interface?: string;
	    // Go type: ListenAddress
	    bind_address?: any;
	    protect_path?: string;
	    routing_mark?: number;
	    reuse_addr?: boolean;
	    connect_timeout?: number;
	    tcp_fast_open?: boolean;
	    domain_strategy?: number;
	    fallback_delay?: number;
	    server: string;
	    server_port: number;
	    password: string;
	    network?: string;
	    tls?: OutboundTLSOptions;
	    multiplex?: MultiplexOptions;
	    transport?: V2RayTransportOptions;
	
	    static createFrom(source: any = {}) {
	        return new TrojanOutboundOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.detour = source["detour"];
	        this.bind_interface = source["bind_interface"];
	        this.bind_address = this.convertValues(source["bind_address"], null);
	        this.protect_path = source["protect_path"];
	        this.routing_mark = source["routing_mark"];
	        this.reuse_addr = source["reuse_addr"];
	        this.connect_timeout = source["connect_timeout"];
	        this.tcp_fast_open = source["tcp_fast_open"];
	        this.domain_strategy = source["domain_strategy"];
	        this.fallback_delay = source["fallback_delay"];
	        this.server = source["server"];
	        this.server_port = source["server_port"];
	        this.password = source["password"];
	        this.network = source["network"];
	        this.tls = this.convertValues(source["tls"], OutboundTLSOptions);
	        this.multiplex = this.convertValues(source["multiplex"], MultiplexOptions);
	        this.transport = this.convertValues(source["transport"], V2RayTransportOptions);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class V2RayGRPCOptions {
	    service_name?: string;
	
	    static createFrom(source: any = {}) {
	        return new V2RayGRPCOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.service_name = source["service_name"];
	    }
	}
	export class V2RayHTTPOptions {
	    host?: string[];
	    path?: string;
	    method?: string;
	    headers?: {[key: string]: string};
	
	    static createFrom(source: any = {}) {
	        return new V2RayHTTPOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.host = source["host"];
	        this.path = source["path"];
	        this.method = source["method"];
	        this.headers = source["headers"];
	    }
	}
	
	export class V2RayWebsocketOptions {
	    path?: string;
	    headers?: {[key: string]: string};
	    max_early_data?: number;
	    early_data_header_name?: string;
	
	    static createFrom(source: any = {}) {
	        return new V2RayWebsocketOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.path = source["path"];
	        this.headers = source["headers"];
	        this.max_early_data = source["max_early_data"];
	        this.early_data_header_name = source["early_data_header_name"];
	    }
	}
	export class VMessOutboundOptions {
	    detour?: string;
	    bind_interface?: string;
	    // Go type: ListenAddress
	    bind_address?: any;
	    protect_path?: string;
	    routing_mark?: number;
	    reuse_addr?: boolean;
	    connect_timeout?: number;
	    tcp_fast_open?: boolean;
	    domain_strategy?: number;
	    fallback_delay?: number;
	    server: string;
	    server_port: number;
	    uuid: string;
	    security: string;
	    alter_id?: number;
	    global_padding?: boolean;
	    authenticated_length?: boolean;
	    network?: string;
	    tls?: OutboundTLSOptions;
	    packet_addr?: boolean;
	    multiplex?: MultiplexOptions;
	    transport?: V2RayTransportOptions;
	
	    static createFrom(source: any = {}) {
	        return new VMessOutboundOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.detour = source["detour"];
	        this.bind_interface = source["bind_interface"];
	        this.bind_address = this.convertValues(source["bind_address"], null);
	        this.protect_path = source["protect_path"];
	        this.routing_mark = source["routing_mark"];
	        this.reuse_addr = source["reuse_addr"];
	        this.connect_timeout = source["connect_timeout"];
	        this.tcp_fast_open = source["tcp_fast_open"];
	        this.domain_strategy = source["domain_strategy"];
	        this.fallback_delay = source["fallback_delay"];
	        this.server = source["server"];
	        this.server_port = source["server_port"];
	        this.uuid = source["uuid"];
	        this.security = source["security"];
	        this.alter_id = source["alter_id"];
	        this.global_padding = source["global_padding"];
	        this.authenticated_length = source["authenticated_length"];
	        this.network = source["network"];
	        this.tls = this.convertValues(source["tls"], OutboundTLSOptions);
	        this.packet_addr = source["packet_addr"];
	        this.multiplex = this.convertValues(source["multiplex"], MultiplexOptions);
	        this.transport = this.convertValues(source["transport"], V2RayTransportOptions);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class WireGuardOutboundOptions {
	    detour?: string;
	    bind_interface?: string;
	    // Go type: ListenAddress
	    bind_address?: any;
	    protect_path?: string;
	    routing_mark?: number;
	    reuse_addr?: boolean;
	    connect_timeout?: number;
	    tcp_fast_open?: boolean;
	    domain_strategy?: number;
	    fallback_delay?: number;
	    server: string;
	    server_port: number;
	    local_address: string[];
	    private_key: string;
	    peer_public_key: string;
	    pre_shared_key?: string;
	    mtu?: number;
	    network?: string;
	
	    static createFrom(source: any = {}) {
	        return new WireGuardOutboundOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.detour = source["detour"];
	        this.bind_interface = source["bind_interface"];
	        this.bind_address = this.convertValues(source["bind_address"], null);
	        this.protect_path = source["protect_path"];
	        this.routing_mark = source["routing_mark"];
	        this.reuse_addr = source["reuse_addr"];
	        this.connect_timeout = source["connect_timeout"];
	        this.tcp_fast_open = source["tcp_fast_open"];
	        this.domain_strategy = source["domain_strategy"];
	        this.fallback_delay = source["fallback_delay"];
	        this.server = source["server"];
	        this.server_port = source["server_port"];
	        this.local_address = source["local_address"];
	        this.private_key = source["private_key"];
	        this.peer_public_key = source["peer_public_key"];
	        this.pre_shared_key = source["pre_shared_key"];
	        this.mtu = source["mtu"];
	        this.network = source["network"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

