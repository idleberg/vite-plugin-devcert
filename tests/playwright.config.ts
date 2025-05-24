import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	use: {
		trace: 'on-first-retry',
	},
	webServer: {
		command: 'npm run test:server',
		reuseExistingServer: !process.env.CI,
	},
});
