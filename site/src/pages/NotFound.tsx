import { InlineLink } from '@ejm/ui/layout/InlineLink';
import { Band } from '@ejm/ui/layout/Band';
import { SectionHead } from '@ejm/ui/layout/SectionHead';

export default function NotFound() {
  return (
    <Band>
      <SectionHead as="h1" purpose="page" title="Page not found.">
        <p>
          The address may have changed.{' '}
          <InlineLink href="/">Explore ejmlabs</InlineLink> to find the projects
          and guides.
        </p>
      </SectionHead>
    </Band>
  );
}
