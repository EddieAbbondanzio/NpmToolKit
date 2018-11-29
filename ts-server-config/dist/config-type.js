"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Various types of configurations to run depending
 * on the scenario.
 */
var ConfigType;
(function (ConfigType) {
    /**
     * Configuration to use when running in development
     * mode.
     */
    ConfigType[ConfigType["Development"] = 0] = "Development";
    /**
     * Configuration to use when running unit,
     * and integration tests.
     */
    ConfigType[ConfigType["Test"] = 1] = "Test";
    /**
     * Configuration to use in production.
     */
    ConfigType[ConfigType["Production"] = 2] = "Production";
})(ConfigType = exports.ConfigType || (exports.ConfigType = {}));
//# sourceMappingURL=config-type.js.map