# Three product stories

**Review draft 2, October 19, 2026.** Revised around the user's product values. These scripts and storyboards need story approval before new workload preparation, product capture, benchmarks or video rendering. Every shot is planned. [The visual storyboard](storyboards.html) illustrates framing, not recorded product screens.

## The thread

Speed, control and understanding are daily problems. Each film follows one of them through the actual product. Open source gives viewers a way to help improve the tools they use.

| Product | Viewer | Value | Visible payoff | One next action |
| --- | --- | --- | --- | --- |
| ejm-cli | Developer running many agents on one machine | Fast terminal work, shared resource limits and control as the workload grows | Many managed runs share bounded work slots; switching, steering and stopping remain usable | Help make it faster |
| ejm-ide | Developer reading unfamiliar or changing code | Source stays central; search and navigation help reveal how code fits together | The reader follows a calculation into both quote and payment paths | Help shape the editor |
| ejm-harness | Developer embedding an agent in an application | A fast core, a clear API and tools that fit the application | A small session lifecycle grows through one real application tool | Build on it and contribute |

Every close says **Open source / MIT** and gives one concrete invitation: profile the CLI, improve code navigation, or build and share a harness tool. Each product URL is the entry point. Contribution can also mean a bug report, better docs, an adapter or a patch. It is part of the story, rather than a license badge added at the end.

## Viewing and sound

- Proposed length: 30 seconds each. Timings describe the edit, not product latency.
- Default: actual product footage, short captions and upbeat lo-fi. Read-through scripts can guide pacing or later narration; no voice or soundtrack is being rendered now.
- Product identity and category appear early: ejm-cli / Terminal coding agent; ejm-ide / Desktop code editor; ejm-harness / Agent engine and SDK.
- Give each shot one main reading target. Establish the product, focus on the useful action, then hold the result.
- Use real native UI and output. Resource measurements are clearly identified editorial evidence, not invented product controls. Harness output belongs to an example application using its SDK.
- If fixed model replay is used, show Model replay · real tools during C3–C6 and H5–H6. It proves tool behavior and effects, not independent model reasoning or hosted-model speed.
- Keep native graph evidence labels, benchmark scope and replay labels readable. Do not turn limits into unreadable fine print.
- Keep the [music credit](assets/music-license.md) with future exports. Every story must work muted.

## 01. ejm-cli: Hundreds of agents. One machine.

**Product:** An open-source terminal coding agent.

**Story:** Agent work grows, but the developer still needs a usable machine. Many sessions share limits on model requests and local jobs. The developer moves between runs, steers one and stops one while the rest continue.

**Why try it:** Keep control of the work and the resources it uses as agent count grows.

### Read-through script

> Hundreds of agents. One machine. You still need room to work. With ejm-cli, sessions share limits for model requests and local jobs. Switch sessions. Steer a run. Stop one without stopping the rest. Speed and resource use matter. It's open source. Try it, profile it, help make it faster.

### Exact request

> Check the parser tests and summarize any failures. Do not edit files.

This is one representative task in a planned set of read-only checks and reviews. The story is managing the workload. Use public /new, /agents, /status, /steer and /stop actions. The proposed scale shot targets **200 active managed runs in one CLI instance**, with eight model slots and four local-job slots. This is a capture target, not a measured result. The explicit max-sessions override must be visible in source records; the default is 100. Do not create new workload scripts or run this target before story approval.

### Timed storyboard

