# Interactive demos

The catalog of the interactive product demos. Every ejmlabs site shows the product it describes as a small working version on the page, so a visitor can try it without installing anything. Open `demos.html` to see all three live. The runtime is `demo.js`, the styles are `parts/50-demo.css` (built into `site.css`), and the scenarios are data in `demos/`.

## What a demo is

A demo is a **simulation** of one product. It runs entirely in the visitor's browser, follows a script, and is deterministic. It is not the product, it does not talk to a model, and it does not run anything on the visitor's machine.

| Product | Demo | What the visitor can do |
| --- | --- | --- |
| ejm-cli | `data-ejm-demo="cli"` | Send a prompt or pick one, watch tool calls and a diff stream in, grant write access to apply a blocked patch, stop a run, open sessions and help, switch to plain mode. |
| ejm-ide | `data-ejm-demo="ide"` | Open files into tabs, ask Edi for a change, review the diff of the proposed write, accept or reject it, open the command palette. |
| ejm-harness | `data-ejm-demo="harness"` | Queue sessions, change the governor limits, watch the append-only journal, crash the worker and watch recovery replay the journal, read the Rust, TypeScript and Python samples. |

## Honesty rules

These are not optional. A demo that breaks one does not ship.

1. **Say it is simulated, always visible.** Every demo has a `Simulated` badge in its title bar and this sentence in its caption: "Simulated demo. Nothing runs on your machine and nothing is sent anywhere." Do not remove, hide or shrink either.
2. **No claim of real output.** Replies are scripted. Never label them as model output, and never show numbers, timings or benchmarks as results. Sample values are labelled as sample.
3. **Match the product as documented.** ejm-cli file tools are read only until write is granted, and grants stay visible in the header. ejm-ide shows tool calls with a state and the diff of each proposed file write. ejm-harness runs many sessions through one resource governor with a durable journal, and recovery never runs an interrupted call again. Do not add a feature the product lacks. The call graph and git panes of ejm-ide are not built in the demo.
4. **Name the differences.** Where the demo needs a control the real product does not have, the control says so. In ejm-cli, grants are fixed at launch, so the demo's Grant write switch is labelled as standing in for `--allow-write`. In ejm-ide the real app reviews each proposed write automatically, so the Accept and Reject buttons carry a note that they exist to show both outcomes.
5. **No network, no tracking.** The runtime requests only this site's own `ui/app.css` and `demos/*.json`, resolved from the script's own URL. It sends nothing, sets no cookies, stores nothing and reports no events. Do not put an analytics call in a demo.

## Put a demo on a page

Load the script once, with `defer`. The page still loads only the three kit style sheets: `demo.js` adds `ui/app.css` itself, from beside the script.

```html
<script src="/design-kit/web/demo.js" defer></script>
```

Then put the demo in a band under an `ejm-head`. The element with `data-ejm-demo` is the host. Its children are the **no-JavaScript fallback**: a static transcript or sample that explains the product. The script replaces them when the demo mounts, and puts them back with a short note if the demo fails to load.

```html
<section class="ejm-band ejm-band--mist" id="try-cli" aria-labelledby="try-cli-title">
  <div class="ejm-page">
    <div class="ejm-head">
      <div class="ejm-head__title">
        <p class="ejm-eyebrow">ejm-cli</p>
        <h2 class="ejm-h2" id="try-cli-title">A terminal coding agent.</h2>
      </div>
      <p class="ejm-head__text">One sentence that says what to try.</p>
    </div>
    <div class="ejm-demo" data-ejm-demo="cli">
      <div class="ejm-demo__fallback">
        <figure class="ejm-terminal">
          <figcaption class="ejm-terminal__bar"><span>ejm-cli</span><span>static transcript</span></figcaption>
          <pre class="ejm-terminal__body" tabindex="0" aria-label="Static transcript of an ejm-cli session"><code>...real lines from the scenario...</code></pre>
        </figure>
        <p>Simulated demo. Nothing runs on your machine and nothing is sent anywhere. Turn on JavaScript to send your own prompt.</p>
      </div>
      <noscript><p class="ejm-demo__error">The interactive demo needs JavaScript. The transcript above shows what it does.</p></noscript>
    </div>
  </div>
</section>
```

The fallback uses site classes only (`ejm-terminal`, `ejm-code`), because the application style sheet arrives with the script. Use `data-ejm-demo="ide"` or `"harness"` the same way, with an `ejm-code` block as the fallback.

