import { env } from 'node:process';
import { defineConfig } from '@playwright/test';

export default defineConfig({
	use: {
		trace: 'on-first-retry',
	},
	webServer: {
		command: 'npm run test:server',
		reuseExistingServer: !env.CI,
	},
});
