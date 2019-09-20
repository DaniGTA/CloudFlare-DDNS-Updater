import CloudflareApi from '@/cloudflare/api/CloudflareApi';

export default class AutoUpdateTask{
    public static currentIPv4 = '';
    public static currentIPv6 = '';

    public static async startTask() {
        setInterval(AutoUpdateTask.checkEntrys,1000)
    }

    /**
     * Checks and Sets new ip.
     */
    private static async isNewIPAvaible(): Promise<boolean> {
        
        return false; 
    }

    private static async checkEntrys() {
        if (await AutoUpdateTask.isNewIPAvaible()) {
            console.log('New IP.')
            const cf = new CloudflareApi();
            if (cf.isLoggedIn()) {
                console.log('Update Records.')
                for (const dnsRecord of await cf.getDNSRecords()) {
                    await cf.updateDNSRecord(dnsRecord);
                }
            }
        }
    }
}