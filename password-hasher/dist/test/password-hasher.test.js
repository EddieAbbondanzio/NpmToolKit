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
require("mocha");
const chai = __importStar(require("chai"));
const chaiAsPromised = __importStar(require("chai-as-promised"));
const chai_1 = require("chai");
const ts_dotnet_errors_1 = require("ts-dotnet-errors");
const password_hasher_1 = require("../password-hasher");
describe('PasswordHasher', () => {
    /**
     * Need to register middleware
     */
    before(() => {
        chai.use(chaiAsPromised);
    });
    describe('generateHash()', () => __awaiter(this, void 0, void 0, function* () {
        it('throws an error when no password passed', () => __awaiter(this, void 0, void 0, function* () {
            chai_1.expect(password_hasher_1.PasswordHasher.generateHash(undefined)).to.be.rejectedWith(ts_dotnet_errors_1.ArgumentNullError, 'password');
        }));
        it('generates a hash when a password is given', () => __awaiter(this, void 0, void 0, function* () {
            chai_1.expect(password_hasher_1.PasswordHasher.generateHash('password')).to.eventually.be.fulfilled;
        }));
    }));
    describe('validateHash()', () => __awaiter(this, void 0, void 0, function* () {
        it('throws an error when no password', () => __awaiter(this, void 0, void 0, function* () {
            chai_1.expect(password_hasher_1.PasswordHasher.validateHash(undefined, 'hash')).to.be.rejectedWith(ts_dotnet_errors_1.ArgumentNullError, 'password');
        }));
        it('throws an error when no hash is given', () => __awaiter(this, void 0, void 0, function* () {
            chai_1.expect(password_hasher_1.PasswordHasher.validateHash('pass', undefined)).to.be.rejectedWith(ts_dotnet_errors_1.ArgumentNullError, 'hash');
        }));
        it('returns true for a valid password', () => __awaiter(this, void 0, void 0, function* () {
            let hash = yield password_hasher_1.PasswordHasher.generateHash('password');
            chai_1.expect(password_hasher_1.PasswordHasher.validateHash('password', hash)).to.eventually.be.fulfilled.and.be.true;
        }));
        it('rejects a bad password', () => __awaiter(this, void 0, void 0, function* () {
            let hash = yield password_hasher_1.PasswordHasher.generateHash('password');
            chai_1.expect(password_hasher_1.PasswordHasher.validateHash('notit', hash)).to.eventually.be.fulfilled.and.be.false;
        }));
    }));
});
//# sourceMappingURL=password-hasher.test.js.map