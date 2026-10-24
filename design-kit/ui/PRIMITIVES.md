# Application primitives

Historical source and review record. See the [retained-source notice](../README.md). File paths, commands, and asset availability below describe the earlier kit, not current production.

The named parts of every ejmlabs application interface. Build a screen by choosing from this list. If a need is not here, ask for a new primitive instead of inventing one. All classes live in `ui/app.css`, all read `--ejm-ui-*` roles, and `ui/index.html` shows every one in its states.

## Conventions

- **Prefix and naming.** Every class starts with `ejm-ui-`. Elements add `__part` and variants add `--variant`, for example `ejm-ui-btn`, `ejm-ui-tool__head` and `ejm-ui-btn--primary`.
- **State lives in attributes, not classes.** `aria-selected`, `aria-checked`, `aria-pressed`, `aria-expanded`, `aria-current`, `aria-invalid`, `aria-busy`, `aria-disabled`, `aria-sort`, `:disabled`, and `data-state` for status values. The markup and the look cannot drift apart.
- **Sizes.** Controls and rows 32 px, small 28, large 40, pane and tab headers 36, panel headers 40, toolbar 44. Add `ejm-ui--compact` to the app root for dense tools: 28, 24 and 36. On touch screens every target is 44 px. Radius 8 px for controls, pill (999 px) for buttons, chips, tags, badges and switches, 12 px for tool cards, tonal blocks and menus, 16 px for panels, dialogs, popovers and the palette.
- **Open visual language.** Regions are told apart by tone and space, not outlines. A hairline appears only under the title bar, between table rows and list sections, between a panel head and its body, and on form fields. Selected is tone plus a small primary marker. Labels are 12 px sentence case in the muted role. The rules are in `ui/OPEN.md`.
- **Focus.** One 2 px primary ring with a 1 px offset, on everything interactive. Never remove it. Controls that hide a native input (checkbox, radio, switch, segmented control) move the ring onto the drawn box.
- **Hover, active, focus** apply to every interactive primitive and are not repeated in the table. The States column lists the others.
- **Color is never the only signal.** Errors carry a glyph and words, status carries a word, selected carries a tint plus an edge or a check.
- **Series colors.** `data-hue="1"` to `"6"` on a chart element or tag sets its fill. Hues are never used for text. In a line chart the hue also sets the dash and the marker shape (below), so a series is never told apart by color alone.
- **Motion.** 120 to 180 ms for interface changes. Ambient motion is only the running pulse (1.6 s), the spinner and the indeterminate progress bar. All of it stops under `prefers-reduced-motion`. Skeletons never shimmer.
- **Overlays.** Menu, popover, dialog, tooltip and toast are the only things with a shadow, and it is very soft. They have no border. Render them inside the `.ejm-ui` root so the theme variables reach them.
- **Responsive.** The shell stacks under 760 px. Tabs and toolbars scroll or wrap. Tables scroll inside their wrapper. Settings, stat tiles, charts, tool cards and panels adapt to their container, and a dialog becomes a bottom sheet in a container under 560 px.
- **Missing values.** Show a dash, never zero. Label sample data as sample.
- **States.** Every tile, list, table, chart and panel has three states besides its data: loading (bones in the final layout, a hidden status word), empty (one plain sentence, at most one action) and error (what failed, one retry). See *States by region* below. A zero or a blank area is never a state.
- **Writing.** Sentence case, plain words, no em dashes. Buttons name the action ("Save provider"), not "OK".

## Catalog

### Existing parts

