import { PROJECTS } from '@ejm/site/projects';

// What the pages say about the projects. The facts come from each project's README; status is stated as the README states it.
export const GITHUB = PROJECTS.ejmlabs.repo;

export const UI_PROJECT = {
  name: 'ejm-ui',
  url: 'https://ui.ejmlabs.com/',
  host: 'ui.ejmlabs.com',
  repo: 'https://github.com/ejmlabs/ejm-ui',
} as const;

// calm is not in the shared project registry yet.
export const CALM_PROJECT = {
  name: 'calm',
  url: 'https://calm.ejmlabs.com/',
  host: 'calm.ejmlabs.com',
  repo: 'https://github.com/ejmlabs/ejm-calm',
} as const;

export const projects = [
  {
    id: 'cli',
    name: 'ejm-cli',
    url: PROJECTS.cli.url,
    host: PROJECTS.cli.host,
    repo: PROJECTS.cli.repo,
    kind: 'Rust / terminal',
    summary: 'A coding agent for your terminal.',
    row: 'Code from your terminal. Steer a turn, save a session and review the work.',
    facts: [
      ['license', 'MIT'],
      ['written in', 'Rust, with Ratatui and Tokio'],
      ['get started', 'Build from source. Installers and package-manager releases are not available yet.'],
      ['platforms', 'macOS, Windows and Linux. See the user guide for platform support and limits.'],
    ],
    does: [
      ['Read only by default', 'Add --allow-write to grant writing and --allow-shell to grant shell execution. Grants stay visible in the terminal.'],
      ['Sessions you can steer', 'Saved sessions, queued turns, steering and cancellation, with a streaming transcript.'],
      ['Your model provider', 'Connect an API provider or a supported subscription account. Provider charges and limits apply.'],
    ],
    docs: [
      ['User guide', `${PROJECTS.cli.url}docs/user-guide/`],
      ['Developer guide', `${PROJECTS.cli.url}docs/developer-guide/`],
    ],
    secondary: ['Watch a session', '/try/#cli'],
    contribute: `${PROJECTS.cli.repo}/blob/main/CONTRIBUTING.md`,
  },
  {
    id: 'ide',
    name: 'ejm-ide',
    url: PROJECTS.ide.url,
    host: PROJECTS.ide.host,
    repo: PROJECTS.ide.repo,
    kind: 'Tauri / desktop',
    summary: 'A desktop IDE with an agent beside the editor.',
    row: 'Read and edit source, follow references and work with an agent beside the code.',
    facts: [
      ['license', 'MIT'],
      ['written in', 'React, Monaco, Tauri and Rust'],
      ['get started', 'Early development, version 0.1.0. Build from source. Signed installers are not available yet.'],
      ['platforms', 'macOS, Windows x64 and Linux x64. Native support is still being tested.'],
    ],
    does: [
      ['Edi, beside the editor', 'Follow the agent through file reads, automatic write reviews and diffs, all in the conversation.'],
      ['Code you can follow', 'Definitions, references, a call hierarchy and a local code index that the agent searches too.'],
      ['Workspace trust', 'A new folder starts with language servers and native tools off until you choose Trust workspace.'],
    ],
    docs: [
      ['User guide', `${PROJECTS.ide.url}docs/user-guide/`],
      ['Developer guide', `${PROJECTS.ide.url}docs/developer-guide/`],
    ],
    secondary: ['Watch a session', '/try/#ide'],
    contribute: `${PROJECTS.ide.repo}/blob/main/CONTRIBUTING.md`,
  },
  {
    id: 'harness',
    name: 'ejm-harness',
    url: PROJECTS.harness.url,
    host: PROJECTS.harness.host,
    repo: PROJECTS.harness.repo,
    kind: 'Rust / engine',
    summary: 'A reusable Rust engine for coding agents.',
    row: 'Build agents in Rust, TypeScript or Python with tools and saved sessions.',
    facts: [
      ['license', 'MIT'],
      ['written in', 'Rust, with TypeScript and Python SDKs'],
      ['get started', 'Version 0.1.0 is available from public source. Registry packages are not available yet.'],
      ['model access', 'Configure an HTTP or trusted package provider. Model requests may incur provider charges.'],
    ],
    does: [
      ['Tools you control', 'Choose which tools an agent can use and set the permissions it needs.'],
      ['A durable event journal', 'The journal records session events and supports recovery after an interrupted run.'],
      ['Three languages', 'Use it from Rust, or from typed TypeScript and Python APIs with tool callbacks.'],
    ],
    docs: [
      ['User guide', `${PROJECTS.harness.url}docs/user-guide/`],
      ['Developer guide', `${PROJECTS.harness.url}docs/developer-guide/`],
    ],
    secondary: ['Watch a session', '/try/#harness'],
    contribute: `${PROJECTS.harness.repo}/blob/main/CONTRIBUTING.md`,
  },
  {
    id: 'ui',
    ...UI_PROJECT,
    kind: 'React / design system',
    summary: 'The design system behind our sites and apps.',
    row: 'Build with shared components, themes and layouts.',
    facts: [
      ['license', 'MIT for software and docs. Brand assets retain their own rights.'],
      ['written in', 'TypeScript and React, with shared web and terminal themes'],
      ['get started', 'Browse the gallery or build from source. Registry packages are not published yet.'],
    ],
    does: [
      ['One design system', 'Shared tokens, themes and components keep sites and apps consistent.'],
      ['Ready to explore', 'Browse components, layouts and working page examples.'],
      ['Built together', 'Help improve components, accessibility and documentation.'],
    ],
    docs: [
      ['Getting started', `${UI_PROJECT.url}docs/`],
      ['Components', `${UI_PROJECT.url}docs/components/`],
    ],
    secondary: ['Browse components', `${UI_PROJECT.url}components/`],
    contribute: `${UI_PROJECT.repo}/blob/main/CONTRIBUTING.md`,
  },
  {
    id: 'calm',
    ...CALM_PROJECT,
    kind: 'TypeScript / web scene',
    summary: 'A calm, procedurally generated scene of a whale traveling the ocean.',
    row: 'A whale travels a seeded sea past ships and landscapes.',
    facts: [
      ['license', 'MIT for software. Brand assets retain their own rights.'],
      ['written in', 'TypeScript and three.js (WebGL 2), with simplex noise, built with Vite'],
      ['get started', 'Early development, version 0.1.0. Open it in a browser with WebGL 2, including on phones. No accounts, tracking or analytics.'],
    ],
    does: [
      ['One seed, one sea', 'Each seed rebuilds the same time of day, whale behavior, ships, coasts and mountains.'],
      ['Look around', 'Drag to look around. The camera eases back to a slow drift.'],
      ['Quiet by default', 'Sound is optional and off by default. Reduced motion is respected.'],
    ],
    // No docs site or contribution guide yet: the README is the guide.
    docs: [
      ['README', `${CALM_PROJECT.repo}#readme`],
    ],
    secondary: ['Try seed 42', `${CALM_PROJECT.url}?seed=42`],
    contribute: null,
  },
] as const;
