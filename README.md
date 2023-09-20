# adahandle-sdk
SDK for ADA Handle

## Example
```ts
import HandleClient, { KoraLabsProvider, HandleClientOptions, HandleClientContext } from "@koralabs/adahandle-sdk"

const options: HandleClientOptions = {
    context: HandleClientContext.MAINNET,
    provider: new KoraLabsProvider(HandleClientContext.MAINNET)
};

const myClient = new ADAHandleClient(options)

// CIP-25
console.log(await myClient.provider().getCardanoAddress("customHandleName")) // addr123...
console.log(await myClient.provider().getBitcoinAddress("customHandleName")) // undefined

// CIP-68
console.log(await myClient.provider().getCardanoAddress("000de14064726f706361707461696e")) // addr123...
console.log(await myClient.provider().getBitcoinAddress("000de14064726f706361707461696e")) // bc123...
```