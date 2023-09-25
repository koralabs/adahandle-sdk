# Setup

## Requirements

- A Blockfrost API Key for mainnet.
- A `.env` file, copied from `.env.example` with the Blockfrost API key added.

## Develop

To setup the demo environment, from the root directory, run:

```bash
yarn watch
```

Then run:

```bash
cd demo && yarn && yarn start
```

To clean up, from the root directory, run:

```bash
yarn unlink
```