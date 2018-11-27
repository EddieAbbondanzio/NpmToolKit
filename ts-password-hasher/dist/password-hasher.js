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
const BcryptJS = __importStar(require("bcryptjs"));
const ts_dotnet_errors_1 = require("ts-dotnet-errors");
/**
 * Hasher utility for creating new password hashes and
 * validating passed in passwords.
 */
var PasswordHasher;
(function (PasswordHasher) {
    /**
     * 10 is the recommended # of rounds by BCrypt.
     */
    const SALT_ROUNDS = 10;
    /**
     * Generate a new password hash from a passed in hash.
     * @param password The password to hash
     */
    function generateHash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (password == null) {
                throw new ts_dotnet_errors_1.ArgumentNullError('password');
            }
            return yield BcryptJS.hash(password, SALT_ROUNDS);
        });
    }
    PasswordHasher.generateHash = generateHash;
    /**
     * Hashes a passed in password and compares it against the
     * known password hash
     * @param password The password to hash and check.
     * @param hash The hash to compare against.
     */
    function validateHash(password, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            if (password == null) {
                throw new ts_dotnet_errors_1.ArgumentNullError('password');
            }
            else if (hash == null) {
                throw new ts_dotnet_errors_1.ArgumentNullError('hash');
            }
            return yield BcryptJS.compare(password, hash);
        });
    }
    PasswordHasher.validateHash = validateHash;
})(PasswordHasher = exports.PasswordHasher || (exports.PasswordHasher = {}));
//# sourceMappingURL=password-hasher.js.map