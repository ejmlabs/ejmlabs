# Spec Delta

## Purpose

Gives people a short way to send feedback and bug reports with no data held by the site.

## ADDED Requirements

### Requirement: Report links per product
The download page SHALL link, for each product, to its bug form, its feedback form and its private security report form in the product's repository. Version and platform SHALL be passed only in the `evidence` query value, and only when the page knows them.

#### Scenario: Report a bug
- **WHEN** a visitor selects "Report a bug" for a product
- **THEN** the product's bug form opens, with version and platform in the evidence field when known

#### Scenario: Report a vulnerability
- **WHEN** a visitor looks for a security route
- **THEN** a link opens the private advisory form and the page asks them not to post details publicly

### Requirement: No data held by the site
The site SHALL read nothing from the visitor to build a link, run no endpoint or store for reports, and add no policy source for them. The Privacy page SHALL say what the download and feedback links touch and who keeps logs.

#### Scenario: Link use
- **WHEN** a visitor uses a report link
- **THEN** the site records nothing beyond its existing analytics
