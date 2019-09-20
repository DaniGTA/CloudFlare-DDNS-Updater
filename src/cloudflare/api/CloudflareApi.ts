
import request from 'request';
import { Zones } from './models/Zones';
import { DNSRecords, DNSRecord } from './models/DNSRecords';
import { UserRequest } from './models/User';
import ConfigManager from '@/config/ConfigManager';

export default class CloudflareApi{
    async getZones():Promise<Zones> {
        return this.webRequest<Zones>('zones?status=active&page=1&per_page=50&order=status&direction=desc&match=all');
    }

    async getDNSRecords(): Promise<DNSRecord[]>{
        let dnsRecords:DNSRecord[] = [];
        const zones = await this.getZones();
        for (const zone of zones.result) {  
            const result = await this.webRequest<DNSRecords>('zones/' + zone.id + '/dns_records');
            dnsRecords.push(...result.result);
        }
        return dnsRecords;
    }

    async updateDNSRecord(dnsRecord:DNSRecord) {
        
    }

    isLoggedIn(): boolean {
        const config = new ConfigManager().config;
        if (config.cloudflareAPIKey && config.cloudflareEmail) {
            return true;
        }
        return false;
    }

    async checkLogin(email: string, key: string): Promise<boolean> {
        try {
            const result = await this.webRequest<UserRequest>('user', email, key);
            if (result.success) {
                const config = new ConfigManager().config;
                config.cloudflareAPIKey = key;
                config.cloudflareEmail = email;
                await new ConfigManager().saveChanges(config);
                return true;
            }
        } catch (err) {
            console.log(err);
        }
        return false;
        
    } 

    async webRequest<T>(url: string, email: string = "", key: string = ""): Promise<T> {
        const config = new ConfigManager().config;
        if (!email && !key) {
            email = config.cloudflareEmail;
            key = config.cloudflareAPIKey;
        }
        const header = {
            'X-Auth-Email': email,
            'X-Auth-Key': key,
            'Content-Type': 'application/json'
        }
        return new Promise<T>((resolve, reject) => {
            request(url, { headers: header, baseUrl: 'https://api.cloudflare.com/client/v4/' }, (error, response, body) => {
                if (response.statusCode != 200) {
                    console.log('CF:'+response.statusCode);
                    console.log('CF:' + error);
                    reject(error);
                }
                resolve(JSON.parse(body) as T);
            });
        })
        
 
    }
}