| Class | Use it when | Do not use it when | States supported | Accessibility |
| --- | --- | --- | --- | --- |
| `ejm-ui-shell`, `-titlebar`, `-sidebar`, `-main`, `-aside`, `-statusbar` | Laying out the application window. Stacks under 760 px: sidebar above main, aside below | Laying out a web page or a card | none | Sidebar is a `nav` or `aside` with a label. Main is `main`. |
| `ejm-ui-pane__head`, `-pane__body` | A named pane section with a 32 px header | The region has its own actions: use `ejm-ui-panel` | none | Use a heading element for the title. |
| `ejm-ui-tabs`, `-tab` | 2 to 5 views above content | More than 5 sections beside content: use `ejm-ui-vtabs` | selected | `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`. Arrow keys move, Home and End jump, only the selected tab is in the tab order. |
| `ejm-ui-row` (`-row__meta`, `-row__main`, `-row__title`, `-row__sub`, `--two`) | Lists, results, sessions, one row per object | Tabular data with columns: use `ejm-ui-table` | selected, disabled, active | In a `role="listbox"`, rows are `role="option"` with `aria-selected`. Up and Down move, Enter opens. Selected is `aria-selected`, never a class. |
| `ejm-ui-btn` (`--primary`, `--ghost`, `--danger`, `--destructive`, `--icon`, `--sm`, `--lg`, `--toggle`, `-btn__caret`) | The user commits an action | Navigation to another page: use `ejm-ui-link`. Two primary buttons in one view. | disabled, aria-disabled, loading (`aria-busy`), pressed (`--toggle`), expanded | Native `button` with `type`. Icon buttons need `aria-label`. Loading keeps the label and adds a spinner; set `aria-busy="true"` and ignore clicks. Use `--destructive` only inside a confirm step. |
| `ejm-ui-input` (`--mono`) | Free text on one line | Several lines: use `ejm-ui-textarea`. A fixed set of choices: use select or radios. | disabled, readonly, invalid, focus | Always inside `ejm-ui-field` with a `label`. Set `aria-invalid="true"` and `aria-describedby` to the error. Use the right `type` and `autocomplete`. |
| `ejm-ui-kbd` | Showing one key | Showing a whole combination as one cap | none | One `kbd` per key. |
| `ejm-ui-badge` (`--success`, `--warning`, `--error`, `--special`) | A short tinted status word: ok, failed, M | A number: use `ejm-ui-count`. A category: use `ejm-ui-tag`. | none | The word carries the meaning. Never an empty colored badge. |
| `ejm-ui-menu` (`-menu__item`, `-item--danger`, `-menu__label`, `-menu__sep`, `-menu__check`, `-menu__hint`) | Commands from a button or right-click, with sections and checkable items | More than 10 items: use the command palette | active (`data-active`), checked, disabled, destructive | `role="menu"` with `menuitem`, `menuitemcheckbox` (`aria-checked`) or `menuitemradio`. Roving tabindex. Up and Down move, Home and End jump, Enter or Space activates, Escape closes and returns focus, typing a letter jumps. Separators are `role="separator"`. |
| `ejm-ui-tooltip`, `ejm-ui-toast`, `ejm-ui-palette` | A short label on hover, a finished action, a command search | Anything that needs a decision | tooltip: visible, hidden | Tooltip is `role="tooltip"` linked by `aria-describedby`. Toast is `role="status"`. Palette is a dialog with a combobox. |
| `ejm-ui-msg`, `ejm-ui-tool`, `ejm-ui-diff` | Agent conversation: messages, tool calls, proposed changes | Generic cards | tool: `data-state` running, ok, error | Tool state is words, not only the dot. Diff lines are text with `+` and `-`. |
| `ejm-ui-code`, `ejm-syn-comment`, `ejm-syn-keyword`, `ejm-syn-string`, `ejm-syn-number`, `ejm-syn-type`, `ejm-syn-function`, `ejm-syn-macro`, `ejm-syn-parameter`, `ejm-syn-property`, `ejm-syn-constant`, `ejm-syn-namespace`, `ejm-syn-delimiter`, `ejm-term` | Code blocks and terminal previews | Editing: use Monaco | none | Focusable scroll regions need `tabindex="0"` and a label. |
| `ejm-ui-label`, `-caption`, `-title`, `-heading`, `ejm-ui-mono`, `-sr` | The five type styles, mono values, and screen-reader-only text | Decoration | none | `ejm-ui-sr` hides text visually and keeps it for assistive technology. |

### Forms

