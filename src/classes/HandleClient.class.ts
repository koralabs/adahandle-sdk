import { HandleClientContext, HandleClientOptions } from '../types';
import { KoraLabsProvider } from './providers/KoraLabsProvider.class';

export const defaultOptions: HandleClientOptions = {
    context: HandleClientContext.MAINNET,
    provider: new KoraLabsProvider(HandleClientContext.MAINNET)
};

export class HandleClient {
    private options: HandleClientOptions;
    private policyIds = {
        [HandleClientContext.MAINNET]: ['f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'],
        [HandleClientContext.PREVIEW]: ['8d18d786e92776c824607fd8e193ec535c79dc61ea2405ddf3b09fe3']
    };

    constructor(options?: Partial<HandleClientOptions>) {
        this.options = {
            ...defaultOptions,
            ...options
        };
    }

    public setContext(context: HandleClientContext) {
        this.options.context = context;
    }

    public getProviderInstance() {
        return this.options.provider;
    }

    public getContext(): HandleClientContext {
        return this.options.context;
    }

    public getPolicyIdsByContext(context: HandleClientContext) {
        return this.policyIds[context];
    }

    public getActivePolicyIds() {
        return this.policyIds[this.options.context];
    }

    public isADAHandle(policyId: string): boolean {
        const ids = this.getActivePolicyIds();
        return ids.includes(policyId);
    }
}
