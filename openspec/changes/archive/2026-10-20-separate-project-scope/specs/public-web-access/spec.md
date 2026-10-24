# Spec Delta

## MODIFIED Requirements

### Requirement: Private services retain their boundaries

Changing public access SHALL preserve country restrictions, Access applications, webhook method restrictions, and authentication on other hosts and services. Project records SHALL describe this boundary without importing unrelated proprietary product identities or operations.

#### Scenario: Private service remains private

- **WHEN** public host security rules are changed
- **THEN** existing country restrictions and Access policies on unrelated private hosts remain intact
- **AND** project documentation records only the scope needed to protect that boundary