| Class | Use it when | Do not use it when | States supported | Accessibility |
| --- | --- | --- | --- | --- |
| `ejm-ui-field` (`-field__head`, `-field__label`, `-field__hint`, `-field__error`, `-field__count`) | Any control needs a label, hint or error | A control inside a toolbar or table where the label is the column | disabled (label dims), invalid | `label for` the control. Hint and error ids go in `aria-describedby`. The error starts with a glyph and says what is wrong and how to fix it. Add `data-required` on the label and `required` on the control. Move focus to the first invalid field on submit. |
| `ejm-ui-textarea` (`--mono`) | More than one line of text | One line: use input | disabled, readonly, invalid | Same as input. Allow vertical resize. |
| `ejm-ui-select` (`--auto` for content width; wraps a native `select`) | One of 4 to 15 known options | Fewer than 4: radios or segmented. More than 15: search. | disabled, invalid | Native keyboard and menu. Label required. Do not put a placeholder as the only option text without `disabled`. |
| `ejm-ui-check` (`-check__box`, `-check__text`, `-check__hint`) | Several options can be on at once, or one explicit yes | Applies instantly: use switch. One of many: use radio. | checked, indeterminate (set `.indeterminate` in script), disabled, invalid | Real `input type="checkbox"` inside the `label`. Space toggles. A group sits in a `fieldset` with a `legend`. |
| `ejm-ui-radio` (`-radio__dot`) | Exactly one of 2 to 5 options, all visible | More than 5 options: select | checked, disabled, invalid | `input type="radio"` with a shared `name` inside a `fieldset` and `legend`. Arrow keys move and select, the group is one tab stop. |
| `ejm-ui-switch` (`-switch__track`) | A setting turns on or off immediately | A choice that needs Save: use checkbox | on, off, disabled, loading (`aria-busy`) | `input type="checkbox" role="switch"`. Space toggles. The label names the setting, not the state. |
| `ejm-ui-seg` (`-seg--full`, `-seg__opt`) | 2 to 4 short modes or views that apply now | Navigation between pages: use tabs | selected, disabled | `role="radiogroup"` with a label. Real radio inputs, arrow keys move. |
| `ejm-ui-slider`, `ejm-ui-slider-row` | An approximate value in a bounded range | An exact value: use the number stepper | disabled, focus | `input type="range"` with `min`, `max`, `step` and a label. Show the value in an `output`. Set `--p` for the filled track. Arrow keys step, PageUp and PageDown jump. |
| `ejm-ui-number` | An exact small integer | A large range or a decimal: use input with `inputmode` | disabled, at limit (disable the button) | Group labelled. Input has `role="spinbutton"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`. Up and Down arrows step. Buttons carry `aria-label`. |
| `ejm-ui-search` (`-search__icon`, `-search__end`) | Filtering a list or finding a file | A command list: use the palette | disabled, loading (spinner in the end slot), has value | `input type="search"` with a label. A clear button has `aria-label` and Escape also clears. Announce result counts in a live region. |
| `ejm-ui-inputgroup` | One action belongs to one input: reveal, copy, browse | Several actions: use a toolbar | disabled, focus | Button has a clear label. A reveal button is a toggle with `aria-pressed`. |
| `ejm-ui-drop` (`-drop__input`, `-drop__icon`, `-drop__title`, `-drop__hint`) | Users bring in files by drag or click | A single known file path: use input group with Browse | default, over (`data-state="over"`), invalid, disabled | A `label` around a real `input type="file"`. Keyboard works natively. The error text sits in the hint and is linked with `aria-describedby`. Announce accepted files in a live region. |
| `ejm-ui-form` (`-form__row`, `-form__actions`), `ejm-ui-fieldset` (`-fieldset__legend`) | Collecting more than one value | A single setting that applies on change | none | Native `form`. Group related controls with `fieldset` and `legend`. Primary action last, Enter submits. |

### Actions

| Class | Use it when | Do not use it when | States supported | Accessibility |
| --- | --- | --- | --- | --- |
| `ejm-ui-btn--sm`, `--lg` | Dense toolbars (24) or touch and onboarding (36) | Mixing sizes inside one group | as button | Touch surfaces still need 44 px targets. Use `--lg` plus padding. |
| `ejm-ui-btn--icon` with `ejm-ui-tip` and `ejm-ui-tooltip` | A familiar icon in tight space | The icon is not universal: add a text label | as button, tooltip visible on hover and focus, `data-open` to hold | `aria-label` on the button. Tooltip `role="tooltip"`, `aria-describedby`. Escape dismisses it. Tooltip is hoverable. Placement `--above`, `--right`. |
| `ejm-ui-btngroup` | 2 to 4 related actions as a set | One choice among modes: use segmented control | disabled per button | `role="group"` with a label. Each button is its own tab stop. |
| `ejm-ui-splitbtn` (`-splitbtn__toggle`) | One usual action plus variants | All options equal: use a menu button | disabled, expanded | Toggle has `aria-label`, `aria-haspopup="menu"`, `aria-expanded`. Down arrow opens the menu from the toggle. |
| `ejm-ui-btn--toggle` | A tool stays on or off | A setting with a label: use switch | pressed, disabled | `aria-pressed`. Space and Enter toggle. The label does not change with state. |
| `ejm-ui-toolbar` (`-toolbar__sep`, `-toolbar__spacer`) | A pane has 4 or more actions for its content | Fewer than 4 actions: place buttons in the header | as buttons | `role="toolbar"` with a label. One tab stop; Left and Right arrows move between items, Home and End jump. |
| `ejm-ui-btn` with `ejm-ui-btn__caret` and `ejm-ui-anchor` (`--end`, `--above` for placement) | 3 or more related commands share one button | One command | collapsed, expanded, disabled | `aria-haspopup="menu"`, `aria-expanded`. Enter, Space or Down opens, focus moves into the menu, Escape returns focus. |
| `ejm-ui-link` (`--quiet`) | Text leads somewhere | An action on the current page: use a button | hover, active, disabled (`aria-disabled`) | Use `a href`. Link text says where it goes. Never "click here". |
| `ejm-ui-chip` (`--removable`, `-chip__remove`) | A filter the user switches or a value they entered | A status: use badge or status. A category: use tag. | pressed, invalid, disabled | Filter chips are buttons with `aria-pressed`. A remove button has `aria-label="Remove X"`. Backspace and Delete remove the focused chip. |
| `ejm-ui-tag` | A quiet category label | Anything clickable | hue (`data-hue`) | Plain text. The hue dot is decoration. |

