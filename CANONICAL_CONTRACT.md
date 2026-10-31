# adahandle-sdk canonical contract

## Purpose and authority

I am the legacy public JavaScript SDK (`@koralabs/adahandle-sdk`, published to npm) that third-party apps use to turn a Handle name into a Cardano address (and BTC/ETH addresses and personalization data) through the Handle API (`KoraLabsProvider`) or Blockfrost (`BlockfrostProvider`). I move no value and hold no keys, but apps send money to the address I return, so address correctness is my whole job. Ecosystem rule: `../AGENTS.md` "Critical Correctness": Handle addresses must be correct 100% of the time. Paths in [`.enclave`](./.enclave) need operator approval to merge.

## Invariants (must never be violated)

1. I return the address the chain or the Handle API reports for the exact Handle asked about, or I fail loudly. I never return an address for a different Handle, an empty value, or `undefined` in place of a failure. (Not met everywhere; see limits.)
2. Handle names are encoded and decoded losslessly: hex to UTF-8 and back, with the CIP-68 `000de140` (222) label stripped and added exactly once. (`HandleClient.getNormalizedName`, `getEncodedName`, `isCIP68`; tests in `src/__tests__/HandleClient.test.ts` and `utils.test.ts`.)
3. A policy id counts as a Handle only if it is in `HandleClient.policyIds` for the active network (mainnet, preview). `isADAHandle` never says yes to another policy. (Policy ids are in `HandleClient.class.ts`; tested only by "should have isADAHandle method", which does not check a wrong policy.)
4. Only reviewed source is published: `package.json` and the deploy workflow change only with operator approval, because an npm release goes straight into other people's wallets and apps.
5. No secrets in git. API keys come from the caller at construction time. (No test.)

## Boundaries and known limits

- Invariant 1 is violated in places today:
  - `HandleClientProvider.__handleResponse` turns any network or JSON failure into an empty object and never checks the HTTP status, so an error body is treated as handle data.
  - `BlockfrostProvider.getCardanoAddress` interpolates `getEncodedName(handle)` (an object) into the URL, so the request path contains `[object Object]`; and its `/addresses` request sends no `project_id` header, so the non-CIP-68 path cannot succeed.
  - For CIP-68 handles `BlockfrostProvider` reads `resolved_addresses.ada` from the token's on-chain metadata, which can be stale, rather than the address that currently holds the asset.
  - `KoraLabsProvider.getBitcoinAddress`/`getEthereumAddress` return `undefined` for a failed lookup, which looks like "no address".
- The SDK knows mainnet and preview only, not preprod. Only the first policy id of a network is used for lookups.
- Tests cover construction and name encoding. No test runs a lookup against a recorded API response, a 404, or a malformed body.
- The package is legacy; the maintained path is `@koralabs/handles-public-api-interfaces` plus the API directly.

## Refactors needed to enforce this

- Make `__handleResponse` reject on non-2xx and on missing `resolved_addresses`, instead of returning `{}`.
- Fix `BlockfrostProvider` to use `.value` of the encoded name, send the API key on every request, and resolve CIP-68 addresses from the asset's current holder.
- Add lookup tests against recorded API fixtures for success, 404, malformed JSON and a wrong policy.
- Add a negative case to the `isADAHandle` test.
