import cliMark from '@ejm/tokens/assets/projects/cli/mark-ink.svg?url';
import ideMark from '@ejm/tokens/assets/projects/ide/mark-ink.svg?url';
import harnessMark from '@ejm/tokens/assets/projects/harness/mark-ink.svg?url';
// Local copies until @ejm/tokens publishes them (see src/assets/projects/README.md).
import uiMark from '../assets/projects/ui/mark-ink.svg?url';
import calmMark from '../assets/projects/calm/mark-ink.svg?url';
import ripple from '@ejm/ui/art/inline/divider-ripple.svg?raw';
import { Band } from '@ejm/ui/layout/Band';
import { Button } from '@ejm/ui/components/ui/button';
import { Hero } from '@ejm/ui/layout/Hero';
import { Row, Rows } from '@ejm/ui/layout/Rows';
import { SectionHead } from '@ejm/ui/layout/SectionHead';
import { Brand } from '@ejm/ui/shell/Brand';
import { Actions, SectionBody } from '@ejm/ui/layout/SiteContent';
import { GITHUB, projects } from '../content';

const projectMarks = { cli: cliMark, ide: ideMark, harness: harnessMark, ui: uiMark, calm: calmMark };

// Home row copy. Project facts stay in content.ts; these lines only introduce each project.
const homeRows = {
  cli: 'A Rust coding agent for the terminal, with saved sessions, run controls and shared resource limits.',
  ide: 'A desktop editor with code navigation, Git tools, and an agent beside the code you are reading.',
  harness: 'An open source Rust engine for coding agents, with shared session limits and a durable event journal.',
  ui: 'Build with shared components, themes and layouts.',
  calm: 'A procedurally generated ocean where a whale travels past ships and landscapes, with a new sea for each seed.',
};

const habits = [
  ['Start small.', 'Each experiment answers one question, so it can be built, tried and judged quickly.'],
  ['Make it useful.', 'A project is finished when someone can use it, not when it is clever.'],
  ['Share the tools.', 'What we build for ourselves, we release as open source so others can build on it.'],
] as const;

function HomeHero() {
  return <Hero
    art={ripple}
    drawOn
    title="Open source. Room to explore."
    actions={<>
      <Button asChild arrow><a href="#projects">Explore the projects</a></Button>
      <Button asChild variant="link"><a href={GITHUB} rel="external noopener">Browse the source</a></Button>
    </>}
  >
    <p>ejmlabs is a home for open source projects and experiments. Explore the code, try something out, or help improve it.</p>
  </Hero>;
}

export default function HomeContent() {
  return <>
    <HomeHero />
    <Band id="approach" tone="mist" aria-labelledby="approach-title">
      <SectionHead title="How we work." id="approach-title" />
      <SectionBody>
        <Rows aria-label="Habits">
          {habits.map(([title, description]) => <Row key={title} title={title} description={description} />)}
        </Rows>
      </SectionBody>
      <SectionBody>
        <Actions><Button variant="link" asChild><a href="/about/">More about ejmlabs</a></Button></Actions>
      </SectionBody>
    </Band>
    <Band id="projects" tone="sage" aria-labelledby="projects-title">
      <SectionHead title="Current projects." id="projects-title">
        <p>A terminal agent, a desktop editor, the engine they share, the design system behind these sites, and ejm-calm, a generated ocean scene to watch. The code for all five is open source under the MIT license.</p>
      </SectionHead>
      <SectionBody>
        <Rows aria-label="Projects">
          {projects.map(p => <Row
            key={p.id}
            title={<Brand src={projectMarks[p.id]} width={32} height={32} name={p.name} placement="project" />}
            href={p.url}
            external
            description={homeRows[p.id]}
            meta={p.kind}
          />)}
        </Rows>
      </SectionBody>
      <SectionBody>
        <Actions><Button variant="link" asChild><a href="/projects/">Read about the projects</a></Button></Actions>
      </SectionBody>
    </Band>
    <Band tone="paper" aria-labelledby="try-title">
      <SectionHead title="See it in action." id="try-title">
        <p>Watch a bug fix, follow Edi through an edit, and see the harness manage tools and saved history. The examples run locally, with no model connection.</p>
        <Actions><Button asChild arrow><a href="/try/">Watch the sessions</a></Button></Actions>
      </SectionHead>
    </Band>
    <Band tone="mist" aria-labelledby="open-title">
      <SectionHead title="Help improve a project." id="open-title">
        <p>Bug reports, documentation fixes, examples, and code changes are welcome. Start with a project's README and contribution guide, then open an issue or a pull request.</p>
        <Actions><Button asChild arrow><a href={GITHUB} rel="external noopener">Find a repository</a></Button></Actions>
      </SectionHead>
    </Band>
  </>;
}
