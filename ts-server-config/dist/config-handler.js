"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts_dotnet_errors_1 = require("ts-dotnet-errors");
var FileSystem = __importStar(require("fs"));
var config_type_1 = require("./config-type");
var config_error_1 = require("./config-error");
/**
 * Utility for loading the config file from disk.
 */
var ConfigHandler = /** @class */ (function () {
    function ConfigHandler() {
    }
    /**
     * Load a specific config from file. This will reject the config if any
     * properties are missing.
     * @param constructor The constructor of the config type. Must accept no parameters.
     * @param configType The config profile type to load.
     * @returns The loaded config
     */
    ConfigHandler.loadConfig = function (constructor, configType) {
        return __awaiter(this, void 0, void 0, function () {
            var raw, config, p;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadConfigFile(configType)];
                    case 1:
                        raw = _a.sent();
                        config = new constructor();
                        //Check that the raw config has every property.
                        for (p in config) {
                            if (!raw.hasOwnProperty(p) && p != 'configType') {
                                throw new TypeError("Config is missing property: " + p);
                            }
                            else {
                                config[p] = raw[p];
                            }
                        }
                        config.configType = configType;
                        return [2 /*return*/, config];
                }
            });
        });
    };
    /**
     * Load a config from it's file. This will load the plain object.
     * @param configType The config profile type to load.
     * @returns The loaded raw object from file.
     */
    ConfigHandler.loadConfigFile = function (configType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        FileSystem.readFile('./config.json', function (err, data) {
                            if (err) {
                                reject(new ts_dotnet_errors_1.FileNotFoundError('Failed to load config ./config.json', err));
                            }
                            else {
                                //Parse the file to json
                                var jsonString = data.toString();
                                var raw = JSON.parse(jsonString);
                                //Does it have the config we want?
                                var rawConfig = raw[config_type_1.ConfigType[configType].toLowerCase()];
                                if (rawConfig) {
                                    resolve(rawConfig);
                                }
                                else {
                                    reject(new config_error_1.ConfigError('Failed to find config of type: ' + config_type_1.ConfigType[configType]));
                                }
                            }
                        });
                    })];
            });
        });
    };
    return ConfigHandler;
}());
exports.ConfigHandler = ConfigHandler;
//# sourceMappingURL=config-handler.js.map