For a hero, put the demo in `ejm-hero__visual` of an `ejm-hero--split`, or in an `ejm-showcase` beside the text that explains it. The demo reads the width of its own column, so it works in either place.

## Options

All options are optional. Set them as data attributes on the host.

| Attribute | Value | Effect |
| --- | --- | --- |
| `data-ejm-demo` | `cli`, `ide`, `harness` | Required. Chooses the demo. |
| `data-demo-label` | text | The accessible name of the window and the name for announcements. Default comes from the scenario file. |
| `data-demo-caption` | text | Replaces the caption sentence that says what to try. The honesty sentence beside it cannot be replaced. |
| `data-demo-data` | URL | A scenario file to use instead of the one in `demos/`. Resolved from `demos/`. |
| `data-demo-seed` | number | Seed for the timing jitter. The same seed gives the same timing. |
| `data-demo-theme` | `light` or `dark` | Pins the window theme and ignores the page theme. Leave it off so the demo follows the page. |
| `data-demo-start` | `eager` | Mounts and runs without waiting to be scrolled into view. For tests and screenshots only. |

Query string options, read from the page address:

| Query | Effect |
| --- | --- |
| `?demo-speed=4` | Divides every delay by the number. `max` or `0` makes steps near instant. Use it in tests. |
| `?demo-reduced-motion=1` | Forces the reduced motion path: no character streaming, no spinner, zero delays. |

## Behavior every demo shares

- **Nothing starts until it is on screen.** The demo mounts when its host nears the viewport. While it is out of view, or paused, its clock and streaming stop.
- **Visitor control.** Pause stops all timers and streaming until Resume. Reset rebuilds the demo from its first state with the same seed.
- **Theme.** The window is an `ejm-ui` root. The script sets its `data-theme` from the page theme, and updates it on the ejm-themechange event that `theme.js` sends, with a mutation observer on the page root as a fallback.
- **Reduced motion.** Under `prefers-reduced-motion`, each step appears at once, the spinner is the static running glyph, and there is no highlight animation. Changed lines in the editor keep a static marker.
- **Announcements.** One polite live region per demo receives one sentence per completed step or line: a finished tool call, a finished reply, a proposed change, a crash. Streamed characters are never announced, and the transcript itself is not live.
- **Escape.** Closes an open overlay first. With nothing open it moves focus to the window itself, so the next Shift+Tab leaves the demo. A "Skip past this demo" link comes first for keyboard users.
- **Sizes.** From 320 px the terminal scrolls inside itself, the IDE stacks the file view over the chat, and the harness is one column. On very wide screens the demo stops at the page column width and stays centered.

## Classes

Every class starts with `ejm-demo` and belongs to one block. State lives in attributes (`hidden`, `data-state`, `data-selected`, `aria-selected`, `data-paused`, `data-reduced`) or in an `is-` class for a one-shot visual (`is-plain`, `is-changed`, `is-flash`). Application primitives (`ejm-ui-btn`, `ejm-ui-chip`, `ejm-ui-tool`, `ejm-ui-diff` and the rest) come from `ui/PRIMITIVES.md` and are not repeated here.