### Feedback

| Class | Use it when | Do not use it when | States supported | Accessibility |
| --- | --- | --- | --- | --- |
| `ejm-ui-banner` (`--success`, `--warning`, `--error`, `-banner__icon`, `-banner__body`, `-banner__title`, `-banner__actions`) | A message belongs to the page or a section and stays until handled | A finished action with no decision: use a toast | info, success, warning, error, with dismiss and actions | `role="status"`, or `role="alert"` only for errors that appear without user action. The icon is `aria-hidden`. Dismiss button has `aria-label`. Banners do not steal focus. |
| `ejm-ui-status` | One object has a state, as a dot and a word | The state needs a tinted label: use badge | `data-state`: idle, running, ok, warn, error | The word carries the meaning. Running pulses. |
| `ejm-ui-progress` (`--success`, `--warning`, `--error`, `--indeterminate`, `-progress__meta`, `-progress__track`, `-progress__bar`) | A task has a known length, or runs longer than 2 seconds | Under 2 seconds: use a spinner | determinate (`--value`), indeterminate, success, warning, error | `role="progressbar"` on the track, `aria-labelledby`, `aria-valuenow` with min and max. Omit `aria-valuenow` when indeterminate. Set `--value` from 0 to 100. |
| `ejm-ui-spinner` (`--sm`, `--lg`) | A short wait with no length, inside a button or field | A region of known shape: use a skeleton | running | `role="status"` with `ejm-ui-sr` text, or `aria-hidden` when a visible label is next to it. |
| `ejm-ui-skel` (`--text`, `--row`, `--block`, `--avatar`, `--value`, `--chart`), `ejm-ui-skellist` | A region is loading and its final shape is known: `--value` stands in for a stat value, `--chart` for a plot, `ejm-ui-skellist` for a timeline or activity list | Unknown shape, or under 300 ms | loading | Set `aria-busy="true"` on the container and `aria-hidden` on the bones, and add one `ejm-ui-sr` word such as "Loading sessions". No shimmer, so reduced motion changes nothing. |
| `ejm-ui-empty` (`-empty__icon`, `-empty__title`, `-empty__text`, `-empty__action`, `--flush`) | A list, table, chart or pane has nothing yet. Add `--flush` inside a panel body, a table cell (`ejm-ui-table__state`) or a frame, where it takes the container's tone | Data is loading or failed | empty | Title is a heading at the right level. One plain sentence and at most one action, ideally focusable first. Never a zero or a blank area. |
| `ejm-ui-empty--error` (`-empty__detail`) | A whole pane, list, table or chart failed to load. Combine with `--flush` inside a panel | A single field error: use the field error | error | `role="alert"` when it replaces content after an action. One retry button, named for the action. Say what failed in the title and what to do in the sentence. Keep the user's work. |
| `ejm-ui-toasts` (`--inline`), `ejm-ui-toast` (`-toast__body`, `-toast__title`, `-toast__actions`) | An action finished and needs no decision | The user must respond, or an error needs action: use a banner | enter animation, with action, dismissable | `role="status"`. Max 3 stacked. Pause the timer on hover and focus. Auto-dismiss after 6 seconds only if there is no action. Keep a way to review missed ones. |
| `ejm-ui-count` (`--primary`, `--error`) | A number beside a label or icon | Words: use badge | muted, primary, error | Put the meaning in the label: "Problems, 99+". Cap at 99+. |

### Data

