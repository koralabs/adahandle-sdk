import { IHandle } from '@koralabs/handles-public-api-interfaces';

import { HandleClientProvider } from './HandleClientProvider.abstract.class';

/**
 * KoraLabsProvider class that extends HandleClientProvider and
 * provides methods to interact with the Handle.me API.
 *
 * @extends {HandleClientProvider}
 */
export class KoraLabsProvider extends HandleClientProvider<IHandle> {
    /** Base URL for the Handle.me API. */
    public apiurl = 'https://api.handle.me';

    /** Request headers for the API. */
    private headers = new Headers();

    /** Name of the API key header. */
    private API_KEY_NAME = 'HANDLE_ME_API_KEY';

    /**
     * Creates an instance of the KoraLabsProvider.
     *
     * @param {string} [header_key] - Optional API key for the Handle.me API.
     */
    constructor(header_key?: string) {
        super();
        header_key && this.headers.append(this.API_KEY_NAME, header_key);
    }

    /**
     * Retrieves the Cardano address for a given handle.
     *
     * @param {string} handle - The handle to lookup.
     * @returns {Promise<string>} - A promise that resolves to the Cardano address.
     */
    getCardanoAddress = async (handle: string): Promise<string> => {
        const { resolved_addresses } = await fetch(`${this.apiurl}/handles/${this.resolveName(handle)}`, {
            headers: this.headers
        }).then<IHandle>((res) => res.json());
        return resolved_addresses.ada;
    };

    /**
     * Retrieves the Bitcoin address for a given handle.
     *
     * @param {string} handle - The handle to lookup.
     * @returns {Promise<string|undefined>} - A promise that resolves to the Bitcoin address, or undefined if not found.
     */
    getBitcoinAddress = async (handle: string): Promise<string | undefined> => {
        const { resolved_addresses } = await fetch(`${this.apiurl}/handles/${this.resolveName(handle)}`, {
            headers: this.headers
        }).then<IHandle>((res) => res.json());
        return resolved_addresses?.btc;
    };

    /**
     * Retrieves the Ethereum address for a given handle.
     *
     * @param {string} handle - The handle to lookup.
     * @returns {Promise<string|undefined>} - A promise that resolves to the Ethereum address, or undefined if not found.
     */
    getEthereumAddress = async (handle: string): Promise<string | undefined> => {
        const { resolved_addresses } = await fetch(`${this.apiurl}/handles/${this.resolveName(handle)}`, {
            headers: this.headers
        }).then<IHandle>((res) => res.json());
        return resolved_addresses?.eth;
    };

    /**
     * Retrieves all data associated with a given handle.
     *
     * @param {string} handle - The handle to lookup.
     * @returns {Promise<IHandle>} - A promise that resolves to the handle data.
     */
    getAllData = (handle: string): Promise<IHandle> => {
        return fetch(`${this.apiurl}/handles/${this.resolveName(handle)}`, {
            headers: this.headers
        }).then<IHandle>((res) => res.json());
    };
}
