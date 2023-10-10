import { AssetNameLabel } from '@koralabs/handles-public-api-interfaces';
import { HEX, HandleClientContext, HandleClientOptions, Readable } from '../types';
import { KoraLabsProvider } from './providers/KoraLabsProvider.class';
import { isHex } from '../utils/hex';

export class HandleClient<T = KoraLabsProvider> {
    private options: HandleClientOptions<T>;
    static policyIds = {
        [HandleClientContext.MAINNET]: ['f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'],
        [HandleClientContext.PREVIEW]: ['8d18d786e92776c824607fd8e193ec535c79dc61ea2405ddf3b09fe3']
    };

    constructor(options: HandleClientOptions<T>) {
        this.options = { ...options };
    }

    public setContext(context: HandleClientContext) {
        this.options.context = context;
    }

    public provider() {
        return this.options.provider;
    }

    public getContext(): HandleClientContext {
        return this.options.context;
    }

    public getPolicyIdsByContext(context: HandleClientContext) {
        return HandleClient.policyIds[context];
    }

    public getActivePolicyIds() {
        return HandleClient.policyIds[this.options.context];
    }

    public isADAHandle(policyId: string): boolean {
        const ids = this.getActivePolicyIds();
        return ids.includes(policyId);
    }

    /**
     * Utility method to check whether a handle is a CIP-68 handle.
     *
     * @param {HEX} handle - The handle to check in its HEX encoded format.
     * @returns {boolean} - Whether the handle is CIP-68 or not.
     * @throws
     */
    static isCIP68(handle: HEX): boolean {
        return handle.value.indexOf(AssetNameLabel.LABEL_222) === 0;
    }

    /**
     * Utility method to get the normalized name of a CIP-68 or CIP-25 handle.
     *
     * @param {HEX} handle - The CIP-68 or CIP-25 handle to parse, in HEX format.
     * @returns {Readable}
     * @throws
     */
    static getNormalizedName(handle: HEX): Readable {
        if (!isHex(handle.value) || handle.value === '') {
            throw new Error('To get a normalized name, you must provide a valid HEX encoded name.');
        }

        const hexName = HandleClient.isCIP68(handle)
            ? handle.value.replace(AssetNameLabel.LABEL_222, '')
            : handle.value;

        return { value: Buffer.from(hexName, 'hex').toString('utf-8') };
    }

    /**
     * Utility method to get the HEX-encoded name of the CIP-68 or CIP-25 handle.
     *
     * @param {Readable} handle - The CIP-68 or CIP-25 handle to parse, in UTF-8 format.
     * @returns {HEX}
     * @throws
     */
    static getEncodedName(handle: HEX, assetNameLabel?: AssetNameLabel): HEX {
        const name = Buffer.from(handle.value).toString('hex');
        return { value: assetNameLabel ? `${assetNameLabel}${name}` : name };
    }
}
