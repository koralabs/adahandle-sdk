import { IHandle, IPersonalization } from '@koralabs/handles-public-api-interfaces';
import fetch from 'cross-fetch';

import { HandleClient } from '../HandleClient.class';
import { HandleClientProvider } from './HandleClientProvider.abstract.class';
import { HEX, HandleClientContext } from '../../types';

/**
 * KoraLabsProvider class that extends HandleClientProvider and
 * provides methods to interact with the Handle.me API.
 *
 * @extends {HandleClientProvider}
 */
export class KoraLabsProvider extends HandleClientProvider<IHandle> {
    public apiUrl: string;

    /** Request headers for the API. */
    private headers = new Headers({
        'Content-Type': 'application/json'
    });

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
     * @param {HEX} handle - The handle to lookup, in HEX format.
     * @returns {Promise<string>} - A promise that resolves to the Cardano address.
     */
    getCardanoAddress = async (handle: HEX): Promise<string> => {
        const name = HandleClient.getNormalizedName(handle);
        const { resolved_addresses } = await this.__handleResponse<IHandle>(
            fetch(`${this.apiUrl}/handles/${name.value}`, {
                headers: this.headers
            }),
            name
        );
        return resolved_addresses.ada;
    };

    /**
     * Retrieves the Bitcoin address for a given handle.
     *
     * @param {HEX} handle - The handle to lookup, in HEX format.
     * @returns {Promise<string|undefined>} - A promise that resolves to the Bitcoin address, or undefined if not found.
     */
    getBitcoinAddress = async (handle: HEX): Promise<string | undefined> => {
        const name = HandleClient.getNormalizedName(handle);
        const { resolved_addresses } = await this.__handleResponse<IHandle>(
            fetch(`${this.apiUrl}/handles/${name.value}`, {
                headers: this.headers
            }),
            name
        );
        return resolved_addresses?.btc;
    };

    /**
     * Retrieves the Ethereum address for a given handle.
     *
     * @param {HEX} handle - The handle to lookup, in HEX format.
     * @returns {Promise<string|undefined>} - A promise that resolves to the Ethereum address, or undefined if not found.
     */
    getEthereumAddress = async (handle: HEX): Promise<string | undefined> => {
        const name = HandleClient.getNormalizedName(handle);
        const { resolved_addresses } = await this.__handleResponse<IHandle>(
            fetch(`${this.apiUrl}/handles/${name.value}`, {
                headers: this.headers
            }),
            name
        );
        return resolved_addresses?.eth;
    };

    /**
     * Retrieves all data associated with a given handle.
     *
     * @param {HEX} handle - The handle to lookup, in HEX format.
     * @returns {Promise<IHandle>} - A promise that resolves to the handle data.
     */
    getAllData = async (handle: HEX): Promise<IHandle> => {
        const name = HandleClient.getNormalizedName(handle);
        return this.__handleResponse<IHandle>(
            fetch(`${this.apiUrl}/handles/${name.value}`, {
                headers: this.headers
            }),
            name
        );
    };

    /**
     * Retrieves all personalized data associated with a given handle.
     *
     * @param {HEX} handle - The handle to lookup, in HEX format.
     * @returns {Promise<IPersonalization>} - A promise that resolves to the handle data.
     *
     * @example
     * {
     *  "validated_by": "0x4da965a049dfd15ed1ee19fba6e2974a0b79fc416dd1796a1f97f5e1",
     *  "trial": false,
     *  "nsfw": false,
     *  "designer": {
     *      "bg_color": "0x8600ffbd",
     *      "creator_defaults_enabled": 0,
     *      "bg_border_color": "0xff5400e0",
     *      "font_shadow_color": "0x100202ff",
     *      "font_shadow_size": [9, 8, 8],
     *      "text_ribbon_colors": ["0x4858ffff"]
     *  }
     * }
     */
    getPersonalizedData = async (handle: HEX): Promise<IPersonalization> => {
        const name = HandleClient.getNormalizedName(handle);
        return this.__handleResponse<IPersonalization>(
            fetch(`${this.apiUrl}/handles/${name.value}/personalized`, {
                headers: this.headers
            }),
            name
        );
    };
}
