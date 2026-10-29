## ADDED Requirements

### Requirement: Site test reporting

When `EJM_TEST_REPORT` is set, the site test command SHALL write machine-readable per-test results to that path while preserving the test exit status and normal console output.

#### Scenario: Successful or failing test run

- **WHEN** the site test command runs with `EJM_TEST_REPORT` set
- **THEN** it writes JUnit results and preserves its test status

#### Scenario: Local default

- **WHEN** `EJM_TEST_REPORT` is unset
- **THEN** the site test command uses the usual Node test output
