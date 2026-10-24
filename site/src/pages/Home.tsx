import { Static } from '@ejm/ssg';

// Keep the complete server markup without loading its components on first load.
// Static owns hydration and route recovery across all sites, so the home page does not hydrate.
const Content = import.meta.env.SSR || import.meta.env.DEV ? await import('../stages/HomeContent') : null;

export default function Home() {
  return <Static render={Content ? () => <Content.default /> : undefined} />;
}
