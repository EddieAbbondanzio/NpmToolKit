import { expect } from 'chai';
import { JwtHandler } from './jwt-handler';
import { ArgumentNullError, ArgumentOutOfRangeError } from 'ts-dotnet-errors';
import { TokenExpiredError } from 'jsonwebtoken';

/**
 * Unit tests for the JWT issuer
 */
describe('JWT-Handler', () => {
    /**
     * Unit tests for the constructor.
     */
    describe('constructor()', () => {
        it('throws an error if no tokenSignature', () => {
            expect(() => { new JwtHandler(null!); }).to.throw(ArgumentNullError);
        });

        it('throws an error if tokenLifeSpan is negative', () => {
            expect(() => { new JwtHandler('secret', -1); }).to.throw(ArgumentOutOfRangeError);
        });

        it('correctly assigns the signature', () => {
            let issuer: JwtHandler = new JwtHandler('signature');
            expect(issuer.signature).to.be.equal('signature');
        });

        it('correctly assigns the token life span', () => {
            let issuer: JwtHandler = new JwtHandler('signature', 500);
            expect(issuer.signOptions.expiresIn).to.be.equal(500);
        });
    });

    /**
     * Unit tests for the issueToken method.
     */
    describe('issueToken()', async () => {
        it('throws an error if the payload is null', async () => {
            let issuer: JwtHandler = new JwtHandler('secret');
            let error: ArgumentNullError = null!;

            try {
                await issuer.signToken(null!);
            }
            catch (err) {
                error = err;
            }

            expect(error).to.be.instanceOf(ArgumentNullError);
        });

        it('issues a JWT for a valid payload', async () => {
            let jwtIssuer: JwtHandler = new JwtHandler('secret');

            let token: string = await jwtIssuer.signToken({p: 'payload'});
            expect(token).to.be.a('string');
        });
    });

    /**
     * Unit tests for the validateToken method.
     */
    describe('validateToken()', async () => {
        it('throws an error if no token', async () => {
            let issuer: JwtHandler = new JwtHandler('secret');
            let error: ArgumentNullError = null!;

            try {
                await issuer.signToken(null!);
            }
            catch(err) {
                error = err;
            }

            expect(error).to.be.instanceOf(ArgumentNullError);
        });

        it('approves valid tokens', async () => {
            let issuer: JwtHandler = new JwtHandler('secret');
            let token: string =  await issuer.signToken({p: 'payload'});
            let decodedPayload: object = await issuer.validateToken(token);
            expect(decodedPayload).to.have.property('p', 'payload');

        });

        it('rejects expired tokens', async () => {
            const snooze = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

            let issuer: JwtHandler = new JwtHandler('secret', 1);
            let token: string =  await issuer.signToken({p: 'payload'});

            await snooze(1500);

            let error: TokenExpiredError = null!;

            try {
                let decodedPayload: object = await issuer.validateToken(token);
            }
            catch(err){
                error = err;
            }

            expect(error).to.be.an.instanceOf(TokenExpiredError);
        });
    });
});