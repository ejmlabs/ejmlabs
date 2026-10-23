# Spec Delta

## ADDED Requirements

### Requirement: Controller presentation follows connection state
Shared controller presentation SHALL show connection and approval tasks before the live workspace. Session output and action controls SHALL appear after authenticated session data arrives. A later connection loss SHALL retain the session and uncertain-action feedback while showing recovery. Setup errors and focus targets SHALL remain reachable. Shared presentation SHALL preserve trust, host permissions, bounded scrolling and existing byte limits.

#### Scenario: First connection
- **WHEN** a visitor has not received authenticated session data
- **THEN** the page shows the invitation or host-approval task as its main content
- **AND** the unused workspace occupies no space and has no keyboard stops
- **AND** the browser trust disclosure and acknowledgment remain part of pairing

#### Scenario: Host allows the session
- **WHEN** the first authenticated session snapshot arrives
- **THEN** the page reveals its full-width output and permission-aware action controls
- **AND** connection details remain available without dominating the workspace
- **AND** focus moves to a visible session target once, without following streaming updates

#### Scenario: Connection fails or is lost
- **WHEN** setup fails or a displayed session loses transport
- **THEN** feedback and recovery controls remain visible and keyboard reachable
- **AND** a displayed transcript and uncertain-action feedback remain available
- **AND** reconnect does not resend an uncertain mutation or repeatedly move focus

#### Scenario: Visitor clears the connection
- **WHEN** the visitor explicitly disconnects and clears the session
- **THEN** the page restores the connection task with a visible focus target
- **AND** the old workspace and tab-only session material are cleared

### Requirement: Visible copy earns its place
Shared design guidance SHALL use the fewest words that preserve meaning. It SHALL prefer a clear visual or omit redundant content, retain text needed for accessible names, decisions, consent, errors and recovery, and keep detail available when needed. Project instructions and relevant UI/site skills SHALL apply this rule.

#### Scenario: A visual or existing context explains the task
- **WHEN** a visual or existing context conveys the same meaning clearly
- **THEN** the interface omits redundant explanatory copy
- **AND** controls retain clear names and keyboard and assistive access

#### Scenario: Brevity would hide needed meaning
- **WHEN** removing text would obscure an action, status, risk, consent or recovery
- **THEN** the interface keeps the shortest clear explanation
- **AND** supporting detail remains available at the point where it is needed
