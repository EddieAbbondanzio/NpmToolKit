/**
 * Various types of configurations to run depending
 * on the scenario.
 */
export enum ConfigType {
    /**
     * Default value for an unknown config type.
     */
    Unknown,
    /**
     * Configuration to use when running in development
     * mode.
     */
    Development,
    /**
     * Configuration to use when running unit,
     * and integration tests.
     */
    Test,
    /**
     * Configuration to use in production.
     */
    Production
}