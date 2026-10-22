import { Static } from '@ejm/ssg';

// The asset guide needs static links and shared layout, with no page JavaScript.
const Content =
  import.meta.env.SSR || import.meta.env.DEV
    ? (await import('../stages/BrandContent')).default
    : null;

export default function Brand() {
  return <Static render={Content ? () => <Content /> : undefined} />;
}
