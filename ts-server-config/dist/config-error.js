"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ts_dotnet_errors_1 = require("ts-dotnet-errors");
/**
 * Errors for when something goes wrong working with the config.
 */
var ConfigError = /** @class */ (function (_super) {
    __extends(ConfigError, _super);
    /**
     * Create a new config error.
     * @param message The error message.
     * @param error The inner error (if any)
     */
    function ConfigError(message, error) {
        return _super.call(this, message, error) || this;
    }
    return ConfigError;
}(ts_dotnet_errors_1.AbstractError));
exports.ConfigError = ConfigError;
//# sourceMappingURL=config-error.js.map