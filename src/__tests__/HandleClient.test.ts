import { HandleClient, defaultOptions } from '../classes/HandleClient.class';
import { HandleClientProvider, KoraLabsProvider } from '../classes/providers';
import { HandleClientContext } from '../types';

let client: HandleClient;

class CustomProvider extends HandleClientProvider {
    constructor() {
        super();
    }

    getCardanoAddress = async () => {
        return new Promise<string>((res) => {
            setTimeout(() => res('cardanoaddress'), 1000);
        });
    };

    getBitcoinAddress = async () => {
        return new Promise<string>((res) => {
            setTimeout(() => res('bitcoinaddress'), 1000);
        });
    };

    getEthereumAddress = async () => {
        return new Promise<string>((res) => {
            setTimeout(() => res('ethereumaddress'), 1000);
        });
    };

    getAllData = async () => {
        return new Promise<Record<string, string>>((res) => {
            setTimeout(
                () =>
                    res({
                        name: 'customdata'
                    }),
                1000
            );
        });
    };
}

// Setup.
beforeEach(() => {
    client = new HandleClient();
});

describe('HandleClient', () => {
    it('should use default options when initialized', () => {
        expect(client).toHaveProperty('options', defaultOptions);
    });

    it('should have getContext method', () => {
        expect(client).toHaveProperty('getContext');
        expect(client.getContext()).toEqual(HandleClientContext.MAINNET);
    });

    it('should have setContext method', () => {
        expect(client).toHaveProperty('setContext');
        expect(client.getContext()).toEqual(HandleClientContext.MAINNET);
        client.setContext(HandleClientContext.PREVIEW);
        expect(client.getContext()).toEqual(HandleClientContext.PREVIEW);
    });

    it('should have getPolicyIdsByContext method', () => {
        expect(client).toHaveProperty('getPolicyIdsByContext');
        expect(client.getPolicyIdsByContext(HandleClientContext.PREVIEW)).toEqual([
            '8d18d786e92776c824607fd8e193ec535c79dc61ea2405ddf3b09fe3'
        ]);
        expect(client.getPolicyIdsByContext(HandleClientContext.MAINNET)).toEqual([
            'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'
        ]);
    });

    it('should have getActivePolicyIds method', () => {
        expect(client).toHaveProperty('getActivePolicyIds');
        client.setContext(HandleClientContext.MAINNET);
        expect(client.getActivePolicyIds()).toEqual(['f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a']);
        client.setContext(HandleClientContext.PREVIEW);
        expect(client.getActivePolicyIds()).toEqual(['8d18d786e92776c824607fd8e193ec535c79dc61ea2405ddf3b09fe3']);
    });

    it('should have isADAHandle method', () => {
        expect(client).toHaveProperty('isADAHandle');
        expect(client.isADAHandle('blahblah')).toBeFalsy();
        expect(client.isADAHandle('f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a')).toEqual(true);
        expect(client.isADAHandle('8d18d786e92776c824607fd8e193ec535c79dc61ea2405ddf3b09fe3')).toEqual(false);

        client.setContext(HandleClientContext.PREVIEW);
        expect(client.isADAHandle('f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a')).toEqual(false);
        expect(client.isADAHandle('8d18d786e92776c824607fd8e193ec535c79dc61ea2405ddf3b09fe3')).toEqual(true);
    });

    it('should default to the KoraLabsProvider if none provided', async () => {
        expect(client.getProviderInstance()).toBeInstanceOf(KoraLabsProvider);
    });

    it('should use a custom Provider class', async () => {
        const customClient = new HandleClient({
            context: HandleClientContext.MAINNET,
            provider: new CustomProvider()
        });

        const provider = customClient.getProviderInstance();
        expect(provider).toBeInstanceOf(CustomProvider);
        expect(await provider.getCardanoAddress('myhandle')).toEqual('cardanoaddress');
        expect(await provider.getBitcoinAddress('myhandle')).toEqual('bitcoinaddress');
        expect(await provider.getEthereumAddress('myhandle')).toEqual('ethereumaddress');
        expect(await provider.getAllData('myhandle')).toMatchObject({
            name: 'customdata'
        });
    });
});
