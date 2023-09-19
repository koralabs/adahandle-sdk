import { IHandle } from '@koralabs/handles-public-api-interfaces';

import { HandleClientProvider } from './HandleClientProvider.abstract.class';

export class KoraLabsProvider extends HandleClientProvider<IHandle> {
    public apiurl = 'https://api.handle.me';
    private headers = new Headers();

    constructor(header_key?: string) {
        super();
        header_key && this.headers.append('key', header_key);
    }

    getCardanoAddress = async (handle: string): Promise<string> => {
        const { resolved_addresses } = await fetch(`${this.apiurl}/handles/${this.resolveName(handle)}`, {
            headers: this.headers
        }).then<IHandle>((res) => res.json());
        return resolved_addresses.ada;
    };

    getBitcoinAddress = async (handle: string): Promise<string | undefined> => {
        const { resolved_addresses } = await fetch(`${this.apiurl}/handles/${this.resolveName(handle)}`, {
            headers: this.headers
        }).then<IHandle>((res) => res.json());
        return resolved_addresses?.btc;
    };

    getEthereumAddress = async (handle: string): Promise<string | undefined> => {
        const { resolved_addresses } = await fetch(`${this.apiurl}/handles/${this.resolveName(handle)}`, {
            headers: this.headers
        }).then<IHandle>((res) => res.json());
        return resolved_addresses?.eth;
    };

    getAllData = (handle: string): Promise<IHandle> => {
        return fetch(`${this.apiurl}/handles/${this.resolveName(handle)}`, {
            headers: this.headers
        }).then<IHandle>((res) => res.json());
    };
}
