import { IHandle } from '@koralabs/handles-public-api-interfaces';

import { HandleClientProvider } from './HandleClientProvider.abstract.class';
import { HandleClientContext } from '../../types';

/**
 * KoraLabsProvider class that extends HandleClientProvider and
 * provides methods to interact with the Handle.me API.
 *
 * @extends {HandleClientProvider}
 */
export class KoraLabsProvider extends HandleClientProvider<IHandle> {
    public apiUrl: string;

    /** Request headers for the API. */
    private headers = new Headers();

    /** Name of the API key header. */
    private API_KEY_NAME = 'HANDLE_ME_API_KEY';

    /**
     * Creates an instance of the KoraLabsProvider.
     *
     * @param {string} [headerKey] - Optional API key for the Handle.me API.
     */
    constructor(public network: HandleClientContext, headerKey?: string) {
        super();
        this.apiUrl = `https://${
            network === HandleClientContext.MAINNET ? '' : `${HandleClientContext[network].toLowerCase()}.`
        }api.handle.me`;
        headerKey && this.headers.append(this.API_KEY_NAME, headerKey);
    }

    /**
     * Retrieves the Cardano address for a given handle.
     *
     * @param {string} handle - The handle to lookup.
     * @returns {Promise<string>} - A promise that resolves to the Cardano address.
     */
    getCardanoAddress = async (handle: string): Promise<string> => {
        const { resolved_addresses } = await this.__handleResponse<IHandle>(
            fetch(`${this.apiUrl}/handles/${this.getNormalizedName(handle)}`, {
                headers: this.headers
            }),
            this.getNormalizedName(handle)
        );
        return resolved_addresses.ada;
    };

    /**
     * Retrieves the Bitcoin address for a given handle.
     *
     * @param {string} handle - The handle to lookup.
     * @returns {Promise<string|undefined>} - A promise that resolves to the Bitcoin address, or undefined if not found.
     */
    getBitcoinAddress = async (handle: string): Promise<string | undefined> => {
        const { resolved_addresses } = await this.__handleResponse<IHandle>(
            fetch(`${this.apiUrl}/handles/${this.getNormalizedName(handle)}`, {
                headers: this.headers
            }),
            this.getNormalizedName(handle)
        );
        return resolved_addresses?.btc;
    };

    /**
     * Retrieves the Ethereum address for a given handle.
     *
     * @param {string} handle - The handle to lookup.
     * @returns {Promise<string|undefined>} - A promise that resolves to the Ethereum address, or undefined if not found.
     */
    getEthereumAddress = async (handle: string): Promise<string | undefined> => {
        const { resolved_addresses } = await this.__handleResponse<IHandle>(
            fetch(`${this.apiUrl}/handles/${this.getNormalizedName(handle)}`, {
                headers: this.headers
            }),
            this.getNormalizedName(handle)
        );
        return resolved_addresses?.eth;
    };

    /**
     * Retrieves all data associated with a given handle.
     *
     * @param {string} handle - The handle to lookup.
     * @returns {Promise<IHandle>} - A promise that resolves to the handle data.
     */
    getAllData = async (handle: string): Promise<IHandle> => {
        return this.__handleResponse<IHandle>(
            fetch(`${this.apiUrl}/handles/${this.getNormalizedName(handle)}`, {
                headers: this.headers
            }),
            this.getNormalizedName(handle)
        );
    };
}
