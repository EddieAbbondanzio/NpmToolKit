Jwt-Handler
---

Utility for signing and validating json web tokens. Written in typescript, and uses the npm package jsonwebtoken.

How to Use
---

```js
let tokenHandler: JwtHandler = new JwtHandler('secret');

//Sign a token
let token: string = await tokenHandler.signToken({payload: 'foo' });

//Verify a token
let payload: any = await tokenHandler.validateToken(token);
```

If a token is expired, then a TokenExpiredError will be thrown.