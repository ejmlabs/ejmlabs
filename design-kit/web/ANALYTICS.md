# Analytics

Every ejmlabs site measures visits with Cloudflare Web Analytics. It needs no cookies, does not follow people across sites and does not fingerprint. It reports page views, referrers, countries, devices and Core Web Vitals per hostname.

## Add it to a page

One line in the `<head>`, the same on every site:

```html
<script src="/design-kit/web/analytics.js" defer></script>
```

`web/analytics.js` looks up the site token for the current hostname and loads Cloudflare's beacon. It does nothing on localhost, previews and unknown hosts, so development never counts.

| Host | Dashboard name |
| --- | --- |
| `ejmlabs.com` | ejmlabs.com |
| `cli.ejmlabs.com` | cli.ejmlabs.com |
| `ide.ejmlabs.com` | ide.ejmlabs.com |
| `harness.ejmlabs.com` | harness.ejmlabs.com |

View them in the Cloudflare dashboard under Analytics and Logs, Web Analytics. Zone analytics for the same traffic also appear under each zone.

## Privacy rules

- Honor Do Not Track and Global Privacy Control. The loader skips the beacon for visitors who send either.
- No personal data in analytics. Do not add custom events that carry text a visitor typed. The interactive demos send nothing.
- The only cookie on our sites is the theme choice (`ejm-theme`), which is functional and stores `light` or `dark`.
- Say so on the page. The footer links to the privacy note when one exists.

## Content Security Policy

The beacon needs two sources, already present in `web/_headers`: `script-src` allows `https://static.cloudflareinsights.com` and `connect-src` allows `https://cloudflareinsights.com`. Use that file as the site's `_headers` so the policy is identical everywhere.

## Add a new host

1. In Cloudflare, create a Web Analytics site for the hostname with automatic setup off. The API call is `POST /accounts/{account_id}/rum/site_info` with `{ "host": "name.ejmlabs.com", "auto_install": false }`.
2. Add the host and its `site_token` to `SITES` in `web/analytics.js`.
3. Rebuild and deploy. The shared checker fails a page that omits the script.

## What is not measured

Custom product events, such as which demo prompts people try, are not part of Cloudflare Web Analytics. If we want them later, use Workers Analytics Engine with only anonymous counts, and document it here first.
