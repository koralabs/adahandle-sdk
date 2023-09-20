import { HandleClientContext, HandleClientOptions } from '../types';
import { KoraLabsProvider } from './providers/KoraLabsProvider.class';

export class HandleClient<T = KoraLabsProvider> {
    static policyIds = {
        [HandleClientContext.MAINNET]: ['f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'],
        [HandleClientContext.PREVIEW]: ['8d18d786e92776c824607fd8e193ec535c79dc61ea2405ddf3b09fe3']
    };

    constructor(private options: HandleClientOptions<T>) {}

    public setContext(context: HandleClientContext) {
        this.options.context = context;
    }

    public provider() {
        return this.options.provider;
    }

    public getContext(): HandleClientContext {
        return this.options.context;
    }

    public getPolicyIdsByContext(context: HandleClientContext) {
        return HandleClient.policyIds[context];
    }

    public getActivePolicyIds() {
        return HandleClient.policyIds[this.options.context];
    }

    public isADAHandle(policyId: string): boolean {
        const ids = this.getActivePolicyIds();
        return ids.includes(policyId);
    }
}
