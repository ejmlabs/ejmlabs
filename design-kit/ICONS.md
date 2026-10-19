# Interface icons

Twelve original utility icons for websites, product interfaces, and documents, plus the sun and moon pair that the site theme toggle uses. Open `icons/sheet.svg` for the visual reference of the first twelve.

These are additions to the design kit. They are not extracted from the source PDF. They do not replace the custom ejmlabs symbol or wordmark. Use the identity assets in `logos/` for studio attribution, profiles, and favicons.

## Drawing rules

| Setting | Value |
| --- | --- |
| Canvas | 24 × 24 units |
| Default size | 24 × 24 CSS px |
| Stroke | 1.5 units |
| Caps and joins | Round |
| Fill | None |
| Color | `currentColor` |
| Preferred sizes | 20, 24, and 32 px |

Keep the square canvas and scale both dimensions together. The stroke scales with the canvas. At 20 px it is 1.25 px; at 32 px it is 2 px. Do not add `vector-effect="non-scaling-stroke"`, heavy fills, shadows, or separate stroke weights.

Use Forest or Ink on Paper and Mist. Use Paper on Forest. Sage works for decoration, but its contrast on Paper is too low for an essential control. Use a 44 × 44 px control target around a 24 px icon where space allows. The icon itself does not need to fill the target.

## Files and purpose

| File | Typical use |
| --- | --- |
| `icons/arrow-right.svg` | Continue, next, or a text link |
| `icons/arrow-up-right.svg` | An outward link in an editorial layout |
| `icons/download.svg` | Save a local file |
| `icons/plus.svg` | Add or create |
| `icons/close.svg` | Close a panel or dismiss an item |
| `icons/check.svg` | Complete or selected status |
| `icons/menu.svg` | Open navigation |
| `icons/search.svg` | Search |
| `icons/code.svg` | Code or source files |
| `icons/play.svg` | Play media or resume motion |
| `icons/pause.svg` | Pause media or motion |
| `icons/external-link.svg` | Open an external destination |
| `icons/sun.svg` | The theme toggle while dark mode is on: offers light mode |
| `icons/moon.svg` | The theme toggle while light mode is on: offers dark mode |

Choose either the arrow up right or the external link mark for the same kind of link within one interface. State any new-tab behavior in the link's accessible name. Do not rely on the icon alone to explain it.

## Web use

Inline SVG inherits the surrounding text color. An SVG loaded through an `<img>` does not inherit its parent's `color`. Inline the file when the icon needs to follow a control's theme.

For a control with a visible label, hide the icon from assistive technology and let the label name the action. Remove the standalone file's `role`, `aria-labelledby`, and `<title>` when making it decorative:

```html
<button type="button">
  <svg width="24" height="24" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="1.5"
       stroke-linecap="round" stroke-linejoin="round"
       aria-hidden="true" focusable="false">
    <path d="M12 3.5V15M7.5 10.5 12 15l4.5-4.5M4.5 16.5v3a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-3"/>
  </svg>
  Download kit
</button>
```

For a button that shows only an icon, put a specific `aria-label` on the button and keep the SVG decorative. For example, use `aria-label="Pause animation"`, rather than `aria-label="Pause icon"`. Update that label when the action changes to resume.

Each standalone file includes an accessible `<title>` and a title ID unique to that file. If you inline the same file more than once with its title intact, give every instance a new title ID and update its `aria-labelledby` to match. When using an `<img>`, supply a useful `alt` attribute, or `alt=""` for decoration.

The SVG files contain no scripts, external links, embedded fonts, or global CSS. The contact sheet uses text labels and the brand palette; individual icons remain color neutral.
