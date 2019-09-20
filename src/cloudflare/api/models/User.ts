export interface UserRequest {
    success:  boolean;
    errors:   any[];
    messages: any[];
    result:   User;
}

export interface User {
    id:                                string;
    email:                             string;
    first_name:                        string;
    last_name:                         string;
    username:                          string;
    telephone:                         string;
    country:                           string;
    zipcode:                           string;
    created_on:                        Date;
    modified_on:                       Date;
    two_factor_authentication_enabled: boolean;
    suspended:                         boolean;
}