| Shot | Time | Frame and action | Exact film copy | What the viewer learns |
| --- | --- | --- | --- | --- |
| C1 | 0–3s | Establish the actual terminal with readable ejm-cli identity and category. A brief opening line names the familiar resource problem. | Hundreds of agents. One machine. | Scale makes speed and resource use matter. |
| C2 | 3–7s | Show the real launch command with max-sessions 200, model-concurrency 8 and tool-concurrency 4. Frame the three actual settings, then hold launch through the first composer at recorded speed. Retain startup timing; do not accelerate this action. | Set the work budget. | Many managed agents do not require the same number of executing jobs. |
| C3 | 7–12s | Native /agents picker during the prepared workload. Switch among named active sessions. Actual status must support the proposed 200-run count; saved idle history is not proof. | Many sessions. Shared limits. | The developer manages many runs in one place. |
| C4 | 12–17s | Native /status separates active and queued model/tool work. A clearly labeled measurement inset shows the actual CLI process tree's recorded memory and CPU for this workload. Values remain pending measurement. | Queue work. Bound local jobs. | Work waits for capacity instead of starting every local job at once. |
| C5 | 17–22s | Switch to an active run and send a native steering message. Hold on the receipt and responsive composer. Retain input timing separately for any latency claim. | Keep steering. | The developer can still direct a run under load. |
| C6 | 22–26s | Stop a selected run that is executing a local check through the real control. Show cancellation, the released work slot and a queued check starting while other sessions continue. Retain the actual cancellation and progress events. | Stop one. Keep the rest moving. | Control is per run; stopping selected work makes capacity available. |
| C7 | 26–30s | Matching CLI mark and name. Readable contribution invitation and project URL. | Open source / MIT / Profile it. Make it faster. / cli.ejmlabs.com | Viewers can try it and help improve speed and resource behavior. |

### Proof and capture needs

- The numerical scale shot is conditional on an actual verified 200-run CLI capture. Configuration allows a higher session limit, but capacity settings alone prove neither throughput nor responsiveness. If the target fails, stop and revise the claim before production.
- Use one CLI instance and its shared governor. Separate CLI processes do not share a machine-wide resource pool. Do not imply an agent-grid dashboard or a built-in launch-200 command.
- Distinguish active managed runs, active model calls, queued requests, executing local jobs and saved idle sessions. The default allows 100 managed sessions, eight model requests, four local jobs and one heavy job.
- After approval, pin binary, host, workload and limits. Record process-tree RSS, CPU, startup, input and stop acknowledgement using the same run. Name what each number includes. Keep useful task results with the run so the session count is not the whole payoff.
- Tool memory reservations are admission budgets, not OS caps on total machine memory. CPU reservations are not kernel CPU quotas. Do not claim a system-wide ceiling or promise no slowdown on every computer.
- Existing evidence measures a 100-session native-engine workload and CLI startup separately. Its engine RSS excludes the TUI. It does not verify this proposed CLI film or hundreds of hosted-model calls on an old laptop.
- Invite people to try their own workload, report resource behavior, contribute profiles and improve the implementation. Use existing GitHub links without claiming repository visibility has changed.

### Verified product basis

