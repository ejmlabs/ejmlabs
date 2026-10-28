import { CALM_PROJECT, GERRY_PROJECT, UI_PROJECT } from './content';
import { Link, usePath } from '@ejm/ssg';
import { Analytics } from '@ejm/site/analytics';
import { otherSites, PROJECTS, sourceLinks } from '@ejm/site/projects';
import markInk from '@ejm/tokens/assets/logos/symbol-ink.svg?url&no-inline';
import markPaper from '@ejm/tokens/assets/logos/symbol-paper.svg?url&no-inline';
import { SiteLayout } from '@ejm/ui/shell/SiteLayout';
import { InlineLink } from '@ejm/ui/layout/InlineLink';
import { type FooterProps } from '@ejm/ui/shell/Footer';
import { type NavItem } from '@ejm/ui/shell/link';
import type { ReactNode } from 'react';

const here = PROJECTS.ejmlabs;

// The header carries the five pages people look for; the footer lists all of them.
const nav = [
  { label: 'Projects', href: '/projects/' },
  { label: 'Download', href: '/download/' },
  { label: 'Watch', href: '/try/' },
  { label: 'About', href: '/about/' },
  { label: 'Brand', href: '/brand/' },
];

// Footer links take plain text labels, so project names use a non-breaking hyphen (U+2011) to stay on one line.
const unbroken = (link: NavItem) => ({ ...link, label: link.label.replaceAll('-', '‑') });

const footerPages = [
  { label: 'Home', href: '/' },
  ...nav,
  { label: 'Privacy', href: '/privacy/' },
];

const footer: FooterProps = {
  identity: {
    name: here.name,
    artwork: { src: markInk, darkSrc: markPaper, width: 31, height: 28 },
    description: 'Open source and commercial projects. Room to explore.',
  },
  columns: [
    { heading: 'Pages', links: footerPages },
    { heading: 'Projects', links: [...otherSites('ejmlabs'), ...[UI_PROJECT, CALM_PROJECT, GERRY_PROJECT].map(p => ({ label: p.name, href: p.url, external: true }))].map(unbroken) },
    { heading: 'Source', links: sourceLinks('ejmlabs') },
  ],
  privacy: (
    <>
      Visits are counted with Cloudflare Web Analytics, which sets no cookies
      and is off when your browser sends Do Not Track or Global Privacy Control.
      The only cookie is your theme choice.{' '}
      <InlineLink href="/privacy/">Privacy</InlineLink>
    </>
  ),
  legal: `© 2026 ${here.name}. Open source project software and docs are MIT licensed. Gerry is proprietary. Brand assets retain their own rights.`,
};

const isHere = (path: string, href: string) =>
  href === '/' ? path === '/' : path.startsWith(href.replace(/\/$/, ''));

/** The page frame for every route: skip link, header with the theme toggle last, the page, the footer, and analytics. */
export function App({ children }: { children: ReactNode }) {
  const path = usePath();
  const items: NavItem[] = nav.map((p) => ({
    ...p,
    current: isHere(path, p.href),
  }));
  const columns = footer.columns!.map((c) =>
    c.heading === 'Pages'
      ? {
          ...c,
          links: footerPages.map((p) => ({
            ...p,
            current: isHere(path, p.href),
          })),
        }
      : c,
  );
  return (
    <>
      <SiteLayout
        header={{
          identity: {
            name: here.name,
            artwork: {
              src: markInk,
              darkSrc: markPaper,
              width: 31,
              height: 28,
            },
          },
          homeLabel: `${here.name} home`,
          nav: items,
        }}
        footer={{ ...footer, columns }}
        linkComponent={Link}
      >
        {children}
      </SiteLayout>
      <Analytics />
    </>
  );
}
