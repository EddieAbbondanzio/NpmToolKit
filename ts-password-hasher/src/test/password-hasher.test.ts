import 'mocha';
import { expect } from 'chai';
import { ArgumentNullError } from 'ts-dotnet-errors';
import { PasswordHasher } from '../password-hasher';

describe('PasswordHasher', () => {
    describe('generateHash()', async () => {
        it('throws an error when no password passed', async () => {
            let error: Error | null = null;

            try {
                await PasswordHasher.generateHash(undefined!);
            }
            catch (err) {
                error = err;
            }

            expect(error).to.be.instanceOf(ArgumentNullError);
        });

        it('generates a hash when a password is given', async () => {
            let hash: string = await PasswordHasher.generateHash('password');
            expect(hash).to.be.a('string');
        });
    });

    describe('validateHash()', async () => {
        it('throws an error when no password', async () => {
            let error: Error | null = null;

            try {
                await PasswordHasher.validateHash(undefined!, 'hash')
            }
            catch (err) {
                error = err;
            }

            expect(error).to.be.instanceOf(ArgumentNullError);
        });

        it('throws an error when no hash is given', async () => {
            let error: Error | null = null;

            try {
                await PasswordHasher.validateHash('pass', undefined!)
            }
            catch (err) {
                error = err;
            }

            expect(error).to.be.instanceOf(ArgumentNullError);
        });

        it('returns true for a valid password', async () => {
            let hash: string = await PasswordHasher.generateHash('password');
            let result: boolean = await PasswordHasher.validateHash('password', hash);

            expect(result).to.be.true;
        });

        it('rejects a bad password', async () => {
            let hash = await PasswordHasher.generateHash('password');
            let result: boolean = await PasswordHasher.validateHash('password2', hash);

            expect(result).to.be.false;
        });
    });
});