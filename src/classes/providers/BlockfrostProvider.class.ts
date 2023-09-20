import { IHandle } from '@koralabs/handles-public-api-interfaces';
import type { components } from '@blockfrost/openapi';

import { HandleClientProvider } from './HandleClientProvider.abstract.class';
import { HandleClientContext } from '../../types';
import { HandleClient } from '../HandleClient.class';

export type BlockfrostHandle =
    | ((components['schemas']['onchain_metadata_cip25'] | components['schemas']['onchain_metadata_cip68_nft_222']) & {
          address: string;
      })
    | (Partial<IHandle> & { [key: string]: any });

/**
 * BlockfrostProvider class that extends HandleClientProvider and
 * provides methods to interact with the Handle.me API.
 *
 * @extends {HandleClientProvider}
 */
export class BlockfrostProvider extends HandleClientProvider<BlockfrostHandle> {
    public apiUrl: string;

    /** Request headers for the API. */
    private headers = new Headers({
        'Content-Type': 'application/json'
    });

    /** Name of the API key header. */
    private API_KEY_NAME = 'project_id';

    /**
     * Creates an instance of the KoraLabsProvider.
     *
     * @param {string} [projectId] - Optional API key for the Handle.me API.
     */
    constructor(public network: HandleClientContext, projectId: string) {
        super();
        this.apiUrl = `https://cardano-${HandleClientContext[network].toLowerCase()}.blockfrost.io/api/v0`;
        this.headers.append(this.API_KEY_NAME, projectId);
    }

    /**
     * Retrieves the Cardano address for a given handle.
     *
     * @param {string} handle - The handle to lookup.
     * @returns {Promise<string>} - A promise that resolves to the Cardano address.
     */
    getCardanoAddress = async (handle: string): Promise<string> => {
        if (this.isCIP68(handle)) {
            const { onchain_metadata } = await this.__handleResponse<BlockfrostHandle>(
                fetch(
                    `${this.apiUrl}/assets/${HandleClient.policyIds[this.network][0]}${this.getEncodedName(handle)}`,
                    {
                        headers: this.headers
                    }
                ),
                this.getNormalizedName(handle)
            );

            if (onchain_metadata) {
                return (onchain_metadata as unknown as IHandle).resolved_addresses.ada;
            }
        }

        const [{ address }] = await this.__handleResponse<components['schemas']['asset_addresses']>(
            fetch(
                `${this.apiUrl}/assets/${HandleClient.policyIds[this.network][0]}${this.getEncodedName(
                    handle
                )}/addresses`,
                {}
            ),
            this.getNormalizedName(handle)
        );

        return address;
    };

    /**
     * Retrieves the Bitcoin address for a given handle.
     *
     * @param {string} handle - The handle to lookup.
     * @returns {Promise<string|undefined>} - A promise that resolves to the Bitcoin address, or undefined if not found.
     */
    getBitcoinAddress = async (handle: string): Promise<string | undefined> => {
        if (this.isCIP68(handle)) {
            const { onchain_metadata } = await this.__handleResponse<BlockfrostHandle>(
                fetch(
                    `${this.apiUrl}/assets/${HandleClient.policyIds[this.network][0]}${this.getEncodedName(handle)}`,
                    {
                        headers: this.headers
                    }
                ),
                this.getNormalizedName(handle)
            );

            if (onchain_metadata) {
                return (onchain_metadata as unknown as IHandle).resolved_addresses?.btc;
            }
        }

        return undefined;
    };

    /**
     * Retrieves the Ethereum address for a given handle.
     *
     * @param {string} handle - The handle to lookup.
     * @returns {Promise<string|undefined>} - A promise that resolves to the Ethereum address, or undefined if not found.
     */
    getEthereumAddress = async (handle: string): Promise<string | undefined> => {
        if (this.isCIP68(handle)) {
            const { onchain_metadata } = await this.__handleResponse<BlockfrostHandle>(
                fetch(
                    `${this.apiUrl}/assets/${HandleClient.policyIds[this.network][0]}${this.getEncodedName(handle)}`,
                    {
                        headers: this.headers
                    }
                ),
                this.getNormalizedName(handle)
            );

            if (onchain_metadata) {
                return (onchain_metadata as unknown as IHandle).resolved_addresses?.eth;
            }
        }

        return undefined;
    };

    /**
     * Retrieves all data associated with a given handle.
     *
     * @param {string} handle - The handle to lookup.
     * @returns {Promise<BlockfrostHandle | IHandle>} - A promise that resolves to the handle data.
     */
    getAllData = async (handle: string): Promise<BlockfrostHandle> => {
        const data = await this.__handleResponse<BlockfrostHandle>(
            fetch(`${this.apiUrl}/assets/${HandleClient.policyIds[this.network][0]}${this.getEncodedName(handle)}`, {
                headers: this.headers
            }),
            this.getNormalizedName(handle)
        );

        let result: BlockfrostHandle = {
            ...(data?.onchain_metadata as unknown as Partial<IHandle>),
            ...(data?.metadata as {})
        };

        if (!result?.resolved_addresses) {
            const addresses = await this.__handleResponse<components['schemas']['asset_addresses']>(
                fetch(
                    `${this.apiUrl}/assets/${HandleClient.policyIds[this.network][0]}${this.getEncodedName(
                        handle
                    )}/addresses`,
                    { headers: this.headers }
                ),
                this.getNormalizedName(handle)
            );
            result.address = addresses?.[0]?.address;
        }

        return result;
    };
}
