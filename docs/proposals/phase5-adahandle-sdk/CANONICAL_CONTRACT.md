# adahandle-sdk canonical contract

**Status: DRAFT proposal (ecosystem-ownership-plan Phase 5, row 5.3). NOT ACTIVE.** Re-drafted 2026-10-28 from the closed proposal #12. It lives under `docs/proposals/phase5-adahandle-sdk/`, where `merge_pr` does not read it. The operator adopts it by moving this file and `.enclave` to the repo root in a separate change; paths below are repo-root-relative. Operator review of what must never be violated is pending.

Legacy public JS SDK for resolving handles. The code that holds the rules below is listed in [`.enclave`](./.enclave);
K.O.R.A.'s `merge_pr` asks the operator before a change to it merges into `master`.

## Source requirements

- Ecosystem `AGENTS.md` (koralabs root): "Critical Correctness" (addresses 100% correct, never
  double-mint, chain-accurate properties) and "Merging" (double-mint, contract/settings edits and
  automated burns need operator approval).
- kora-bot `v3/docs/ecosystem-ownership-plan.md` §6 decision 2 (enclave = key/security material,
  prompt files, and the files that define, support or enforce this contract) and Phase 5 row 5.3
  ("every remaining repo, even if the enclave is empty; each AGENTS.md points at both").
- kora-bot `v3/docs/tool-surface.md` (`merge_pr`): cards enclave paths merged into
  `master`/`main`/`mainnet`/`preprod`, reading a root `.enclave`.

## Must never be violated

1. **Resolved addresses are correct 100% of the time**: the SDK returns the address the chain says, or an error, never a guess.
2. **No secrets in the repo.** Keys, tokens, mnemonics and `.env` values live in the box SOPS stores or local `.env.local.*` files, never in git or GitHub secrets copied from them.

## Where it is enforced today

| # | Code |
|---|---|
| 1 | `src/classes/` |

## Refactor needed for enforcement

- Nothing here enforces an ecosystem-critical rule today, so the enclave holds only these two files. Add a path when this repo starts to hold keys, prompts, contract code or a double-mint check.
