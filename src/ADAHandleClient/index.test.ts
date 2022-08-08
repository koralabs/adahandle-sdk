import ADAHandleClient, { ADAHandleClientContext, ADAHandleClientFetchResponse, defaultOptions } from '..';

let client: ADAHandleClient;

// Setup.
beforeEach(() => {
    client = new ADAHandleClient();
});

describe('ADAHandleClient', () => {
    it('should use default options when initialized', () => {
        expect(client).toHaveProperty('options', defaultOptions);
    });

    it('should have getContext method', () => {
        expect(client).toHaveProperty('getContext');
        expect(client.getContext()).toEqual(ADAHandleClientContext.MAINNET);
    });

    it('should have setContext method', () => {
        expect(client).toHaveProperty('setContext');
        expect(client.getContext()).toEqual(ADAHandleClientContext.MAINNET);
        client.setContext(ADAHandleClientContext.TESTNET);
        expect(client.getContext()).toEqual(ADAHandleClientContext.TESTNET);
    });

    it('should have getPolicyIdsByContext method', () => {
        expect(client).toHaveProperty('getPolicyIdsByContext');
        expect(client.getPolicyIdsByContext(ADAHandleClientContext.TESTNET)).toEqual([
            '8d18d786e92776c824607fd8e193ec535c79dc61ea2405ddf3b09fe3'
        ]);
        expect(client.getPolicyIdsByContext(ADAHandleClientContext.MAINNET)).toEqual([
            'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'
        ]);
    });

    it('should have getActivePolicyIds method', () => {
        expect(client).toHaveProperty('getActivePolicyIds');
        client.setContext(ADAHandleClientContext.MAINNET);
        expect(client.getActivePolicyIds()).toEqual(['f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a']);
        client.setContext(ADAHandleClientContext.TESTNET);
        expect(client.getActivePolicyIds()).toEqual(['8d18d786e92776c824607fd8e193ec535c79dc61ea2405ddf3b09fe3']);
    });

    it('should have isADAHandle method', () => {
        expect(client).toHaveProperty('isADAHandle');
        expect(client.isADAHandle('blahblah')).toBeFalsy();
        expect(client.isADAHandle('f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a')).toEqual(true);
        expect(client.isADAHandle('8d18d786e92776c824607fd8e193ec535c79dc61ea2405ddf3b09fe3')).toEqual(false);

        client.setContext(ADAHandleClientContext.TESTNET);
        expect(client.isADAHandle('f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a')).toEqual(false);
        expect(client.isADAHandle('8d18d786e92776c824607fd8e193ec535c79dc61ea2405ddf3b09fe3')).toEqual(true);
    });

    it('should throw error if no custom fetch function provided', async () => {
        try {
            await client.getData('myhandle');
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
            expect((e as Error).message).toEqual(
                'Whoops! You need to pass in your own resolver function until we release a public API!'
            );
        }
    });

    it('should use a custom fetch function', async () => {
        const customFetch = async (_handle: string): Promise<ADAHandleClientFetchResponse> => {
            return new Promise((res) => {
                setTimeout(
                    () =>
                        res({
                            address: 'exampleaddress'
                        }),
                    1000
                );
            });
        };

        const customClient = new ADAHandleClient({
            context: ADAHandleClientContext.MAINNET,
            resolver: customFetch
        });

        const response = await customClient.getData('myhandle');
        expect(response).toEqual({
            address: 'exampleaddress'
        });
    });
});
