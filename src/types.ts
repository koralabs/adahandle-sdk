import { HandleClientProvider } from './classes/providers';

export enum HandleClientContext {
    TESTNET = 0,
    MAINNET = 1
}

export interface HandleClientOptions {
    context: HandleClientContext;
    resolver: HandleClientProvider;
}
