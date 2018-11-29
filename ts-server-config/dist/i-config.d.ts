import { ConfigType } from "./config-type";
/**
 * Interface for a configuration file to implement. This
 * allows it to be loaded from file.
 */
export interface IConfig {
    /**
     * The config profile type.
     */
    configType: ConfigType;
}
