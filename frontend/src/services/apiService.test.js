import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from './apiService';

global.fetch = vi.fn();

describe('apiService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('sets Authorization header if token exists', async () => {
        localStorage.setItem('token', 'fake-token');
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ ok: true }),
        });

        await api.get('/test');

        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('/test'),
            expect.objectContaining({
                headers: expect.objectContaining({
                    Authorization: 'Bearer fake-token',
                }),
            })
        );
    });

    it('throws error on non-ok response', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: 'Error occurred' }),
        });

        await expect(api.get('/fail')).rejects.toThrow('Error occurred');
    });
});
