import { Actions, Columns } from '@ejm/ui/layout/SiteContent';
import cliInk from '@ejm/tokens/assets/projects/cli/mark-ink.svg?no-inline';
import cliPaper from '@ejm/tokens/assets/projects/cli/mark-paper.svg?no-inline';
import ideInk from '@ejm/tokens/assets/projects/ide/mark-ink.svg?no-inline';
import idePaper from '@ejm/tokens/assets/projects/ide/mark-paper.svg?no-inline';
import harnessInk from '@ejm/tokens/assets/projects/harness/mark-ink.svg?no-inline';
import harnessPaper from '@ejm/tokens/assets/projects/harness/mark-paper.svg?no-inline';
import uiInk from '@ejm/tokens/assets/projects/ui/mark-ink.svg?no-inline';
import uiPaper from '@ejm/tokens/assets/projects/ui/mark-paper.svg?no-inline';
// Local copies of a mark @ejm/tokens does not export (see src/assets/projects/README.md).
import calmInk from '../assets/projects/calm/mark-ink.svg?no-inline';
import calmPaper from '../assets/projects/calm/mark-paper.svg?no-inline';
import { Brand } from '@ejm/ui/shell/Brand';
import { Fact, Facts } from '@ejm/ui/layout/Facts';
import { Row, Rows } from '@ejm/ui/layout/Rows';
import { Hero } from '@ejm/ui/layout/Hero';
import { Section } from '@ejm/ui/layout/Section';
import { Button } from '@ejm/ui/components/ui/button';
import { ExternalLink } from '@ejm/ui/shell/ExternalLink';
import { Disclosure } from '@ejm/ui/components/ui/disclosure';
import { InlineLink } from '@ejm/ui/layout/InlineLink';
import { GERRY_PROJECT, projects } from '../content';
import { reportLinks, versionOfProject } from '../releases';

// Every project section follows the page theme (Mist and Paper alternate), so each mark has an Ink and a Paper file.
const projectMarks = {
  cli: { light: cliInk, dark: cliPaper },
  ide: { light: ideInk, dark: idePaper },
  harness: { light: harnessInk, dark: harnessPaper },
  ui: { light: uiInk, dark: uiPaper },
  calm: { light: calmInk, dark: calmPaper },
};

export default function Projects() {
  return (
    <>
      <Hero title="Explore the projects." titleId="projects-title">
        <p>
          Open source projects to use, study and improve. gerry, our
          commercial product, has <InlineLink href={GERRY_PROJECT.url} external>its own site</InlineLink>.
        </p>
      </Hero>

      {projects.map((p) => {
        const { light, dark } = projectMarks[p.id];
        return (
          <Section
            key={p.id}
            id={p.id}
            title={
              <Brand
                src={light}
                darkSrc={dark}
                width={40}
                height={40}
                name={p.name}
                placement="project"
              />
            }
            intro={<p>{p.summary}</p>}
          >
            <Columns
              primary={
                <Facts>
                  {p.facts.map(([label, value]) => (
                    <Fact key={label} label={label}>
                      {value}
                    </Fact>
                  ))}
                </Facts>
              }
              secondary={
                <Rows aria-label={`What ${p.name} does`}>
                  {p.does.map(([title, description]) => (
                    <Row
                      key={title}
                      title={title}
                      description={description}
                    />
                  ))}
                </Rows>
              }
            />
            <Actions>
              <Button asChild arrow>
                <a href={p.url} rel="external noopener">
                  Explore {p.name}
                </a>
              </Button>
              <Button variant="link" asChild>
                {p.secondary[1].startsWith('/') && !p.secondary[1].startsWith('//') ? (
                  <a href={p.secondary[1]}>{p.secondary[0]}</a>
                ) : (
                  <ExternalLink href={p.secondary[1]}>{p.secondary[0]}</ExternalLink>
                )}
              </Button>
            </Actions>
            <Disclosure summary="Guides and source">
              <Actions>
                {p.docs.map(([label, href]) => (
                  <Button key={label} variant="link" asChild>
                    <ExternalLink href={href}>{label}</ExternalLink>
                  </Button>
                ))}
                <Button variant="link" asChild>
                  <ExternalLink href={p.repo}>Source on GitHub</ExternalLink>
                </Button>
                {p.id !== 'calm' && (
                  <>
                    <Button variant="link" asChild>
                      <ExternalLink href={reportLinks(p.repo, versionOfProject(p.id)).bug}>Report a bug</ExternalLink>
                    </Button>
                    <Button variant="link" asChild>
                      <ExternalLink href={reportLinks(p.repo).feedback}>Send feedback</ExternalLink>
                    </Button>
                    <Button variant="link" asChild>
                      <ExternalLink href={reportLinks(p.repo).security}>Report a vulnerability privately</ExternalLink>
                    </Button>
                  </>
                )}
                {p.contribute && (
                  <Button variant="link" asChild>
                    <ExternalLink href={p.contribute}>Contribute</ExternalLink>
                  </Button>
                )}
              </Actions>
            </Disclosure>
          </Section>
        );
      })}
    </>
  );
}
