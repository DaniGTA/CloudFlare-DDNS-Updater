export interface DNSRecords {
    success:  boolean;
    errors:   any[];
    messages: any[];
    result:   DNSRecord[];
}

export interface DNSRecord {
    id:          string;
    type:        string;
    name:        string;
    content:     string;
    proxiable:   boolean;
    proxied:     boolean;
    ttl:         Data;
    locked:      boolean;
    zone_id:     string;
    zone_name:   string;
    created_on:  Date;
    modified_on: Date;
    data:        Data;
}

export interface Data {
}
