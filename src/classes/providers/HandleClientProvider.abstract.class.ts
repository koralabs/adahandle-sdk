import { Buffer } from 'buffer';

import { isHex } from '../../utils/hex';

/**
 * Abstract class `HandleClientProvider` serving as a template for
 * classes that provide methods to interact with different handle providers.
 *
 * @template T - The type of data returned by the `getAllData` method.
 */
export abstract class HandleClientProvider<T = {}> {
    static CIP68_PREFIX = '000de140';

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
     * Utility method to check whether a handle is a CIP-68 handle.
     *
     * @param {string} handle - The handle to check.
     * @returns {boolean} - Whether the handle is CIP-68 or not.
     */
    public isCIP68(handle: string): boolean {
        return handle.indexOf(HandleClientProvider.CIP68_PREFIX) === 0;
    }

    /**
     * Utility method to get the normalized name of a CIP-68 or CIP-25 handle.
     *
     * @param {string} handle - The CIP-68 or CIP-25 handle to parse.
     * @returns {string}
     */
    public getNormalizedName(handle: string): string {
        return this.isCIP68(handle) ? handle.replace(HandleClientProvider.CIP68_PREFIX, '') : handle;
    }

    /**
     * Utility method to get the HEX-encoded name of the CIP-68 or CIP-25 handle.
     *
     * @param {string} handle - The CIP-68 or CIP-25 handle to parse.
     * @returns {string}
     */
    public getEncodedName(handle: string): string {
        return isHex(handle) ? handle : Buffer.from(handle).toString('hex');
    }

    /**
     * Handles API rejection feedback for handle-specific requests.
     * @param {Promise<Response>} api - The API response, usually from fetch().
     * @param {string} handle - The handle supplied to the lookup.
     * @returns
     */
    protected async __handleResponse<T>(api: Promise<Response>, handle: string) {
        return api
            .then((res) => res.json() as T)
            .catch((e) => {
                console.error(
                    `Something went wrong while fetching this Handle: ${handle}.${
                        isHex(handle)
                            ? ` You may need to convert the Handle name to UTF-8 before providing it to this function.`
                            : ''
                    } Here is the full error:`,
                    e
                );

                return {} as T;
            });
    }
}