### Frame

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-demo` | On the host of every demo, next to `data-ejm-demo`. It caps the width at the page column, centers itself and measures its own column for the narrow layouts. | Wrapping anything that is not a simulation of a product. | One demo per host. Put it in a band under an `ejm-head`. |
| `ejm-demo__window` | Mounted by the script. The bordered window and `ejm-ui` theme root. | Writing it by hand. | `role="region"`, an accessible name ending in "simulated", and `tabindex="-1"` so Escape can return focus to it. |
| `ejm-demo__bar` | Mounted. The slim title bar with the name, the badge and the actions. | Adding other controls to it. | Sage line on top. Buttons are labelled "Pause the demo" and "Reset the demo". |
| `ejm-demo__name` | Mounted. The product name in the bar. | Marketing text. | Mono label. |
| `ejm-demo__badge` | Mounted. The visible "Simulated" badge. | Hiding or restyling it. Never remove it. | Text, Sage with Ink text. |
| `ejm-demo__actions` | Mounted. Groups Pause and Reset. | Anything else. | Both are real buttons. |
| `ejm-demo__body` | Mounted. Holds the demo's own layout. | Writing it by hand. | Sizes itself to the demo inside. |
| `ejm-demo__caption` | Mounted. The caption row under the body. | Long text. | One sentence on what to try, then the honesty sentence. |
| `ejm-demo__try` | Mounted. The sentence that says what to try. | Copy that does not match the scenario. | Plain sentence, under 20 words. |
| `ejm-demo__note` | Mounted. The honesty sentence. | Removing or shortening it. | Always visible, never only in a tooltip. |
| `ejm-demo__hint` | Mounted. A small explanatory line inside a demo, such as what Grant write stands in for. | Required instructions. | Muted text; the same words are in the control's title. |
| `ejm-demo__live` | Mounted. The visually hidden polite log that announces completed steps. | Showing it. | `role="log"` with `aria-live="polite"`. Twenty most recent lines are kept. |
| `ejm-demo__skip` | Mounted. The skip link before the window. | Replacing the page skip link. | Hidden until focused. Points at the end marker. |
| `ejm-demo__end` | Mounted. The empty marker after the window. | Anything visible. | `tabindex="-1"`, the target of the skip link. |
| `ejm-demo__fallback` | In the host, around the no-JavaScript transcript or sample. | Around the live demo. | Real text that explains the product, with the honesty sentence. The script removes it on mount. |
| `ejm-demo__error` | A short status line: in `<noscript>`, and when the demo fails to load. | Marketing. | One sentence that says what the visitor can read instead. |

### ejm-cli

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-demo__cli` | Mounted. The layout of the CLI demo: prompts, terminal, controls. | Writing it by hand. | Stacks everything in one column. |
| `ejm-demo__try-row` | Mounted. The row of prompt chips with its label. | More than four chips. | Chips are `ejm-ui-chip` buttons. Clicking one sends that prompt. |
| `ejm-demo__term` | Mounted, on an `ejm-term` element. The terminal screen with its fixed height. | A page-level terminal sample; use `ejm-terminal`. | Header, transcript, status line, composer and hints, top to bottom, as in `ui/TUI.md`. |
| `ejm-demo__scroll` | Mounted. The transcript, which scrolls inside the terminal. | Anything outside the terminal. | `role="region"` named "Transcript", focusable so Page Up, Page Down and arrows scroll it. |
| `ejm-demo__block` | Mounted. One transcript block (you, assistant, tool, notice, error) with its trailing blank line. | Writing it by hand. | Color roles come from `ejm-term` text classes and a glyph or word, never color alone. |
| `ejm-demo__empty` | Mounted. The "What shall we build?" empty state. | After the first message. | Hidden once the transcript has a block. |
| `ejm-demo__nowrap` | On a terminal line that must be cut with an ellipsis: header, status, hints. | Transcript text. | Pairs are dropped from the end until the line fits. |
| `ejm-demo__wrap` | On a terminal line that wraps: transcript text. | Header lines. | Wraps at spaces and breaks long words by column. |
| `ejm-demo__edge` (`--row`) | Mounted. A line of a drawn box: top, bottom, or (`--row`) a side row. | Anything but box lines. | Box characters are `aria-hidden` where they only draw. Plain mode switches them to `+ - |`. |
| `ejm-demo__title` | Mounted. The title text on a top edge. | Long titles. | Carries the keys for overlays. |
| `ejm-demo__fill` | Mounted. The run of box lines that fills the rest of an edge. | Text. | `aria-hidden`, clipped to the width. |
| `ejm-demo__cell` | Mounted. The content of a box row. | Anything outside a box. | Cut with an ellipsis; wraps in help. |
| `ejm-demo__composer` | Mounted. The rounded message box with the prompt glyph. | A second input. | Holds one real `textarea`. Focus shows as a ring on the whole box. |
| `ejm-demo__row` | Mounted. The text row inside the composer. | Writing it by hand. | Gutters on both sides keep the box aligned as the text grows to six lines. |
| `ejm-demo__gutter` | Mounted. The left and right border characters of the composer. | Content. | `aria-hidden`. |
| `ejm-demo__input` | Mounted. The composer `textarea`. | Other fields. | Labelled "Message". Enter sends, Alt+Enter adds a line. |
| `ejm-demo__overlay` | Mounted. The sessions or help picker drawn over the terminal. | Anything that needs a decision outside the demo. | `role="listbox"` for sessions, `role="dialog"` for help. Focus moves in, Escape closes and returns focus to the composer. |
| `ejm-demo__controls` | Mounted. The row of switches and buttons under the terminal. | More than five controls. | Real switches and buttons, so touch and keyboard users reach every key command. |