| Class | Use it when | Do not use it when | States supported | Accessibility |
| --- | --- | --- | --- | --- |
| `ejm-ui-tablewrap`, `ejm-ui-table` (`--dense`, `-table__num`, `-table__check`, `-table__sort`, `-table__state`) | Comparing records across attributes | Two attributes: use a list | sortable (`aria-sort`), selected row, disabled row, sticky header, loading (skeleton cells), empty and error (one `td` with `ejm-ui-table__state` and `colspan`, holding an `ejm-ui-empty--flush`) | `th scope="col"`. `aria-sort` on the sorted header only, sort control is a `button` inside the `th`. Row selection needs `role="grid"` with `aria-selected`, or a checkbox column. Give the wrapper a set height for the sticky header and `tabindex="0"` when it scrolls. Numbers are mono, right aligned, tabular. |
| `ejm-ui-kv` (`--mono`, `-kv__row`) | Describing one object | Several objects: use a table | none | Native `dl`, `dt`, `dd` with a `div` per pair. |
| `ejm-ui-stat` (`-stat__value`, `-stat__delta`, `-stat__note`, `-stat__row`) | One number summarizes a period | A series: use a chart | normal, empty (`data-empty`), tone (`data-tone`) | Delta text includes the sign and the period. A missing value is a dash with a note. Estimated values say so. |
| `ejm-ui-tree` (`-tree__item`, `-tree__row`, `-tree__marker`, `-tree__label`, `-tree__meta`) | Content nests: files, symbols, setting groups | A flat list | selected, expanded, collapsed, disabled | `role="tree"`, `treeitem`, `role="group"`, `aria-expanded`, `aria-level`, `aria-selected`. Roving tabindex. Up and Down move, Right expands or enters, Left collapses or exits, Home and End jump, typing jumps. Set `--lvl` on each row. |
| `ejm-ui-list` (`-list__head`) with `ejm-ui-row` | A flat set grouped by date, status or type | Columns of data: use a table | selected, disabled, sticky headers | Section headers are `role="presentation"` in a listbox, or real headings in a plain list. |
| `ejm-ui-timeline` (`-timeline__item`, `-timeline__marker`, `-timeline__head`, `-timeline__title`, `-timeline__time`, `-timeline__body`) | Ordered events where the order matters | Unordered notifications | `data-state`: ok, error, warn, running, pending | `ol`. State is also written in words (badge or `ejm-ui-sr` text). Use `time` with a `datetime`. |
| `ejm-ui-avatar` (`--sm`, `--lg`, `--model`, `--more`), `ejm-ui-avatar-stack` | Showing who or what acted | Decoration | hue (`data-hue`) | Initials are always shown. Give images `alt`. A stack has `role="group"` with a label listing the people. |
| `ejm-ui-chart` (`-chart__head`, `-chart__data`), `ejm-ui-bars` (`-bars__col`, `-bars__plot`, `-bars__bar`, `-bars__label`, `-bars__value`) | A trend across categories. Put the value in `ejm-ui-bars__value` inside each bar, so every value is text | Exact values across many series: use a table | hue | `role="img"` with an `aria-label` that states the values, or a nearby table. Bar height is `--v` from 0 to 100. |
| `ejm-ui-lines` (`-lines__y`, `-lines__plot`, `-lines__grid`, `-lines__grid--base`, `-lines__area`, `-lines__line`, `-lines__mark`, `-lines__x`) | A value over an ordered axis where the shape matters: line, or line plus area. Pair it with `ejm-ui-legend--marks` and a table alternative | Parts of a whole: use a stack bar. One tiny trend beside a number: use a spark | hue 1 to 6. The hue sets the line color, dash and marker shape | The plot is `aria-hidden`; the wrapper is `role="img"` with an `aria-label` that lists every value. The legend names every series in text with its latest or total value. A `details` with class `ejm-ui-chart__data` (an `ejm-ui-accordion`) holds the same values as a table. |
| `ejm-ui-hbar` (`-hbar__label`, `-hbar__track`, `-hbar__fill`, `-hbar__value`) | Ranked shares with names | Many series over time | hue | Label and value are text. Fill is `--v` from 0 to 100. |
| `ejm-ui-stackbar` (`-stackbar__seg`), `ejm-ui-legend` (`--line`, `--marks`, `-legend__value`) | Parts of one whole, with a legend | More than 6 parts | hue | Segment weight is `--v`. The legend lists every segment with its value in text. The bar has `role="img"` and a label. |
| `ejm-ui-spark` (`--wide`, `-spark__line`, `-spark__area`) | A tiny trend beside a number | A chart the user reads values from | hue | `aria-hidden` when the number beside it says the same thing. Otherwise `role="img"` with a label. |
| `ejm-ui-log` (`--nowrap`, `-log__line`, `-log__time`, `-log__level`) | A stream of machine output | Prose | `data-level`: debug, info, warn, error, selected | `role="log"`, `tabindex="0"`, label. The level is written out. Search matches use `mark`. |

