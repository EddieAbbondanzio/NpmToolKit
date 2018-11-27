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
const chai_1 = require("chai");
const jwt_handler_1 = require("./jwt-handler");
const ts_dotnet_errors_1 = require("ts-dotnet-errors");
const jsonwebtoken_1 = require("jsonwebtoken");
/**
 * Unit tests for the JWT issuer
 */
describe('JWT-Handler', () => {
    /**
     * Unit tests for the constructor.
     */
    describe('constructor()', () => {
        it('throws an error if no tokenSignature', () => {
            chai_1.expect(() => { new jwt_handler_1.JwtHandler(null); }).to.throw(ts_dotnet_errors_1.ArgumentNullError);
        });
        it('throws an error if tokenLifeSpan is negative', () => {
            chai_1.expect(() => { new jwt_handler_1.JwtHandler('secret', -1); }).to.throw(ts_dotnet_errors_1.ArgumentOutOfRangeError);
        });
        it('correctly assigns the signature', () => {
            let issuer = new jwt_handler_1.JwtHandler('signature');
            chai_1.expect(issuer.signature).to.be.equal('signature');
        });
        it('correctly assigns the token life span', () => {
            let issuer = new jwt_handler_1.JwtHandler('signature', 500);
            chai_1.expect(issuer.signOptions.expiresIn).to.be.equal(500);
        });
    });
    /**
     * Unit tests for the issueToken method.
     */
    describe('issueToken()', () => __awaiter(this, void 0, void 0, function* () {
        it('throws an error if the payload is null', () => __awaiter(this, void 0, void 0, function* () {
            let issuer = new jwt_handler_1.JwtHandler('secret');
            let error = null;
            try {
                yield issuer.signToken(null);
            }
            catch (err) {
                error = err;
            }
            chai_1.expect(error).to.be.instanceOf(ts_dotnet_errors_1.ArgumentNullError);
        }));
        it('issues a JWT for a valid payload', () => __awaiter(this, void 0, void 0, function* () {
            let jwtIssuer = new jwt_handler_1.JwtHandler('secret');
            let token = yield jwtIssuer.signToken({ p: 'payload' });
            chai_1.expect(token).to.be.a('string');
        }));
    }));
    /**
     * Unit tests for the validateToken method.
     */
    describe('validateToken()', () => __awaiter(this, void 0, void 0, function* () {
        it('throws an error if no token', () => __awaiter(this, void 0, void 0, function* () {
            let issuer = new jwt_handler_1.JwtHandler('secret');
            let error = null;
            try {
                yield issuer.signToken(null);
            }
            catch (err) {
                error = err;
            }
            chai_1.expect(error).to.be.instanceOf(ts_dotnet_errors_1.ArgumentNullError);
        }));
        it('approves valid tokens', () => __awaiter(this, void 0, void 0, function* () {
            let issuer = new jwt_handler_1.JwtHandler('secret');
            let token = yield issuer.signToken({ p: 'payload' });
            let decodedPayload = yield issuer.validateToken(token);
            chai_1.expect(decodedPayload).to.have.property('p', 'payload');
        }));
        it('rejects expired tokens', () => __awaiter(this, void 0, void 0, function* () {
            const snooze = (ms) => new Promise(resolve => setTimeout(resolve, ms));
            let issuer = new jwt_handler_1.JwtHandler('secret', 1);
            let token = yield issuer.signToken({ p: 'payload' });
            yield snooze(1500);
            let error = null;
            try {
                let decodedPayload = yield issuer.validateToken(token);
            }
            catch (err) {
                error = err;
            }
            chai_1.expect(error).to.be.an.instanceOf(jsonwebtoken_1.TokenExpiredError);
        }));
    }));
});
//# sourceMappingURL=jwt-handler.test.js.map