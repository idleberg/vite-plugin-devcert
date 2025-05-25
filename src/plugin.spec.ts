import { beforeEach, describe, expect, it, vi } from 'vitest';
import DevcertPlugin from './plugin.ts';

// Mock dependencies
vi.mock('@expo/devcert', () => ({
	certificateFor: vi.fn().mockResolvedValue({ key: 'mock-key', cert: 'mock-cert' }),
}));
vi.mock('log-symbols', () => ({
	default: { warning: '!' },
}));

describe('DevcertPlugin', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('skips certificate generation if key and cert are provided', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		const plugin = DevcertPlugin();
		const userConfig = { server: { https: { key: 'a', cert: 'b' } } };

		// @ts-ignore
		const result = await plugin.config(userConfig, { command: 'serve' });

		expect(warn).toHaveBeenCalledWith('! Skipping devcert, key and cert already provided.');
		expect(result).toBe(userConfig);
		warn.mockRestore();
	});

	it('generates certificate if key/cert are missing', async () => {
		const plugin = DevcertPlugin();
		const userConfig = { server: {} };

		// @ts-ignore
		const result = await plugin.config(userConfig, { command: 'serve' });

		expect(result?.server?.https?.key).toBe('mock-key');
		expect(result?.server?.https?.cert).toBe('mock-cert');
	});

	it('does nothing if command is not serve', async () => {
		const plugin = DevcertPlugin();
		const userConfig = { server: {} };

		// @ts-ignore
		const result = await plugin.config(userConfig, { command: 'build' });

		expect(result).toBeUndefined();
	});
});
