import { Static } from '@ejm/ssg';
import HomeDemo from '../stages/HomeDemo';

// Keep the complete server markup without loading its components on first load.
// Static owns hydration and route recovery across all sites. Only the ejm-cli demo between the two parts hydrates.
const Content = import.meta.env.SSR || import.meta.env.DEV ? await import('../stages/HomeContent') : null;

export default function Home() {
  return <>
    <Static render={Content ? () => <Content.HomeHero /> : undefined} />
    <HomeDemo />
    <Static render={Content ? () => <Content.default /> : undefined} />
  </>;
}