### ejm-ide

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-demo__ide` | Mounted, on an `ejm-ui-shell`. The IDE layout: title bar, files, editor, chat, status bar. | Writing it by hand. | Stacks to title, files, editor, chat, status in a column narrower than 760 px. |
| `ejm-demo__cmdbtn` | Mounted. The Commands button in the title bar. | Hiding the shortcut. | Opens the palette for people without a keyboard shortcut. |
| `ejm-demo__panel` | Mounted. The editor area under the tabs. | Writing it by hand. | `role="tabpanel"`, or the empty state when no file is open. |
| `ejm-demo__editor` | Mounted, on an `ejm-ui-code`. The read only editor text with line numbers. | An editable field. The demo editor is read only. | Focusable, labelled with the file path and "read only in this demo". |
| `ejm-demo__ln` | Mounted. One editor line, with its number. | Writing it by hand. | The number is drawn, not selectable. `is-changed` marks lines changed by an accepted edit and stays. `is-flash` is the one-shot highlight, an opacity pulse. |
| `ejm-demo__tab` | Mounted. A tab and its close button. | Writing it by hand. | The tab button is `role="tab"`; the close button is separate and labelled "Close <path>". `data-selected` marks the open file. Delete closes a focused tab. |
| `ejm-demo__close` | Mounted. The close button of a tab. | Anything else. | 24 px, 44 px on touch. |
| `ejm-demo__chat` | Mounted, on an `ejm-ui-aside`. The agent pane. | Writing it by hand. | Labelled "Edi chat". |
| `ejm-demo__chips` | Mounted. The suggested prompts. | More than four. | A labelled group of `ejm-ui-chip` buttons. |
| `ejm-demo__chatlog` | Mounted. The messages, tool calls and diffs. | Writing it by hand. | `role="log"` with live announcements switched off; the demo announces whole steps itself. Focusable to scroll. |
| `ejm-demo__out` | Mounted. Search results inside a tool call. | Long output. | Monospace, scrolls past eight rows. |
| `ejm-demo__review` | Mounted. The Accept and Reject buttons and the note under a proposed diff. | A real approval flow. It exists to show both outcomes. | `role="group"` named "Review the proposed change". The note says the real app reviews writes automatically. |
| `ejm-demo__stopped` | Mounted. The line shown after Stop. | Errors. | Plain caption. |
| `ejm-demo__composer-ide` | Mounted. The message field and Send or Stop button. | Writing it by hand. | A real form. Enter sends. |
| `ejm-demo__sbspacer` | Mounted. Pushes the right side of the status bar apart. | Content. | Empty. |
| `ejm-demo__palette` | Mounted. Positions the command palette over the IDE. | Writing it by hand. | Holds an `ejm-ui-palette` combobox: type to filter, arrows choose, Enter runs, Escape closes. |

### ejm-harness

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-demo__harness` | Mounted. The harness layout: governor and sessions, journal, language samples. | Writing it by hand. | Two columns, one under 760 px. |
| `ejm-demo__col` | Mounted. A column of the harness layout. | Writing it by hand. | Plain grouping. |
| `ejm-demo__gov` | Mounted. The governor controls in a `fieldset`. | Real settings. All values are sample values. | The legend says "sample values". Sliders are real range inputs with outputs. |
| `ejm-demo__btns` | Mounted. Add session, Add 5 and Crash worker. | More than four buttons. | Crash worker is disabled while nothing runs. |
| `ejm-demo__stats` | Mounted. Four counts: running, queued, done, commands. | Claims about speed or capacity. | Each is an `ejm-ui-stat` with a text label. |
| `ejm-demo__sessions` | Mounted. The list of sessions. | Writing it by hand. | A labelled list. State is a word in a badge and a progress bar with `role="progressbar"`. |
| `ejm-demo__sessions-empty` | Mounted. The empty line before any session exists. | After the first session. | Plain caption. |
| `ejm-demo__session` | Mounted. One session: name, state, current step, progress. | Writing it by hand. | `data-state` is queued, running, recovering or done. |
| `ejm-demo__session-head` | Mounted. The name and state row of a session. | Writing it by hand. | Wraps on narrow screens. |
| `ejm-demo__journal` | Mounted, on an `ejm-ui-log`. The append-only event journal. | Anything that can be edited or cleared. Only Reset clears it. | `role="log"`, focusable, live announcements off. Each line has a sequence number, a time relative to the start and the event. |
| `ejm-demo__seq` | Mounted. The sequence number cell of a journal line. | Writing it by hand. | Increases by one per event and is never reused. |
| `ejm-demo__langs` | Mounted. The Rust, TypeScript and Python samples. | Writing it by hand. | Spans both columns. |
| `ejm-demo__lang` | Mounted. One language panel with its caption and code. | Writing it by hand. | `role="tabpanel"`, labelled by its tab. |

