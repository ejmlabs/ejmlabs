import {
  Actions,
  Columns,
  SectionBody,
} from '@ejm/ui/layout/SiteContent';
import cliInk from '@ejm/tokens/assets/projects/cli/mark-ink.svg?no-inline';
import cliPaper from '@ejm/tokens/assets/projects/cli/mark-paper.svg?no-inline';
import ideInk from '@ejm/tokens/assets/projects/ide/mark-ink.svg?no-inline';
import harnessInk from '@ejm/tokens/assets/projects/harness/mark-ink.svg?no-inline';
import harnessPaper from '@ejm/tokens/assets/projects/harness/mark-paper.svg?no-inline';
// Local copies until @ejm/tokens publishes them (see src/assets/projects/README.md).
import uiInk from '../assets/projects/ui/mark-ink.svg?no-inline';
import uiPaper from '../assets/projects/ui/mark-paper.svg?no-inline';
import calmInk from '../assets/projects/calm/mark-ink.svg?no-inline';
import { Band } from '@ejm/ui/layout/Band';
import { Brand } from '@ejm/ui/shell/Brand';
import { Fact, Facts } from '@ejm/ui/layout/Facts';
import { Row, Rows } from '@ejm/ui/layout/Rows';
import { SectionHead } from '@ejm/ui/layout/SectionHead';
import { Button } from '@ejm/ui/components/ui/button';
import { ExternalLink } from '@ejm/ui/shell/ExternalLink';
import { Disclosure } from '@ejm/ui/components/ui/disclosure';
import { projects } from '../content';
import { reportLinks, versionOfProject } from '../releases';

const tones = ['mist', 'sage', 'paper'] as const; // the opening band is Sage, so the list alternates Mist, Sage, Paper
const projectMarks = {
  cli: { light: cliInk, dark: cliPaper },
  ide: { light: ideInk, dark: ideInk }, // Sage keeps its light scheme in either page theme.
  harness: { light: harnessInk, dark: harnessPaper },
  ui: { light: uiInk, dark: uiPaper },
  calm: { light: calmInk, dark: calmInk }, // Keep Ink while this band is Sage; revisit if the order changes.
};

export default function Projects() {
  return (
    <>
      <Band tone="sage" aria-labelledby="projects-title">
        <SectionHead
          as="h1"
          purpose="page"
          title="Explore the projects."
          id="projects-title"
        >
          <p>Open source projects to use, study and improve.</p>
        </SectionHead>
      </Band>

      {projects.map((p, i) => {
        const { light, dark } = projectMarks[p.id];
        return (
          <Band
            key={p.id}
            id={p.id}
            tone={tones[i % tones.length]}
            aria-labelledby={`${p.id}-title`}
          >
            <SectionHead
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
              id={`${p.id}-title`}
            >
              <p>{p.summary}</p>
            </SectionHead>
            <SectionBody>
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
            </SectionBody>
            <SectionBody>
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
            </SectionBody>
            <SectionBody>
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
            </SectionBody>
          </Band>
        );
      })}
    </>
  );
}