- [Resource defaults and governor](https://github.com/ejmlabs/ejm-cli/blob/main/README.md#L132), [public flags](https://github.com/ejmlabs/ejm-cli/blob/main/crates/ejm-cli/src/args.rs#L170) and [doctor](https://github.com/ejmlabs/ejm-cli/blob/main/crates/ejm-cli/src/main.rs#L309).
- [New sessions and switching](https://github.com/ejmlabs/ejm-cli/blob/main/docs/ejm-cli.md#L134), [steering](https://github.com/ejmlabs/ejm-cli/blob/main/docs/ejm-cli.md#L112) and [native status counts](https://github.com/ejmlabs/ejm-cli/blob/main/crates/ejm-cli/src/ui.rs#L657).
- [Governor scope and reservation limits](https://github.com/ejmlabs/ejm-harness/blob/main/docs/executor.md#L3) and [configured session range](https://github.com/ejmlabs/ejm-harness/blob/main/crates/ejm-harness/src/engine.rs#L199).
- [CLI performance evidence and unmeasured acceptance paths](https://github.com/ejmlabs/ejm-cli/blob/main/docs/benchmarks.md#L1).
- [Contribution guide](https://github.com/ejmlabs/ejm-cli/blob/main/CONTRIBUTING.md#L3).

## 02. ejm-ide: Before you change it, understand it.

**Product:** An open-source desktop code editor.

**Story:** A developer needs to understand where a pricing calculation is used. Search finds the function. Source shows how discounted line totals are combined. Following callers and splitting files reveals that quotes and charges share the calculation.

**Why try it:** Read the source and trace the change's reach before deciding what to edit.

### Read-through script

> Before you change the code, understand it. Meet ejm-ide. Find the calculation. Read how the total is built. Follow its callers. See the quote and payment paths side by side. Now you know where this calculation is used. The editor is open source, too. Help improve code navigation.

### Exact request

> Where is the discount calculation used?

This is the viewer's question, carried by a short editorial line. It is not a prompt sent to an assistant. In the existing Harbor sample, search calculate_total, read money.rs, follow quote_order and settle_order, and split orders.rs beside money.rs. The developer supplies attention and judgment; source is the evidence.

### Timed storyboard

| Shot | Time | Frame and action | Exact film copy | What the viewer learns |
| --- | --- | --- | --- | --- |
| I1 | 0–3s | Actual IDE, unfamiliar Harbor source open. Readable ejm-ide / Desktop code editor identity. Lead with the reader's reason to care. | Before you change it, understand it. | Reading code is part of making a sound change. |
| I2 | 3–7s | Native Search in Code mode. Query calculate_total, select the real money.rs result and open its source. | Find the calculation. | Search gets the reader to relevant code. |
| I3 | 7–12s | Hold on the actual short calculate_total function, including its apply_discount call and accumulation of line totals. Use a readable source crop, not an authored replacement or AI summary. | Read how the total is built. | The reader can inspect what the code does. |
| I4 | 12–17s | Native Show Callers and Callees, opened from the function. Reveal quote_order and settle_order. Preserve native inferred or ambiguous link labels. | Follow its callers. | Source relationships help reveal where the calculation is used. |
| I5 | 17–21s | Click settle_order in the native graph and open orders.rs. Frame its call to calculate_total followed by the sample charge adapter. | Follow the path into payment. | Graph navigation leads back to source the person can read. |
| I6 | 21–26s | Split orders.rs beside money.rs. Hold on the quote and settlement functions calling the same calculation, beside its implementation. | Quotes and charges share this calculation. | The reader understands the two paths affected by a change here. |
| I7 | 26–30s | Matching IDE mark and name. Readable contribution invitation and project URL. | Open source / MIT / Help improve code navigation. / ide.ejmlabs.com | Viewers can use the editor and help improve how people read code. |

### Proof and capture needs

- Use the existing examples/harbor workspace. Read the actual discount calculation and both callers. No source edits or model call are needed for this story.
- Native desktop capture is required. Do not use the website preview to imply live native call navigation.
- Rust semantic navigation depends on workspace trust, rust-analyzer and server capability. Keep the selected capture path within features working in the recorded build.
- Index graph links can be inferred, ambiguous or incomplete. Preserve native evidence labels; do not call the graph a complete runtime map or proof of correctness.
- The charge function is a sample payment adapter. No real payment or external transaction belongs in the film.
- Keep source readable at phone size. Showing a person inspect two related functions is the payoff; opening many tabs or drawing a large graph is not enough.
- Invite people to try their own repository and contribute navigation fixes, language support, accessibility, docs or code.

### Verified product basis

- [Harbor sample](https://github.com/ejmlabs/ejm-ide/blob/main/examples/harbor/README.md#L3), [discount calculation](https://github.com/ejmlabs/ejm-ide/blob/main/examples/harbor/src/money.rs#L18) and [quote and settlement callers](https://github.com/ejmlabs/ejm-ide/blob/main/examples/harbor/src/orders.rs#L8).
- [Native code search](https://github.com/ejmlabs/ejm-ide/blob/main/app/components/CodeSearch.tsx#L125), [call graph entry](https://github.com/ejmlabs/ejm-ide/blob/main/app/App.tsx#L2017) and [graph nodes opening source](https://github.com/ejmlabs/ejm-ide/blob/main/app/components/CallGraph.tsx#L92).
- [Split editors and semantic navigation](https://github.com/ejmlabs/ejm-ide/blob/main/website/content/user-guide.md#L69) and [index limits](https://github.com/ejmlabs/ejm-ide/blob/main/docs/indexing.md#L89).
- [Contribution guide](https://github.com/ejmlabs/ejm-ide/blob/main/CONTRIBUTING.md#L3).

## 03. ejm-harness: Fast core. Clear API. Your tools.

**Product:** An open-source agent engine and SDK.

**Story:** An application developer wants an agent to find release blockers in the app's own data. A small session lifecycle and a scoped benchmark introduce the core. The developer connects a release-data function as a tool, and the native engine invokes it to return the blockers and their owners.

**Why try it:** Build an agent around your application, with a small core you can understand, measure and extend.

### Read-through script

> Which release blockers are still open? Build an agent that can ask your app. With ejm-harness, start a session through a clear API. Measure the core. Register your release-data function as a tool. The agent calls your code and returns the blockers and their owners. Open source. Build a tool. Share it.

### Exact request

> Find the open v0.2 release blockers and their owners.

Use one read-only application tool, find_release_blockers, supplied through the public SDK. It reads a local issue export and returns the matching records. This small example makes extensibility visible; it is not a built-in issue integration. Show the real session lifecycle, including cleanup, rather than an invented three-line setup.

### Timed storyboard

| Shot | Time | Frame and action | Exact film copy | What the viewer learns |
| --- | --- | --- | --- | --- |
| H1 | 0–3s | Establish the release-helper SDK example with readable ejm-harness / Agent engine and SDK identity. Lead with the application question that its tool will answer. | What's blocking the release? | The developer needs an agent that can use the application's own data. |
| H2 | 3–7s | Make the actual create-to-start path the reading target. Retain the event stream, wait and close lifecycle as surrounding source context in the real complete example. | Start with a clear API. | The basic session flow is understandable. |
| H3 | 7–12s | Show a genuine local native-core benchmark result. One main timing, with readable workload, host and execution-phase labels. New values remain pending a verified run. | A core you can measure. | Speed is open to inspection through a scoped benchmark. |
| H4 | 12–17s | Actual defineTool callback wraps the application's release-data function. Frame the tool definition and public registration without a wall of unrelated setup. | Add a tool you own. | The application supplies its own behavior. |
| H5 | 17–22s | Run the real SDK example and submit the exact release question. Show the native tool event and actual callback execution. Label the console SDK example. | The agent calls your code. | The extension executes through the real engine. |
| H6 | 22–26s | Hold on actual returned titles and owners for two active v0.2 blockers. The callback result is the reading target. No invented dashboard or independent model reasoning claim. | Your tools. Useful results. | The agent can work with the application's own data and functions. |
| H7 | 26–30s | Matching harness mark and name. Readable contribution invitation and project URL. | Open source / MIT / Build a tool. Share it. / harness.ejmlabs.com | Viewers can extend it and help improve the core. |

### Proof and capture needs

- Show the public SDK path: create the harness, create a session, start, consume events, wait and close. A compatible separately built Rust worker is required. The TypeScript and Python SDK packages have no runtime package dependencies; that does not make the complete runtime dependency-free.
- Use one real defineTool callback and register it through Harness.create. Retain tool arguments, actual callback progress/output and native events. Match every returned issue identity and owner to the input export.
- The existing recorded native benchmark used 100 managed sessions and 300 fixed Bash checks. Its execution phase was 1.210 s on a 24 GiB Mac. Total mixed elapsed time was 2.353 s. These are recorded reference values, not the new film's numerical copy.
- After approval, refresh the defined native benchmark and retain binary, host and workload. Put its new measured result, local replay workload and execution-phase scope in the film. The benchmark excludes CLI TUI, TypeScript/Python host, hosted-model latency, model quality and large builds.
- Do not call the engine fastest, imply instant model answers, present engine RSS as whole-application memory, or turn one modern-Mac result into an old-laptop claim.
- If fixed replay supplies model responses, keep the visible replay label. A fixed response agreeing with tool output does not prove independent reasoning from that output.
- Invite contributions to tools, providers, hooks, adapters, tests, benchmarks and docs. Show extension through one concrete tool in this film; save the wider extension catalog for the project docs.

### Verified product basis

- [Public session lifecycle](https://github.com/ejmlabs/ejm-harness/blob/main/docs/sdk.md#L123) and [worker and SDK requirements](https://github.com/ejmlabs/ejm-harness/blob/main/docs/sdk.md#L3).
- [Tool definition](https://github.com/ejmlabs/ejm-harness/blob/main/sdk/typescript/src/index.ts#L84), [registration](https://github.com/ejmlabs/ejm-harness/blob/main/sdk/typescript/src/index.ts#L196) and [actual callback contract](https://github.com/ejmlabs/ejm-harness/blob/main/sdk/typescript/test/sdk.test.mjs#L271).
- [Rust extension contracts](https://github.com/ejmlabs/ejm-harness/blob/main/site/content/developer-guide.md#L86).
- [Benchmark method, results and limits](https://github.com/ejmlabs/ejm-harness/blob/main/docs/benchmarks.md#L17) and [recorded raw report](https://github.com/ejmlabs/ejm-harness/blob/main/docs/evidence/benchmark.json#L63).
- [Contribution guide](https://github.com/ejmlabs/ejm-harness/blob/main/CONTRIBUTING.md#L1).

## Shared sample data, planned

The films share a purpose, not one repeated feature demo. CLI uses a defined resource workload. IDE uses the existing Harbor source. Only the harness example needs the planned local issue export below. It has not been implemented or captured.

| ID | Title | Status | Labels | Milestone | Owner |
| --- | --- | --- | --- | --- | --- |
| #184 | Checkout drops item quantities | In progress | release-blocker, checkout | v0.2 | Maya |
| #197 | Login loops on Safari | Todo | release-blocker, bug, auth | v0.2 | Sam |
| #176 | Invite emails arrive twice | Done | release-blocker, email | v0.2 | Lena |
| #224 | Audit upload timeouts | Todo | release-blocker, infra | v0.3 | Remy |

The harness tool returns only #184 and #197, with Maya and Sam. Completed work and other milestones are excluded. The other films do not claim these records as their outcome.

## Honest production boundaries

- This user feedback revises the story direction. It is not approval to prepare workloads, run benchmarks, capture products or render videos. Keep those steps paused until story approval.
- Show the actual products. Planning sketches, capacity settings and earlier measurements are not captured proof of the new claims.
- Performance footage must name its workload and runtime scope. Model latency, engine execution, terminal responsiveness and full process-tree resource use are separate measurements.
- No new provider calls are part of this review. If replay is later used, disclose it visibly and retain the real tool receipts and file effects.
- Use existing project and GitHub links as requested. Do not claim repository visibility has changed or that contributions have already happened.
- Review each future film muted at phone width: what problem does this solve, what did the product actually do, why should I try it, and how can I help improve it?

## Owners and documentation

Ejmlabs owns stories, workload preparation and media assembly. Product repositories own behavior, public guides and performance evidence. Ejm-ui owns canonical marks, fonts, tokens and reusable capture contracts. Films consume public CLI commands, SDK exports and asset exports. No product runtime changes are planned.

This draft changes no public product behavior or live website, so it needs no public guide release. Future film copy must match the approved story and verified capture. Earlier exports and the first issue-board storyboard remain unapproved history, rather than evidence for these narratives.
