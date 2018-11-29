/**
 * Various types of configurations to run depending
 * on the scenario.
 */
export declare enum ConfigType {
    /**
     * Configuration to use when running in development
     * mode.
     */
    Development = 0,
    /**
     * Configuration to use when running unit,
     * and integration tests.
     */
    Test = 1,
    /**
     * Configuration to use in production.
     */
    Production = 2
}
