import { defineConfig } from 'vite';

import devCert from '../src/plugin.ts';

export default defineConfig({
	server: {
		host: 'localhost',
		port: 7002,
	},
	plugins: [devCert()],
});
