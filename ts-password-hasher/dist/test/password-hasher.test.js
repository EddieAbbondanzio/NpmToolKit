"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const ts_dotnet_errors_1 = require("ts-dotnet-errors");
const password_hasher_1 = require("../password-hasher");
describe('PasswordHasher', () => {
    describe('generateHash()', () => __awaiter(this, void 0, void 0, function* () {
        it('throws an error when no password passed', () => __awaiter(this, void 0, void 0, function* () {
            let error = null;
            try {
                yield password_hasher_1.PasswordHasher.generateHash(undefined);
            }
            catch (err) {
                error = err;
            }
            chai_1.expect(error).to.be.instanceOf(ts_dotnet_errors_1.ArgumentNullError);
        }));
        it('generates a hash when a password is given', () => __awaiter(this, void 0, void 0, function* () {
            let hash = yield password_hasher_1.PasswordHasher.generateHash('password');
            chai_1.expect(hash).to.be.a('string');
        }));
    }));
    describe('validateHash()', () => __awaiter(this, void 0, void 0, function* () {
        it('throws an error when no password', () => __awaiter(this, void 0, void 0, function* () {
            let error = null;
            try {
                yield password_hasher_1.PasswordHasher.validateHash(undefined, 'hash');
            }
            catch (err) {
                error = err;
            }
            chai_1.expect(error).to.be.instanceOf(ts_dotnet_errors_1.ArgumentNullError);
        }));
        it('throws an error when no hash is given', () => __awaiter(this, void 0, void 0, function* () {
            let error = null;
            try {
                yield password_hasher_1.PasswordHasher.validateHash('pass', undefined);
            }
            catch (err) {
                error = err;
            }
            chai_1.expect(error).to.be.instanceOf(ts_dotnet_errors_1.ArgumentNullError);
        }));
        it('returns true for a valid password', () => __awaiter(this, void 0, void 0, function* () {
            let hash = yield password_hasher_1.PasswordHasher.generateHash('password');
            let result = yield password_hasher_1.PasswordHasher.validateHash('password', hash);
            chai_1.expect(result).to.be.true;
        }));
        it('rejects a bad password', () => __awaiter(this, void 0, void 0, function* () {
            let hash = yield password_hasher_1.PasswordHasher.generateHash('password');
            let result = yield password_hasher_1.PasswordHasher.validateHash('password2', hash);
            chai_1.expect(result).to.be.false;
        }));
    }));
});
//# sourceMappingURL=password-hasher.test.js.map