import { KoraLabsProvider } from '../classes/providers';
import { HandleClientContext } from '../types';

describe('KoraLabsProvider', () => {
    it('should instantiate correctly on mainnet', () => {
        const provider = new KoraLabsProvider(HandleClientContext.MAINNET);
        expect(provider.network).toEqual(HandleClientContext.MAINNET);
        expect(provider.apiUrl).toEqual('https://api.handle.me');
    });

    it('should instantiate correctly on preview', () => {
        const provider = new KoraLabsProvider(HandleClientContext.PREVIEW);
        expect(provider.network).toEqual(HandleClientContext.PREVIEW);
        expect(provider.apiUrl).toEqual('https://preview.api.handle.me');
    });
});
