import { certificateFor } from '@expo/devcert';
import logSymbols from 'log-symbols';

import type { Plugin, UserConfig } from 'vite';

type PluginOptions = {
	skipHostsFile?: boolean;
	skipCertutil?: boolean;
};

/**
 * Generate trusted SSL/TLS certificates for local development.
 * @param options Options passed on to `@expo/devcert`
 * @param options.skipHostsFile If `certutil` is not installed already (for updating NSS databases; e.g. Firefox), do not attempt to install it {@see {@link https://github.com/expo/devcert#skiphostsfile}}
 * @param options.skipCertutil Do not update your systems host file with the domain name of the certificate {@see {@link https://github.com/expo/devcert#skipcertutil}}
 * @returns a Vite plugin
 */
export default function DevcertPlugin(options: PluginOptions = {}): Plugin {
	return {
		name: '@idleberg/vite-plugin-devcert',
		config: async (userConfig: UserConfig, { command }) => {
			if (command !== 'serve') {
				return;
			}

			const { server } = userConfig;

			if (server?.https?.key && server?.https?.cert) {
				console.warn(`${logSymbols.warning} Skipping devcert, key and cert already provided.`);

				return userConfig;
			}

			const domain = server?.host && typeof server.host === 'string' ? server.host : 'localhost';

			console.info(
				// Keep lines short for better readability
				[
					`\n${logSymbols.info} Generating certificate for "${domain}".`,
					'You may be prompted to enter your password to allow the creation of root certificate authority.',
					'\nPlease refer to documentation at https://github.com/expo/devcert#how-it-works for details.\n',
				].join(' '),
			);

			const { key, cert } = await certificateFor(domain, options);

			return {
				...userConfig,
				server: {
					...server,
					https: {
						...server?.https,
						key: key ?? undefined,
						cert: cert ?? undefined,
					},
				},
			};
		},
	};
}
