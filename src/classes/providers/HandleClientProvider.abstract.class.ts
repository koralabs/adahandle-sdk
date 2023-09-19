import { isHex } from '../../utils/hex';

/**
 * Abstract class `HandleClientProvider` serving as a template for
 * classes that provide methods to interact with different handle providers.
 *
 * @template T - The type of data returned by the `getAllData` method.
 */
export abstract class HandleClientProvider<T = {}> {
    /**
     * Abstract method to retrieve the Cardano address for a given handle.
     *
     * @abstract
     * @param {string} handle - The handle to look up.
     * @returns {Promise<string>} - A promise that resolves to the Cardano address.
     */
    abstract getCardanoAddress: (handle: string) => Promise<string>;

    /**
     * Abstract method to retrieve the Bitcoin address for a given handle.
     *
     * @abstract
     * @param {string} handle - The handle to look up.
     * @returns {Promise<string|undefined>} - A promise that resolves to the Bitcoin address or undefined if not found.
     */
    abstract getBitcoinAddress: (handle: string) => Promise<string | undefined>;

    /**
     * Abstract method to retrieve the Ethereum address for a given handle.
     *
     * @abstract
     * @param {string} handle - The handle to look up.
     * @returns {Promise<string|undefined>} - A promise that resolves to the Ethereum address or undefined if not found.
     */
    abstract getEthereumAddress: (handle: string) => Promise<string | undefined>;

    /**
     * Abstract method to retrieve all data associated with a given handle.
     *
     * @abstract
     * @param {string} handle - The handle to look up.
     * @returns {Promise<T>} - A promise that resolves to the handle data.
     */
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
