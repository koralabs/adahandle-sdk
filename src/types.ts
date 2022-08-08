export enum ADAHandleClientContext {
    TESTNET = 0,
    MAINNET = 1
}

export interface ADAHandleClientFetchResponse {
    address: string;
}

export interface ADAHandleClientOptions {
    context: ADAHandleClientContext;
    resolver: (handle: string) => Promise<ADAHandleClientFetchResponse>;
}
