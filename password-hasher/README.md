Password-Hasher
---

Allows for generating hashes from passwords, then later re-verifying these hashes. 

How to Use
---

```js
//Generate a hash
let password: string = 'hunter2';
let hash: string = await PasswordHasher.generateHash(password);

//Validate a hash
let isMatch: boolean = await PasswordHasher.validateHash(password, hash);
```