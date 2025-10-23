# @idleberg/vite-plugin-devcert

> A Vite plugin to generate trusted SSL/TLS certificates for local development.

[![License](https://img.shields.io/github/license/idleberg/vite-plugin-devcert?color=blue&style=for-the-badge)](https://github.com/idleberg/vite-plugin-devcert/blob/main/LICENSE)
[![Version: npm](https://img.shields.io/npm/v/@idleberg/vite-plugin-devcert?style=for-the-badge)](https://www.npmjs.org/package/@idleberg/vite-plugin-devcert)
[![Version: jsr](https://img.shields.io/jsr/v/@idleberg/vite-plugin-devcert?style=for-the-badge)](https://jsr.io/@idleberg/vite-plugin-devcert)
![GitHub branch check runs](https://img.shields.io/github/check-runs/idleberg/vite-plugin-devcert/main?style=for-the-badge)


> [!IMPORTANT]
> This plugin is based on [`@expo/devcert`](https://www.npmjs.com/package/@expo/devcert), an actively maintained fork of `devcert`. Read about [how it works](https://github.com/expo/devcert/#how-it-works) and [its implications on security](https://github.com/expo/devcert/#security-concerns).

## Installation 💿

On NodeJS or Bun, install from npm:

```shell
npm install @idleberg/vite-plugin-devcert
```

On Deno you will likely want to use JSR:

```shell
deno add jsr:@idleberg/vite-plugin-devcert
```

## Usage 🚀

```javascript
import { defineConfig } from "vite";
import devcert from "@idleberg/vite-plugin-devcert";

export default defineConfig({
	plugins: [devcert()],
});
```

### API ⚙️

`devcert(options?)`

### Options

#### `options.skipHostsFile`

If `certutil` is not installed already (for updating NSS databases; e.g. Firefox), do not attempt to install it. [Read the Expo documentation for more](https://github.com/expo/devcert#skiphostsfile).

#### `options.skipCertutil`

Do not update your systems host file with the domain name of the certificate. [Read the Expo documentation for more](https://github.com/expo/devcert#skipcertutil).

#### `options.hideInfoBox`

Hide the info box displayed at startup.

## Related 👫

- [vite-plugin-basic-ssl](https://www.npmjs.com/package/@vitejs/plugin-basic-ssl)
- [vite-plugin-mkcert](https://www.npmjs.com/package/vite-plugin-mkcert)

## License ©️

This work is licensed under [The MIT License](LICENSE).
