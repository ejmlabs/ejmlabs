# project-platform-claims Specification

## Purpose
Keep Studio project platform claims aligned with the projects that own support.

## Requirements

### Requirement: Supported platform claims reflect project documentation
Studio SHALL distinguish each project's documented supported target from platforms that have not been qualified.

#### Scenario: IDE platform information
- **WHEN** a visitor reads the IDE platform fact
- **THEN** the fact identifies Apple Silicon macOS as the current target and does not claim other platforms are supported
