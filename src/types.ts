import { HandleClientProvider } from './classes/providers';

export interface HEX {
    value: string;
}
export interface Readable {
    value: string;
}

export enum HandleClientContext {
    PREVIEW = 0,
    MAINNET = 1
}

export interface HandleClientOptions<T = HandleClientProvider> {
    context: HandleClientContext;
    provider: T;
}
