import {
  Actions,
  ContentHeading,
  InlineLink,
  Note,
  SectionBody,
} from '@ejm/ui/layout/SiteContent';
import { PROJECTS } from '@ejm/site/projects';
import { Band } from '@ejm/ui/layout/Band';
import { Row, Rows } from '@ejm/ui/layout/Rows';
import { SectionHead } from '@ejm/ui/layout/SectionHead';

const principles = [
  [
    'Start with the source.',
    'Read the code and try a change. Guides and contribution notes live with each project.',
  ],
  [
    'Build something useful.',
    'Solve a problem or test an idea. Share clear code and examples others can build on.',
  ],
  [
    'Contribute what you can.',
    'Report a bug, improve a guide, share an example or send a patch.',
  ],
] as const;

export default function About() {
  return (
    <>
      <Band tone="paper" aria-labelledby="about-title">
        <SectionHead
          as="h1"
          purpose="page"
          title="A home for open source projects."
          id="about-title"
        >
          <p>
            Tools and experiments you can use, study and build on. What comes
            next is open too, from coding tools to ideas beyond AI.
          </p>
        </SectionHead>
      </Band>

      <Band tone="sage" aria-labelledby="principles-title">
        <SectionHead title="How we work." id="principles-title">
        </SectionHead>
        <SectionBody>
          <Rows aria-label="Principles">
            {principles.map(([title, description]) => (
              <Row key={title} title={title} description={description} />
            ))}
          </Rows>
        </SectionBody>
      </Band>

      <Band tone="paper" aria-labelledby="where-title">
        <SectionHead title="Build with us." id="where-title" />
        <SectionBody>
          <Actions>
            <InlineLink href="/projects/">See the projects</InlineLink>
            <InlineLink href={PROJECTS.ejmlabs.repo} external>
              ejmlabs on GitHub
            </InlineLink>
          </Actions>
        </SectionBody>
        <SectionBody>
          <section aria-labelledby="company-details-title">
            <ContentHeading as="h2" id="company-details-title">
              Company details
            </ContentHeading>
            <Note>ejmlabs, llc</Note>
          </section>
        </SectionBody>
      </Band>
    </>
  );
}
