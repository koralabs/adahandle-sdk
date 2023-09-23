import { HandleClientProvider, KoraLabsProvider } from './classes/providers';

export enum HandleClientContext {
    PREVIEW = 0,
    MAINNET = 1
}

export interface HandleClientOptions<T = HandleClientProvider> {
    context: HandleClientContext;
    provider: T;
}
