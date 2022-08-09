import { ADAHandleClientContext, ADAHandleClientFetchResponse, ADAHandleClientOptions } from '../types';

export const defaultOptions: ADAHandleClientOptions = {
    context: ADAHandleClientContext.MAINNET,
    resolver: async () => {
        throw new Error('Whoops! You need to pass in your own resolver function until we release a public API!');
    }
};

export class ADAHandleClient {
    private options: ADAHandleClientOptions;
    private policyIds = {
        [ADAHandleClientContext.MAINNET]: ['f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'],
        [ADAHandleClientContext.TESTNET]: ['8d18d786e92776c824607fd8e193ec535c79dc61ea2405ddf3b09fe3']
    };

    constructor(options?: Partial<ADAHandleClientOptions>) {
        this.options = {
            ...defaultOptions,
            ...options
        };
    }

    public setContext(context: ADAHandleClientContext) {
        this.options.context = context;
    }

    public getContext(): ADAHandleClientContext {
        return this.options.context;
    }

    public getPolicyIdsByContext(context: ADAHandleClientContext) {
        return this.policyIds[context];
    }

    public getActivePolicyIds() {
        return this.policyIds[this.options.context];
    }

    public isADAHandle(policyId: string): boolean {
        const ids = this.getActivePolicyIds();
        return ids.includes(policyId);
    }

    public async getData(handle: string): Promise<ADAHandleClientFetchResponse> {
        return await this.options.resolver(handle);
    }
}
