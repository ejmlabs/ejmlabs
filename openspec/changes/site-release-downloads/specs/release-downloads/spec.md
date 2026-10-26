# Spec Delta

## Purpose

Lets visitors download and install a released ejm product from ejmlabs.com for a platform that has a build, and verify what they received.

## ADDED Requirements

### Requirement: Offer only built platforms
The site SHALL list a download for a product and platform only when `releases.json` lists an artifact for it. For every other platform it SHALL show "Not yet available", or "waiting for notarization" for macOS while no notarized macOS build exists, with no link and no date.

#### Scenario: A platform has a build
- **WHEN** `releases.json` lists an artifact for a product and platform
- **THEN** the download page shows its link, size and SHA-256

#### Scenario: A platform has no build
- **WHEN** a product has no artifact for a platform
- **THEN** the page shows its status text and offers no file, installer or date

### Requirement: Manifest integrity
`releases.json` SHALL list for each artifact a product, version, target, file name, HTTPS URL, size and SHA-256. The build SHALL fail on a missing or malformed digest, a non-HTTPS URL, a duplicate product and target, a version that differs from the URL tag, the file name or the product's other artifacts, and a URL that is not `https://github.com/<owner>/<repo>/releases/download/v<version>/<file>` on the repository that owns the product.

#### Scenario: Invalid entry
- **WHEN** an entry breaks any rule above
- **THEN** the build and its tests fail and no page or script is written

### Requirement: Generated install script
`install.sh` SHALL be generated from the manifest with versions, URLs and digests embedded, SHALL verify the SHA-256 before installing, and SHALL offer `--dry-run`. It SHALL install under `$HOME/.local/bin` without elevated privileges or shell-profile edits, and SHALL never run the downloaded program.

#### Scenario: Install on a listed platform
- **WHEN** a visitor runs the install command on a listed platform
- **THEN** the script downloads the versioned archive, verifies its digest, installs under the home directory and prints the version, the path and that the build is unsigned

#### Scenario: Checksum mismatch or truncated file
- **WHEN** the digest differs or the download is cut off
- **THEN** nothing is installed and the exit status is non-zero

#### Scenario: Unlisted platform
- **WHEN** the system has no listed artifact
- **THEN** the script downloads nothing and says which platforms are available

### Requirement: Safe script handling
The script SHALL run its body only after the whole file is received, fetch only over HTTPS with `--proto '=https' --tlsv1.2`, work in a private temporary directory removed on exit, move the file into place atomically, and fail closed when no SHA-256 tool exists.

#### Scenario: Truncated script
- **WHEN** the script is cut off in transit
- **THEN** nothing runs

#### Scenario: No hash tool
- **WHEN** neither `sha256sum` nor `shasum` exists
- **THEN** nothing is installed and the exit status is non-zero

### Requirement: Honest statements
The site SHALL describe a build as signed or notarized only after a signing run for that release is recorded. Until then it SHALL say builds are not signed with a developer certificate and not notarized, and that a checksum confirms a file matches what was published and does not prove who built it.

#### Scenario: Unsigned build
- **WHEN** an artifact is listed
- **THEN** the page says it is not signed with a developer certificate or notarized

### Requirement: Static page without new origins
The download page SHALL be static, SHALL add no inline script, form or origin, SHALL collect no data of its own, and SHALL say the file host keeps its own request logs.

#### Scenario: Built page
- **WHEN** the site is built
- **THEN** the page has no inline script, no form and no origin outside the existing policy
