# adahandle-sdk canonical contract

Legacy public JavaScript SDK (`@koralabs/adahandle-sdk`, npm) that turns a Handle name into a Cardano address (plus BTC/ETH addresses and personalization data) through the Handle API (`KoraLabsProvider`) or Blockfrost (`BlockfrostProvider`). It moves no value and holds no keys; apps pay to the address it returns.

1. Handle names are encoded and decoded losslessly (hex to UTF-8 and back), with the CIP-68 `000de140` (222) label stripped and added exactly once.
2. A policy id counts as a Handle only if it is in `HandleClient.policyIds` for the active network (mainnet, preview); `isADAHandle` says no to any other policy.
3. API keys are supplied by the caller at construction; none are embedded.
