
ts-server-config
---

Utility for managing multiple versions of a config file. This enables for a seperate config for development, testing, and production. Expects a config file name config.json in the root directory of the project.

File Structure
---

```json
//config.json
{
    "production": {
        //production config here
    },
    "development": {
        //Development config here
    },
    "test": {
        //Test config here
    }
}
```

How To Use
---

```js
let config: Config = await ConfigHandler.loadConfig(Config, ConfigType.Development);
```