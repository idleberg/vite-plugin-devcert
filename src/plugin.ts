import { env } from 'node:process';
import { certificateFor } from '@expo/devcert';
import boxen from 'boxen';
import { cyan, underline } from 'kleur/colors';
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
				box(
					// Keep lines short for better readability
					[
						`Generating a certificate for "${cyan(domain)}".`,
						'You may be prompted to enter your password to allow the creation of a root certificate authority.',
						`\n\nFor details, please refer to the documentation at ${underline('https://github.com/expo/devcert#how-it-works')}.`,
					].join(' '),
				),
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

/**
 * Helper function for boxen library
 * @param message The message to display in the box
 */
function box(message: string): string {
	return boxen(message.trim(), {
		borderColor: env.NO_COLOR ? undefined : 'blue',
		margin: {
			top: 1,
			bottom: 1,
		},
		padding: 1,
		title: 'vite-plugin-devcert',
	});
}