### Navigation and layout

| Class | Use it when | Do not use it when | States supported | Accessibility |
| --- | --- | --- | --- | --- |
| `ejm-ui-crumbs` | The user is 3 or more levels deep | Flat navigation | current page, collapsed middle | `nav` with `aria-label`, an `ol`, last item `aria-current="page"` and not a link. A collapsed middle is a button that names how many it hides. |
| `ejm-ui-pager` (`-pager__item`, `-pager__gap`, `-pager__summary`) | A fixed result set with page jumps | A growing feed: use Load more | current, disabled, gaps | `nav` with `aria-label`, current is `aria-current="page"`. Previous and next have `aria-label`. Move focus to the results heading after a page change. |
| `ejm-ui-vtabs`, `ejm-ui-vtab` | 4 to 10 sections beside content | 2 to 5 views above content: use tabs | selected, disabled | `role="tablist"`, `aria-orientation="vertical"`, `role="tab"`, `aria-selected`, `aria-controls`. Up and Down move, Home and End jump. |
| `ejm-ui-accordion` (`-accordion__body`) | Optional reading or advanced settings | Content every user needs | open, closed, disabled | Native `details` and `summary`: Enter and Space work. Use `aria-disabled` and do not allow toggling when disabled. |
| `ejm-ui-stepper` (`--vertical`, `-stepper__step`, `-stepper__marker`, `-stepper__label`, `-stepper__text`, `-stepper__sub`) | 3 to 6 ordered steps, such as setup | Free navigation between sections | `data-state`: todo, current, done, error | `ol`. Current step has `aria-current="step"`. Add `ejm-ui-sr` text such as "(done)". The marker is `aria-hidden`. |
| `ejm-ui-shortcuts` (`-shortcuts__group`, `-shortcuts__row`, `-shortcuts__keys`) | Listing commands with their keys | Marketing copy | none | One `kbd` per key. Show the platform's key names. Group headings are real headings or labelled groups. |
| `ejm-ui-activity` (`-activity__item`, `-activity__spacer`) | 3 to 7 top-level areas switching a sidebar | Page-level navigation on the web | selected or pressed, disabled, with count | `nav` with `aria-label`. Items are buttons with `aria-label` and a tooltip, `aria-pressed` for the open area. Settings at the bottom. Include the count in the label. |
| `ejm-ui-panel` (`--docked`, `-panel__head`, `-panel__title`, `-panel__actions`, `-panel__body`, `-panel__body--flush`, `-panel__foot`) | A named region with its own actions: Problems, Terminal | A bare group of content: use `ejm-ui-pane__head` | normal, docked | `section` labelled by its title. Actions are labelled buttons. |
| `ejm-ui-split` (`--horizontal`, `--vertical`, `-split__pane`), `ejm-ui-handle` | Two regions share a window and the user sets the ratio | A fixed layout | hover, focus, dragging (`data-dragging`) | Handle is `role="separator"` with `aria-orientation`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `tabindex="0"` and a label. Arrow keys resize by 16 px, Shift for 64, Home and End to the limits, Enter collapses. Set `--a`. |
| `ejm-ui-resizable`, `ejm-ui-handle--edge` | The sidebar width is the user's choice | A fixed sidebar | hover, focus, dragging | Same as the split handle. Keep `--w` between 180 and 480 px. Persist it. Double click resets. |
| `ejm-ui-settings` (`-settings__section`, `-settings__label`, `-settings__title`, `-settings__desc`, `-settings__controls`, `-settings__row`) | A page of many preferences | Creating a record: use a form | normal, narrow (one column when its container is under 640 px) | One `section` per group, labelled by its title. Settings apply on change and say so. Setting rows pair a label with its control through `aria-labelledby`. |
| `ejm-ui-anchor` (`--end`, `--above`), `ejm-ui-popover` (`-popover__title`, `-popover__foot`) | A small piece of content or one input hangs off a control | Two or more decisions: use a dialog | open | `role="dialog"` with a label, trigger has `aria-haspopup="dialog"` and `aria-expanded`. Focus moves in, Escape closes and returns focus, click outside closes. |
| `ejm-ui-backdrop` (`--contained`), `ejm-ui-dialog` (`--wide`, `--danger`, `-dialog__head`, `-dialog__body`, `-dialog__foot`, `-dialog__icon`) | The user must decide before going on: confirm, short form, destructive approval | Information the user can ignore: use a banner or toast | confirm, form, destructive. Bottom sheet in a container under 560 px | `role="dialog"` or `alertdialog` for destructive, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`. Focus moves in, is trapped, returns on close. Escape cancels. Focus Cancel first for destructive. The confirm button names the action. The page behind is inert. |

### Dashboard

| Class | Use it when | Do not use it when | States supported | Accessibility |
| --- | --- | --- | --- | --- |
| `ejm-ui-dash` (`-dash__head`, `-dash__tiles`, `-dash__grid`, `-dash__wide`) | A screen summarizes a period: a heading and period control, stat tiles, one main chart beside recent activity, and a table | A single metric or a settings page | loading, empty and error per block, reflows by container | The head has a real heading. Each block is a labelled `ejm-ui-panel` or `ejm-ui-stat`. The table wrapper is a labelled, focusable scroll region when it can scroll. |

Layout: tiles are an auto-fit grid (160 px minimum, so two across on a phone and four on a laptop). The grid below is one column until the dashboard is 760 px wide, then the chart takes two thirds and the activity list one third, and `ejm-ui-dash__wide` (the table) spans both. The dashboard stops growing at 1600 px and centers.

### Line chart markers and dashes

The hue of a series sets its color, dash and marker, so the same series reads the same everywhere, including in the legend (`ejm-ui-legend--marks`). Limit a chart to four series.

| `data-hue` | Dash | Marker |
| --- | --- | --- |
| 1 | solid | circle |
| 2 | long dash | square |
| 3 | dotted | diamond |
| 4 | dash and dot | triangle up |
| 5 | short dash | triangle down |
| 6 | dash and two dots | cross |

How to build one: the SVG plot uses a 0 to 100 grid with `preserveAspectRatio="none"` and `vector-effect: non-scaling-stroke`, so lines scale and stay crisp. For point `i` of `n` with value `v` and axis maximum `max`, use `x = 3 + i * 94 / (n - 1)` and `y = 100 - v / max * 100` in the path, and set `--x` and `--y` (0 to 100, `y` measured from the bottom as `v / max * 100`) on the HTML marker, tick and axis label spans. Text is HTML, so it never scales. Always label the sample data, and write the values in the `aria-label`, the legend and the table.

### States by region

Every region below has the same three states. Use the classes in the third column; do not draw a zero, an empty box or a blank area.

| Region | Loading | Empty | Error |
| --- | --- | --- | --- |
| Stat tile | `ejm-ui-skel--text` and `ejm-ui-skel--value` in the tile, `aria-busy` | `ejm-ui-stat__value[data-empty]` with a dash and a note ("No sessions yet.") | the dash and a note ("Could not load this figure.") with one ghost button, "Try again" |
| Table | `ejm-ui-skel--text` cells in the same columns, `aria-busy` on the wrapper | one `td.ejm-ui-table__state` row with `ejm-ui-empty--flush`, a sentence and one button | the same row with `ejm-ui-empty--error ejm-ui-empty--flush` and "Try again" |
| List, timeline, activity | `ejm-ui-skellist` | `ejm-ui-empty--flush`, one sentence, one action | `ejm-ui-empty--error ejm-ui-empty--flush`, "Try again" |
| Chart | `ejm-ui-skel--chart` in the panel body | `ejm-ui-empty--flush` ("No usage to chart yet") and one action | `ejm-ui-empty--error ejm-ui-empty--flush`, "Try again" |
| Panel | the real head, body as above | the real head, an empty in the body | the real head, an error in the body |
| Tree, log, palette | `ejm-ui-skel--row` rows | `ejm-ui-empty--flush` ("No folder open", "No log lines yet", "No commands match") with its one action if there is one | `ejm-ui-empty--error ejm-ui-empty--flush` |

Loading keeps the panel head and the final layout, and adds one `ejm-ui-sr` word ("Loading sessions") for assistive technology. Skeletons never move, so reduced motion needs no special case.

## Composing screens

Each recipe is an ordered list of primitives, outside in. Follow the order; skip an item only if the screen truly has no need for it.

### IDE shell

1. `ejm-ui-shell` with `ejm-ui-titlebar`.
2. `ejm-ui-activity` at the left edge, with `ejm-ui-tip--right` tooltips and `ejm-ui-count` badges.
3. `ejm-ui-resizable` holding `ejm-ui-sidebar` and an `ejm-ui-handle--edge`.
4. In the sidebar: `ejm-ui-pane__head`, `ejm-ui-search`, then `ejm-ui-tree` for files or `ejm-ui-list` with `ejm-ui-row` for chats and git changes.
5. `ejm-ui-main` with `ejm-ui-tabs` over the editor.
6. `ejm-ui-split--vertical` between the editor and `ejm-ui-panel--docked` for Terminal, Problems and Output (`ejm-ui-log`).
7. A second `ejm-ui-split--horizontal` for the agent pane: `ejm-ui-msg`, `ejm-ui-tool`, `ejm-ui-diff`, then the composer (`ejm-ui-input` and a primary `ejm-ui-btn`).
8. `ejm-ui-statusbar` with `ejm-ui-status` items and `ejm-ui-kbd` hints.
9. Overlays on demand: `ejm-ui-palette`, `ejm-ui-menu`, `ejm-ui-popover`, `ejm-ui-dialog`, `ejm-ui-toasts`.

### Settings screen

1. `ejm-ui-crumbs` (Settings, then the page).
2. `ejm-ui-vtabs` for categories, beside the content.
3. `ejm-ui-heading`, then `ejm-ui-settings`.
4. One `ejm-ui-settings__section` per group, with a label column and a control column.
5. In the control column: `ejm-ui-settings__row` with `ejm-ui-switch`, `ejm-ui-seg` or `ejm-ui-number` for settings that apply at once; `ejm-ui-field` with `ejm-ui-select` or `ejm-ui-inputgroup` (API key and Test) for values.
6. `ejm-ui-banner` for provider problems, at the top of the section it belongs to.
7. `ejm-ui-dialog--danger` for destructive settings such as removing a key.
8. A provider record uses `ejm-ui-form` inside `ejm-ui-dialog--wide` instead of a settings row.

### List-detail

1. `ejm-ui-split--horizontal` with a resizable `ejm-ui-handle`.
2. Left pane: `ejm-ui-toolbar` with `ejm-ui-search` and filter `ejm-ui-chip`s, then `ejm-ui-list` of `ejm-ui-row--two` with `ejm-ui-avatar`, `ejm-ui-badge` or `ejm-ui-status`.
3. Loading: three `ejm-ui-skel--row`. Empty: `ejm-ui-empty` with one action. Failed: `ejm-ui-empty--error` with retry.
4. Right pane: `ejm-ui-pane__head` with title and `ejm-ui-btn` actions, `ejm-ui-kv` for properties, `ejm-ui-tabs` for sections, `ejm-ui-timeline` for history.
5. Nothing selected: `ejm-ui-empty` in the right pane.
6. Many results: `ejm-ui-pager` below the list.

### Dashboard

1. `ejm-ui-dash` holds everything. `ejm-ui-dash__head` has an `ejm-ui-heading`, a caption with the period and an `ejm-ui-badge` "sample data" when the figures are not real, and a period `ejm-ui-seg`.
2. `ejm-ui-dash__tiles`: three or four `ejm-ui-stat`, each with a change that includes its sign and period, and optionally an `ejm-ui-spark` in `ejm-ui-stat__row`.
3. `ejm-ui-dash__grid`: an `ejm-ui-panel` with the main chart (`ejm-ui-lines` or `ejm-ui-bars`, `ejm-ui-legend` with values, and the table alternative), beside an `ejm-ui-panel` with an `ejm-ui-timeline` of recent activity.
4. An `ejm-ui-panel` with class `ejm-ui-dash__wide` holding an `ejm-ui-tablewrap` and `ejm-ui-table`: sortable, numeric columns right aligned.
5. Every block has its states from *States by region*: loading bones, an empty with one action, an error with one retry. Missing values are dashes.
### Onboarding flow

1. `ejm-ui-stepper` across the top, current step with `aria-current="step"`.
2. One step per screen: `ejm-ui-title`, one sentence, then the step's controls.
3. Provider step: `ejm-ui-radio` list or `ejm-ui-select`. Key step: `ejm-ui-field` with `ejm-ui-inputgroup` and a Test button that shows loading, then `ejm-ui-banner--success` or `--error`.
4. Folder step: `ejm-ui-drop` or `ejm-ui-inputgroup` with Browse.
5. `ejm-ui-progress` if a model downloads.
6. Footer: `ejm-ui-btn--ghost` Back, one `ejm-ui-btn--primary ejm-ui-btn--lg` Continue (named for the action), and a `ejm-ui-link` to skip.
7. The last step ends in `ejm-ui-empty` with a single "Start a chat" action.
