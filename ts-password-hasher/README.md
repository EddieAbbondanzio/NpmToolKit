Password-Hasher
---

Utility for generating and verifying password hashes. Written in Typescript, and uses bcryptjs. The number of salt rounds is hard coded at 10 but this is the current recommendation, and shouldn't be an issue.

How to Use
---

```js
//Generate a hash
let password: string = 'hunter2';
let hash: string = await PasswordHasher.generateHash(password);

//Validate a hash
let isMatch: boolean = await PasswordHasher.validateHash(password, hash);
```