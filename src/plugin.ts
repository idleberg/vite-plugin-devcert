import { certificateFor } from '@expo/devcert';
import logSymbols from 'log-symbols';
import type { Plugin, UserConfig } from 'vite';

type PluginOptions = {
	/**
	 * If `certutil` is not installed already (for updating NSS databases; e.g. Firefox), do not attempt to install it.
	 * {@see {@link https://github.com/expo/devcert#skiphostsfile}}
	 */
	skipHostsFile: boolean;

	/**
	 * Do not update your systems host file with the domain name of the certificate.
	 * {@see {@link https://github.com/expo/devcert#skipcertutil}}
	 */
	skipCertutil: boolean;
};

/**
 * Generate trusted SSL/TLS certificates for local development.
 * @param options - options passed to `@expo/devcert`
 * @returns a Vite plugin
 */
export default function DevcertPlugin(options?: PluginOptions): Plugin {
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
