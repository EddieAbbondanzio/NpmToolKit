import { AbstractError } from "ts-dotnet-errors";
/**
 * Errors for when something goes wrong working with the config.
 */
export declare class ConfigError extends AbstractError {
    /**
     * Create a new config error.
     * @param message The error message.
     * @param error The inner error (if any)
     */
    constructor(message: string, error?: Error);
}