## Keyboard map

| Where | Key | Action |
| --- | --- | --- |
| Any demo | Tab, Shift+Tab | Move through the controls. A skip link comes first. |
| Any demo | Escape | Close an overlay, or move focus to the demo window. |
| ejm-cli | Enter | Send the prompt, or queue it while a run is active. |
| ejm-cli | Alt+Enter, Shift+Enter, Ctrl+J | New line in the composer. |
| ejm-cli | Ctrl+C | Stop the run. With text selected it copies instead. When idle it only says that the real app exits. |
| ejm-cli | Ctrl+S | Open the sessions picker: Up and Down choose, Enter opens, Escape closes. |
| ejm-cli | Up, Down | Recall sent messages. |
| ejm-cli | Page Up, Page Down, End | Scroll the transcript. End follows the latest output when the composer is empty. |
| ejm-cli | `/help`, `/sessions`, `/new`, `/stop` | Commands. `/resume`, `/queue` and `/steer` exist in ejm-cli and answer that they are not part of the demo. |
| ejm-ide | Ctrl+K or Cmd+K | Open the command palette: switch model label, toggle theme, open file. |
| ejm-ide | Arrow keys, Home, End, Enter | Move in the file tree, open a file or fold a folder. |
| ejm-ide | Left, Right, Home, End, Delete | Move between tabs, close the focused tab. |
| ejm-harness | Left, Right, Home, End | Move between the language tabs. |
| ejm-harness | Arrow keys on a slider | Change the limit by one. |

## Add or change a scenario

All words, prompts and project files live in `demos/`. The runtime does not change.

| File | Holds |
| --- | --- |
| `demos/harbor.json` | The sample project shared by the CLI and IDE demos: `files`, each with `path`, `lang` (`rust`, `ts`, `md`) and `text`. Written for the demos. It is not a real repository. |
| `demos/cli.json` | Header values, empty state, prompt chips, the keyword `match` list, `scenarios`, the sessions picker, and the help text. |
| `demos/ide.json` | Prompt chips, `match`, `scenarios`, the model labels, the agent name and the review note. |
| `demos/harness.json` | The seed, tick length, defaults, the plan every session follows, recovery length and the three language samples. |

A scenario is a list of steps:

- `{ "say": "text" }`: a streamed reply. Lines starting with `# ` are headings. A fenced block marked `diff` is colored.
- `{ "tool": "read_file", "args": "src/retry.rs", "read": { "path": "src/retry.rs" } }`: a tool call. Use `read`, `search` (a substring) or `list`. The output is computed from the project files, so it always matches them. Use only real tool names: `read_file`, `list_files`, `search`, `write_file`, `patch_file`.
- `{ "patch": { "path": "...", "edits": [ { "find": "...", "replace": "..." } ] }, "intro": "...", "applied": "...", "blocked": "..." }` (CLI) or `{ "write": ..., "intro": "...", "applied": "...", "rejected": "..." }` (IDE): a change. `find` must match exactly once. The diff shown is computed from the edits.

To add a prompt, add a scenario, add a chip with its `id`, and add a `match` entry with the words that should select it. Prompts that match nothing get the scripted fallback line, clearly marked as a demo notice.

Keep the rules: sentence case, plain words, no em dashes, no invented customers or numbers, and every number that is not a count of what is on screen labelled as sample.

## Test a demo

1. Serve the kit and open `demos.html`. For fast, repeatable runs add `?demo-speed=8`, and `&demo-reduced-motion=1` for the reduced motion path.
2. ejm-cli: send each chip. Confirm the fix prompt ends blocked, the header shows `grants: read`, and Grant write turns it to `grants: read + write` and applies the patch. Press Ctrl+C while a run streams, Ctrl+S for sessions, `/help`, and Plain.
3. ejm-ide: open files from the tree, close tabs, send the fix prompt, then accept in one run and reject in another. Accepted lines get the marker. Press Ctrl+K and use the palette by keyboard only.
4. ejm-harness: lower Max concurrent to 1 and add sessions. Only that many run. Press Crash worker and confirm the journal shows the crash, the interruption of every running session, the replay with an event count, the uncertain call and the resume. Sequence numbers only ever increase.
5. Tab through each demo without a mouse. Focus must always be visible and Escape must work.
6. Check 320 px, 390 px, 1440 px and 3440 px wide, light and dark (`?theme=dark`), and the page console for errors.
7. Switch off JavaScript: the static transcript or sample must still explain the product.
