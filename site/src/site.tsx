import { defineSite } from '@ejm/ssg';
import { siteDefaults } from './head';
import NotFound from './pages/NotFound';
import { App } from './shell';
import './styles.css';

const description = 'Open source projects and experiments. Explore the code, try the tools, and contribute ideas, examples, documentation, or fixes.';
const base = siteDefaults(description);

export default defineSite({
  ...base,
  head: { ...base.head, title: 'ejmlabs | Open source projects and experiments' },
  App,
  routes: [
    { path: '/', load: () => import('./pages/Home') },
    {
      path: '/projects/',
      load: () => import('./pages/Projects'),
      head: { title: 'Projects', description: 'Explore the current open source projects: ejm-cli, ejm-ide, ejm-harness, ejm-ui and calm. Find source code, setup guides, and ways to contribute.' },
    },
    {
      path: '/try/',
      load: () => import('./pages/Try'),
      head: { title: 'See the projects at work', description: 'Watch ejm-cli fix a bug, Edi edit code, and ejm-harness manage tools and saved sessions. Example sessions play locally with no model connection.' },
    },
    {
      path: '/about/',
      load: () => import('./pages/About'),
      head: { title: 'About', description: 'A home for open source projects and experiments, with room for ideas beyond AI and developer tools.' },
    },
    {
      path: '/brand/',
      load: () => import('./pages/Brand'),
      head: { title: 'Brand kit', description: 'Approved ejmlabs logos, project marks, colors and artwork, with files and guidance for using them.' },
    },
    {
      path: '/privacy/',
      load: () => import('./pages/Privacy'),
      head: { title: 'Privacy', description: 'What ejmlabs.com measures and what it stores: Cloudflare Web Analytics, no cookies except your theme choice.' },
    },
  ],
  notFound: { component: NotFound, head: { title: 'Page not found' } },
});
