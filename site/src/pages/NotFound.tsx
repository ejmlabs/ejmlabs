import { InlineLink } from '@ejm/ui/layout/InlineLink';
import { Hero } from '@ejm/ui/layout/Hero';

export default function NotFound() {
  return (
    <Hero title="Page not found.">
      <p>
        The address may have changed.{' '}
        <InlineLink href="/">Explore ejmlabs</InlineLink> to find the projects
        and guides.
      </p>
    </Hero>
  );
}
