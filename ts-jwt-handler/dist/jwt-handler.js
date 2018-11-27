"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const JsonWebToken = __importStar(require("jsonwebtoken"));
const ts_dotnet_errors_1 = require("ts-dotnet-errors");
/**
 * Utility for creating, and verifying Json Web Tokens.
 */
class JwtHandler {
    /**
     * Create a new JWT issuer.
     * @param tokenSignature The secret to sign tokens with.
     * @param tokenLifeSpan The valid life span of a token. (6 Months by default)
     */
    constructor(tokenSignature, tokenLifeSpan = 15780000) {
        if (tokenSignature == null) {
            throw new ts_dotnet_errors_1.ArgumentNullError('tokenSignature');
        }
        else if (tokenLifeSpan < 0) {
            throw new ts_dotnet_errors_1.ArgumentOutOfRangeError('tokenLifeSpan must be greater than 0.');
        }
        this.signature = tokenSignature;
        this.signOptions = {
            algorithm: 'HS256',
            expiresIn: tokenLifeSpan
        };
        this.validateOptions = {
            algorithms: ['HS256']
        };
    }
    /**
     * Create a new Json Web Token.
     * @param payload The payload to encode in the JWT.
     * @returns The generated JWT.
     */
    signToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (payload == null) {
                throw new ts_dotnet_errors_1.ArgumentNullError('payload');
            }
            return new Promise((resolve, reject) => {
                //JsonWebToken only allows POJOs as payloads.
                let rawPayload = {};
                for (let p in payload) {
                    if (payload.hasOwnProperty(p)) {
                        rawPayload[p] = payload[p];
                    }
                }
                JsonWebToken.sign(payload, this.signature, this.signOptions, (err, token) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(token);
                    }
                });
            });
        });
    }
    /**
     * Validate an existing Json Web Token
     * @param token The token to validate.
     * @returns The decoded payload.
     */
    validateToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (token == null) {
                throw new ts_dotnet_errors_1.ArgumentNullError('token');
            }
            return new Promise((resolve, reject) => {
                JsonWebToken.verify(token, this.signature, this.validateOptions, (error, decoded) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(decoded);
                    }
                });
            });
        });
    }
}
exports.JwtHandler = JwtHandler;
//# sourceMappingURL=jwt-handler.js.map