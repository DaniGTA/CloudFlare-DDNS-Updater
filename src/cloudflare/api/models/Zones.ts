export interface Zones {
    success:  boolean;
    errors:   any[];
    messages: any[];
    result:   Result[];
}

export interface Result {
    id:                    string;
    name:                  string;
    development_mode:      number;
    original_name_servers: string[];
    original_registrar:    string;
    original_dnshost:      string;
    created_on:            Date;
    modified_on:           Date;
    activated_on:          Date;
    owner:                 Owner;
    account:               Account;
    permissions:           string[];
    plan:                  Plan;
    plan_pending:          Plan;
    status:                string;
    paused:                boolean;
    type:                  string;
    name_servers:          string[];
}

export interface Account {
    id:   string;
    name: string;
}

export interface Owner {
    id:    Email;
    email: Email;
    type:  string;
}

export interface Email {
}

export interface Plan {
    id:            string;
    name:          string;
    price:         number;
    currency:      string;
    frequency:     string;
    legacy_id:     string;
    is_subscribed: boolean;
    can_subscribe: boolean;
}
