import { ConfigType } from "./config-type";
import { IConfig } from './i-config';
/**
 * Utility for loading the config file from disk.
 */
export declare class ConfigHandler {
    /**
     * Load a specific config from file. This will reject the config if any
     * properties are missing.
     * @param constructor The constructor of the config type. Must accept no parameters.
     * @param configType The config profile type to load.
     * @returns The loaded config
     */
    static loadConfig<T extends IConfig>(constructor: new () => T, configType: ConfigType): Promise<T>;
    /**
     * Load a config from it's file. This will load the plain object.
     * @param configType The config profile type to load.
     * @returns The loaded raw object from file.
     */
    private static loadConfigFile;
}
