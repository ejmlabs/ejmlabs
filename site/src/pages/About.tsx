import { Actions, Note } from '@ejm/ui/layout/SiteContent';
import { Button } from '@ejm/ui/components/ui/button';
import { ExternalLink } from '@ejm/ui/shell/ExternalLink';
import { PROJECTS } from '@ejm/site/projects';
import { Hero } from '@ejm/ui/layout/Hero';
import { Row, Rows } from '@ejm/ui/layout/Rows';
import { Section } from '@ejm/ui/layout/Section';

const principles = [
  [
    'Start with the source.',
    'Read the code of an open source project and try a change. Guides and contribution notes live with each project.',
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
      <Hero title="A home for open source projects and commercial products." titleId="about-title">
        <p>
          Open source tools and experiments you can use, study and build on,
          and commercial products for business. What comes next can be either,
          from coding tools to ideas beyond AI.
        </p>
      </Hero>

      <Section title="How we work." emphasis>
        <Rows aria-label="Principles">
          {principles.map(([title, description]) => (
            <Row key={title} title={title} description={description} />
          ))}
        </Rows>
      </Section>

      <Section title="Build with us.">
        <Actions>
          <Button variant="link" asChild><a href="/projects/">See the projects</a></Button>
          <Button variant="link" asChild>
            <ExternalLink href={PROJECTS.ejmlabs.repo}>ejmlabs on GitHub</ExternalLink>
          </Button>
        </Actions>
        <Section title="Company details">
          <Note>ejmlabs, llc</Note>
        </Section>
      </Section>
    </>
  );
}
