import { DNSRecord } from '@/cloudflare/api/models/DNSRecords';
import { Zones } from '@/cloudflare/api/models/Zones';

export default class Config{
    public cloudflareEmail: string = '';
    public cloudflareAPIKey: string = '';
    public ipv4UrlService: string = 'https://api.ipify.org';
    public ipv6UrlService: string = 'https://api6.ipify.org';
    public autostart: boolean = false;
    public startMinmized: boolean = false;
    public selectedDNSRecords: DNSRecord[] = [];
    public selectedZones: Zones[] = [];
    public selectedNetworkInterfaces: string[] = [];
    public configVersion = 1;

}