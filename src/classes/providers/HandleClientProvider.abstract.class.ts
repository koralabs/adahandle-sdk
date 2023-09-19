import { isHex } from '../../utils/hex';

export abstract class HandleClientProvider<T = {}> {
    abstract getCardanoAddress: (handle: string) => Promise<string>;
    abstract getBitcoinAddress: (handle: string) => Promise<string | undefined>;
    abstract getEthereumAddress: (handle: string) => Promise<string | undefined>;
    abstract getAllData: (handle: string) => Promise<T>;

    /**
     * Helper function to format a handle string to its readable encoding.
     *
     * @param handle Hex or UTF-8 encoded handle string.
     * @returns UTF-8 encoded handle name as a string.
     */
    public resolveName(handle: string): string {
        if (isHex(handle)) {
            return Buffer.from(handle, 'hex').toString('utf-8');
        }

        return handle;
    }
}
