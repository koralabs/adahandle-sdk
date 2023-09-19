import { HandleClientProvider } from './classes/providers';

export enum HandleClientContext {
    PREVIEW = 0,
    MAINNET = 1
}

export interface HandleClientOptions {
    context: HandleClientContext;
    provider: HandleClientProvider;
}
