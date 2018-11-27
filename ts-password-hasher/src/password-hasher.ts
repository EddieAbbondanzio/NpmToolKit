import * as BcryptJS from 'bcryptjs';
import { ArgumentNullError } from 'ts-dotnet-errors';

/**
 * Hasher utility for creating new password hashes and
 * validating passed in passwords.
 */
export module PasswordHasher {
    /**
     * 10 is the recommended # of rounds by BCrypt.
     */
    const SALT_ROUNDS = 10;

    /**
     * Generate a new password hash from a passed in hash.
     * @param password The password to hash
     */
    export async function generateHash(password: string):Promise<string> {
        if(password == null){
            throw new ArgumentNullError('password');
        }

        return await BcryptJS.hash(password, SALT_ROUNDS);
    }

    /**
     * Hashes a passed in password and compares it against the 
     * known password hash
     * @param password The password to hash and check.
     * @param hash The hash to compare against.
     */
    export async function validateHash(password: string, hash: string):Promise<boolean>{
        if(password == null){
            throw new ArgumentNullError('password');
        }
        else if(hash == null){
            throw new ArgumentNullError('hash');
        }
        
        return await BcryptJS.compare(password, hash);
    }
}