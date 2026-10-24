# Spec Delta

## Purpose

Keep ejmlabs copy honest about being a one-person lab.

## ADDED Requirements

### Requirement: ejmlabs is a lab
Copy about ejmlabs SHALL call it a lab, never a studio, and SHALL describe it as a one-person lab for small experiments, useful software, and open source tools.

#### Scenario: A reader sees the description
- **WHEN** a README, profile bio or project tagline describes ejmlabs
- **THEN** it says lab and does not say studio

### Requirement: ejmlabs speaks in the third person
Copy SHALL use "ejmlabs" as the subject and MUST NOT use "we", "our", "us" or "the team" for ejmlabs. Copy MUST NOT claim customers, clients, rates, availability or paid work.

#### Scenario: A greeting is written
- **WHEN** a profile introduction greets readers
- **THEN** it reads as one person speaking for ejmlabs and makes no commercial claim

### Requirement: Stated lengths are honest
A document that states a character count for a bio or post draft SHALL state the real count.

#### Scenario: A bio is edited
- **WHEN** the bio wording changes
- **THEN** the stated count is recomputed
