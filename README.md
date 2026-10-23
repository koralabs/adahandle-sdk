# adahandle-sdk

## Contributor test policy

Tests and coverage run locally only, never in GitHub Actions, directly or through lifecycle scripts, composites, workflow templates, or shared helpers. Preserve local test commands. Build, lint, publication, deployment, and production guards remain permitted. Remove obsolete required test checks when retiring them.
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