import { FileNotFoundError } from 'ts-dotnet-errors';
import * as FileSystem from 'fs';
import { ConfigType } from "./config-type";
import { ConfigError } from './config-error';
import { IConfig } from './i-config';

/**
 * Utility for loading the config file from disk.
 */
export class ConfigHandler {
    /**
     * Load a specific config from file. This will reject the config if any 
     * properties are missing.
     * @param constructor The constructor of the config type. Must accept no parameters.
     * @param configType The config profile type to load.
     * @returns The loaded config
     */
    public static async loadConfig<T extends IConfig>(constructor: new () => T, configType: ConfigType): Promise<T> {
        let raw: any = await this.loadConfigFile(configType);
        let config: T = new constructor();

        //Check that the raw config has every property.
        for(let p in config) {
            if(!raw.hasOwnProperty(p) && p != 'configType') {
                throw new TypeError(`Config is missing property: ${p}`)
            }
            else {
                config[p] = raw[p];
            }
        }

        config.configType = configType;
        return config;
    }

    /**
     * Load a config from it's file. This will load the plain object.
     * @param configType The config profile type to load.
     * @returns The loaded raw object from file.
     */
    private static async loadConfigFile(configType: ConfigType): Promise<object> {
        return new Promise<object>((resolve, reject) => {
            FileSystem.readFile('./config.json', (err, data) => {
                if (err) {
                    reject(new FileNotFoundError('Failed to load config ./config.json', err));
                }
                else {
                    //Parse the file to json
                    let jsonString: string = data.toString();
                    let raw: any = JSON.parse(jsonString);

                    //Does it have the config we want?
                    let rawConfig: any = raw[ConfigType[configType].toLowerCase()]

                    if (rawConfig) {
                        resolve(rawConfig);
                    }
                    else {
                        reject(new ConfigError('Failed to find config of type: ' + ConfigType[configType]));
                    }
                }
            });
        });
    }
}