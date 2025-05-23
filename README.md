# @idleberg/vite-plugin-devcert

> A Vite plugin to generate trusted SSL/TLS certificates for local development.

[![License](https://img.shields.io/github/license/idleberg/vite-plugin-devcert?color=blue&style=for-the-badge)](https://github.com/idleberg/vite-plugin-devcert/blob/main/LICENSE)
[![Version: npm](https://img.shields.io/npm/v/@idleberg/vite-plugin-devcert?style=for-the-badge)](https://www.npmjs.org/package/@idleberg/vite-plugin-devcert)
[![Version: jsr](https://img.shields.io/jsr/v/@idleberg/vite-plugin-devcert?style=for-the-badge)](https://jsr.io/@idleberg/vite-plugin-devcert)
[![CI: Node](https://img.shields.io/github/actions/workflow/status/idleberg/vite-plugin-devcert/node.yml?logo=nodedotjs&logoColor=white&style=for-the-badge)](https://github.com/idleberg/vite-plugin-devcert/actions/workflows/node.yml)
[![CI: Deno](https://img.shields.io/github/actions/workflow/status/idleberg/vite-plugin-devcert/deno.yml?logo=deno&logoColor=white&style=for-the-badge)](https://github.com/idleberg/vite-plugin-devcert/actions/workflows/deno.yml)

> [!IMPORTANT]
> This plugin is based on `@expo/devcert`, an actively maintained fork of `devcert`. Read about [how it works](https://github.com/expo/devcert/tree/master?tab=readme-ov-file#how-it-works) and what the [security concerns](https://github.com/expo/devcert/tree/master?tab=readme-ov-file#security-concerns) are.

## Installation

On NodeJS or Bun you can install from npm

```shell
npm install @idleberg/vite-plugin-devcert
```

On Deno you can install using JSR

```shell
deno add jsr:@idleberg/vite-plugin-devcert
```

## Usage

```javascript
import { defineConfig } from "vite";
import devCert from "@idleberg/vite-plugin-devcert";

export default defineConfig({
	plugins: [devCert()],
});
```

### API

`devCert(options?)`

### Options

#### `options.skipHostsFile`

If `certutil` is not installed already (for updating NSS databases; e.g. Firefox), do not attempt to install it. [Read more](https://github.com/expo/devcert#skiphostsfile).

#### `options.skipCertutil`

Do not update your systems host file with the domain name of the certificate. [Read more](https://github.com/expo/devcert#skipcertutil).

## Related

- [vite-plugin-basic-ssl](https://github.com/vitejs/vite-plugin-basic-ssl)
- [vite-plugin-mkcert](https://github.com/vite-plugin/vite-plugin-mkcert)

## License

This work is licensed under [The MIT License](LICENSE).
