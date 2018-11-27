import * as JsonWebToken from 'jsonwebtoken';
import { ArgumentNullError, ArgumentError, ArgumentOutOfRangeError } from 'ts-dotnet-errors';

/**
 * Utility for creating, and verifying Json Web Tokens.
 */
export class JwtHandler {
    /**
     * How to sign tokens.
     */
    public signOptions: JsonWebToken.SignOptions;

    /**
     * How to validate tokens.
     */
    public validateOptions: JsonWebToken.VerifyOptions;

    /**
     * The secret signing key.
     */
    public signature: string;

    /**
     * Create a new JWT issuer.
     * @param tokenSignature The secret to sign tokens with.
     * @param tokenLifeSpan The valid life span of a token. (6 Months by default)
     */
    constructor(tokenSignature: string, tokenLifeSpan: number = 15780000) {
        if(tokenSignature == null) {
            throw new ArgumentNullError('tokenSignature');
        }
        else if(tokenLifeSpan < 0) {
            throw new ArgumentOutOfRangeError('tokenLifeSpan must be greater than 0.');
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
    public async signToken<T extends object>(payload: T): Promise<string> {
        if (payload == null) {
            throw new ArgumentNullError('payload');
        }

        return new Promise<string>((resolve, reject) => {
            //JsonWebToken only allows POJOs as payloads.
            let rawPayload: any = {}

            for (let p in payload) {
                if (payload.hasOwnProperty(p)) {
                    rawPayload[p] = payload[p];
                }
            }

            JsonWebToken.sign(payload as any, this.signature, this.signOptions, (err, token) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(token);
                }
            });
        });
    }

    /**
     * Validate an existing Json Web Token
     * @param token The token to validate.
     * @returns The decoded payload.
     */
    public async validateToken<T extends object>(token: string): Promise<T> {
        if (token == null) {
            throw new ArgumentNullError('token');
        }

        return new Promise<T>((resolve, reject) => {
            JsonWebToken.verify(token, this.signature, this.validateOptions, (error: Error, decoded: any) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(decoded as T);
                }
            });
        });
    }
}