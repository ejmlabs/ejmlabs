# Proposal

## Why

The public-site review found repeated copy, stale source-access limits, a bypassable shared design check, and account pages that show unavailable actions. Visitors need clear next steps and one design system across all eight surfaces.

## What Changes

- Enforce ejm-ui design contracts by default and use its native HTML profile for the extension registry.
- Shorten Studio, product, Chess and gallery copy while retaining meaningful release, security, consent and recovery details.
- Correct public-source guidance and align Harness examples with the checked source revision.
- Show a useful shared component example in the gallery and legible recorded Harness results without inventing a product interface.
- Give signed-out Relay browsers a shared sign-in page and show privacy and billing actions only when available.
- Update affected public guides and skills, verify owner and consumer contracts, and preserve existing budgets.

## Capabilities

### New Capabilities

- `account-entry-presentation`: Clear browser entry and state-based actions for Relay and the native extension registry.

### Modified Capabilities

- `ui-package`: Mandatory site design enforcement and native registry coverage.
- `ejmlabs-site`: Current source availability and concise project discovery and demo disclosure.

## Impact

The planning home is ejmlabs. This authorized coordinated change also affects ejm-ui, ejm-cli, ejm-ide, ejm-harness and the existing Chess checkout. ejm-ui owns public visual and build contracts; each consumer owns its content and domain state. Dependencies remain consumer to shared package, with no runtime framework added to native pages. Registry and Relay authentication, permissions and persistence stay with their current owners. Publication is separate from local verification.
