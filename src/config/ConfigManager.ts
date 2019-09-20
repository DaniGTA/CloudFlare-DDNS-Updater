import { remote } from "electron";
import { writeFileSync, existsSync, readFileSync, mkdirSync } from 'fs';
import Config from './models/Config';

export default class ConfigManager {
    public static config:Config;

    async saveChanges(config: Config) {
        if (!existsSync(this.getConfigFolderPath())) {
            mkdirSync(this.getConfigFolderPath())
        }
        writeFileSync(this.getConfigFilePath(), JSON.stringify(config));
    }

    get config(): Config {
        if (ConfigManager.config) {
            return ConfigManager.config
        }
        if (existsSync(this.getConfigFilePath())){
            ConfigManager.config = JSON.parse(readFileSync(this.getConfigFilePath(), 'UTF-8')) as Config;
            return ConfigManager.config;

        }else{
            ConfigManager.config = new Config();
            return ConfigManager.config
        }
    }   
    
    private getConfigFilePath(): string {
        return this.getConfigFolderPath()+ '\\config.json';
    }
    private getConfigFolderPath(): string {
        return remote.app.getPath('appData') + '\\cloudflare-updater';
    }


}