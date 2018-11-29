
ts-server-config
---

Utility for managing multiple versions of a config file. This enables for a seperate config for development, testing, and production. Expects a config file name config.json in the root directory of the project.

File Structure
---

```json
//config.json
{
    "production": {
        "foo": "bar"
    },
    "development": {
        "foo": "baz"
    },
    "test": {
        "foo": "cat"
    }
}
```

How To Use
---

```js
class Config implements IConfig {
    public configType: ConfigType;
    
    public foo: string;
}

let config: Config = await ConfigHandler.loadConfig(Config, ConfigType.Development);

console.log(config.foo);    //Outputs: "baz"

```
