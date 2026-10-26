# Spec Delta

## Purpose

Lets visitors download and install a released ejm product from ejmlabs.com for a platform it supports, and verify what they received.

## ADDED Requirements

### Requirement: Offer only built and checked platforms
The site SHALL list a download for a product and platform only when a native build of that product for that platform exists in a published release and its smoke check has passed. For every other platform it SHALL show "Not yet available" with no link and no date.

#### Scenario: A platform has a verified build
- **WHEN** `releases.json` lists an artifact for a product and platform
- **THEN** the download page shows its link, size and SHA-256 for that platform

#### Scenario: A platform has no build
- **WHEN** a product has no artifact for a platform
- **THEN** the page shows "Not yet available" for it
- **AND** the page offers no file, installer or promise of a date

### Requirement: Immutable versioned files with published checksums
Each offered file SHALL be a release asset at a URL that names its version, and its SHA-256 SHALL be published both in the release and in `releases.json` on ejmlabs.com. A released file SHALL NOT be replaced or have its tag moved.

#### Scenario: A visitor verifies a download
- **WHEN** a visitor hashes a downloaded file
- **THEN** the digest matches the value on the download page and in the release checksum list

#### Scenario: A release is wrong
- **WHEN** a published release is found to be bad
- **THEN** a new version replaces it and the old release notes say why
- **AND** the old tag and assets are unchanged

### Requirement: One command or one click per offered platform
For each offered product and platform the page SHALL show one install command or one download link. The install script SHALL verify the SHA-256 from `releases.json` before installing, install without elevated privileges, and stop without installing on a mismatch or an unlisted platform.

#### Scenario: Install a command-line product
- **WHEN** a visitor runs the page's install command on a listed platform
- **THEN** the script downloads the versioned archive, verifies its digest and installs it under the user's home directory
- **AND** it prints the installed version and that the build is unsigned

#### Scenario: Checksum mismatch
- **WHEN** the downloaded file's digest differs from `releases.json`
- **THEN** the script installs nothing and exits with a non-zero status and a clear message

#### Scenario: Unlisted platform
- **WHEN** the visitor's operating system or CPU has no listed artifact
- **THEN** the script exits without downloading and says which platforms are available

### Requirement: Targets are gated by the repositories' own evidence
A product and platform SHALL be offered only after its smoke check passes **and** the evidence its repository lists as still owed for that platform is recorded as passed, or the owner approves shipping with each open item named as a known limit in the release notes and on the page. Linux builds SHALL state their runtime baseline.

#### Scenario: Owed evidence is open
- **WHEN** a repository's remaining-evidence list has an open item for a platform
- **THEN** that platform is not offered, unless the release notes and page name the item as a known limit with the owner's approval

#### Scenario: Linux build
- **WHEN** a Linux artifact is offered
- **THEN** the page and notes state the required system libraries and the minimum distribution

### Requirement: Honest signing and notarization statements
The site and release notes SHALL describe a build as signed or notarized only after a signing or notarization run for that exact release is recorded in the repository. Until then every offered native build SHALL be labelled as not signed with a developer certificate and not notarized, and a macOS app SHALL come with the System Settings, Privacy and Security, Open Anyway steps.

#### Scenario: A build is unsigned
- **WHEN** a native artifact has no recorded signing or notarization
- **THEN** its listing says it is not signed with a developer certificate or notarized and that the system may warn before opening it

### Requirement: Checksums are not signatures
A checksum or build-provenance manifest SHALL NOT be described as a signature or proof of identity, and the page SHALL say what the checksum does and does not protect.

#### Scenario: Checksum wording
- **WHEN** the page explains the checksum
- **THEN** it says the checksum confirms the file matches what was published and does not prove who built it
- **AND** it says a compromise of ejmlabs.com would not be caught by the checksum

### Requirement: Installer integrity and build separation
The install script SHALL be generated from the release manifest with its version, URLs and digests embedded, SHALL run its body only after the whole file has been received, SHALL fetch only over HTTPS, and SHALL fail closed when no SHA-256 tool exists.

#### Scenario: Truncated script
- **WHEN** the script is cut off in transit
- **THEN** nothing is installed

### Requirement: Build and attach are separate
Release builds SHALL run project code only in jobs without write access or secrets. A separate job that runs no project code SHALL verify every digest before attaching files to a draft release, and builds SHALL pass smoke checks before the version tag is created.

#### Scenario: Build job tries to write
- **WHEN** a build or smoke job runs
- **THEN** it holds read-only repository access and no secrets

#### Scenario: Digest differs at attach time
- **WHEN** an artifact's digest differs from the build job's record
- **THEN** the attach job fails and the draft release gets no files

### Requirement: Download page security and privacy
The download page SHALL be a static page served under the site's existing content security policy, SHALL add no inline script or third-party origin, and SHALL collect no data of its own. It SHALL state that the file host keeps its own request logs.

#### Scenario: Built page
- **WHEN** the site is built
- **THEN** the download page has no inline script, no form, and no origin outside the existing policy

#### Scenario: Privacy page
- **WHEN** a visitor reads the privacy page
- **THEN** it says what the download and feedback links touch and who keeps logs
