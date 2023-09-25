import { BlockfrostProvider } from '../classes/providers/BlockfrostProvider.class';
import { HandleClientContext } from '../types';

describe('BlockfrostProvider', () => {
    it('should instantiate correctly on mainnet', () => {
        const provider = new BlockfrostProvider(HandleClientContext.MAINNET, 'test_key');
        expect(provider.network).toEqual(HandleClientContext.MAINNET);
        expect(provider.apiUrl).toEqual('https://cardano-mainnet.blockfrost.io/api/v0');
    });

    it('should instantiate correctly on preview', () => {
        const provider = new BlockfrostProvider(HandleClientContext.PREVIEW, 'test_key');
        expect(provider.network).toEqual(HandleClientContext.PREVIEW);
        expect(provider.apiUrl).toEqual('https://cardano-preview.blockfrost.io/api/v0');
    });
});
