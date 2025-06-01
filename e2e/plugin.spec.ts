import { env } from 'node:process';
import { expect, test } from '@playwright/test';

test('should get no security details from HTTP response', async ({ page }) => {
	const [response] = await Promise.all([
		page.waitForResponse((resp) => resp.url().startsWith('http://')),
		page.goto('http://localhost:7001'),
	]);

	const securityDetails = await response.securityDetails();

	expect(securityDetails).not.toBeUndefined();
});

test('should get security details from HTTPS response', async ({ page }) => {
	if (env.CI) {
		test.skip(true, 'Skipping test in CI environment since it requires interactive user input');
	}

	const [response] = await Promise.all([
		page.waitForResponse((resp) => resp.url().startsWith('https://')),
		page.goto('https://localhost:7002'),
	]);

	const securityDetails = await response.securityDetails();

	if (!securityDetails) {
		throw new Error('No security details found in the response');
	}

	const dateNow = Date.now() / 1000;

	expect(securityDetails).not.toBeNull();
	expect(securityDetails.issuer).toMatch('devcert');
	expect(securityDetails.protocol).toMatch(/^TLS/);
	expect(securityDetails.subjectName).toMatch('localhost');
	expect(securityDetails.validFrom).toBeLessThan(dateNow);
	expect(securityDetails.validTo).toBeGreaterThan(dateNow);
});
