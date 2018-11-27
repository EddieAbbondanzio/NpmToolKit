# NpmToolKit

## Summary 

A collection of utility modules for developing back-ends. These are fairly generic in purpose, and commonly use other modules. I like to call this project my toolkit as they help speed up my rapid prototyping without having to re-invent the wheel each time. Each module contains another read me with basic usage. Each module also has full test coverage to ensure these are bug free.

## Tools

### ts-password-hasher

A password hasher that allows for generating hashes of passwords that can be used to validate against later on. Storing passwords in plain text is a horrible practice that shouldn't be considered under any circumstances, and this utility is expectionally easy to use.

### ts-jwt-handler

A json web token manager. Allows for generating json web tokens that can be used authenticate user identities. Json web tokens are small base-64 encoded strings that have several properties such as a payload, audience, and time to live. They are signed by the server and cannot be faked unless the secret signature is leaked. 