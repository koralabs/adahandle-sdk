# adahandle-sdk
SDK for ADA Handle

## Example
```ts
import ADAHandleClient, { ADAHandleClientContext, ADAHandleClientFetchResponse } from "@koralabs/adahandle-sdk"

const myClient = new ADAHandleClient({
    context: ADAHandleClientContext.MAINNET,
    resolver: async (handle): ADAHandleClientFetchResponse => {
        // Resolver to get data for the Handle.

        return {
            address: "addr1...."
        }
    }
})
```