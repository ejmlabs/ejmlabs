# Spec Delta

## Purpose

Gives people a short way to send feedback and bug reports with minimal personal data and strong abuse controls.

## ADDED Requirements

### Requirement: A visible feedback route
The download page and each product's section SHALL link to "Report a bug" and "Send feedback" for that product. Each link SHALL open the product's issue form, with the product version and platform prefilled only where the form has fields for them. A separate link SHALL open the product's private vulnerability report form.

#### Scenario: Report a bug
- **WHEN** a visitor selects "Report a bug" for a product
- **THEN** the product's bug form opens in its repository
- **AND** the version appears prefilled when the page knows it

#### Scenario: Report a vulnerability
- **WHEN** a visitor looks for a security report route
- **THEN** a link opens the product's private advisory form and the page asks them not to post details publicly

### Requirement: Minimal personal data
Any feedback route SHALL NOT store an IP address, user agent or email address by default. A contact value SHALL be optional, labelled as only needed for a reply, and kept no longer than the report. The site SHALL read nothing from the visitor to build a feedback link.

#### Scenario: Issue link
- **WHEN** a visitor uses a feedback link
- **THEN** the site records nothing about the visit beyond the existing site analytics

#### Scenario: Optional contact
- **WHEN** a feedback form offers a contact field
- **THEN** it is not required and its purpose is stated next to it

### Requirement: Abuse controls before any hosted form
The site SHALL NOT host a feedback form that stores reports until it has server-verified bot protection, a per-client rate limit, a request size cap, a global off switch, a retention limit of at most 90 days, a private destination, and a documented review routine. The content security policy SHALL be widened only for those controls and only for the form's page.

#### Scenario: No hosted form
- **WHEN** feedback goes through issue links only
- **THEN** the site has no feedback endpoint, store or added policy source

#### Scenario: A form is later added
- **WHEN** a hosted form is proposed
- **THEN** it ships only with every control above, each covered by a test, and the privacy page states the retention
