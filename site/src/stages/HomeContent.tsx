import cliMark from '@ejm/tokens/assets/projects/cli/mark-ink.svg?url';
import ideMark from '@ejm/tokens/assets/projects/ide/mark-ink.svg?url';
import harnessMark from '@ejm/tokens/assets/projects/harness/mark-ink.svg?url';
import uiMark from '@ejm/tokens/assets/projects/ui/mark-ink.svg?url';
// Local copies of marks @ejm/tokens does not export, or exports differently (see src/assets/projects/README.md).
import calmMark from '../assets/projects/calm/mark-ink.svg?url';
import gerryInk from '../assets/projects/gerry/mark-ink.svg?url';
import gerryPaper from '../assets/projects/gerry/mark-paper.svg?url';
import ripple from '@ejm/ui/art/inline/divider-ripple.svg?raw';
import { Button } from '@ejm/ui/components/ui/button';
import { Hero } from '@ejm/ui/layout/Hero';
import { Row, Rows } from '@ejm/ui/layout/Rows';
import { Section } from '@ejm/ui/layout/Section';
import { Actions } from '@ejm/ui/layout/SiteContent';
import { Brand } from '@ejm/ui/shell/Brand';
import { GERRY_PROJECT, GITHUB, projects } from '../content';

const projectMarks = { cli: cliMark, ide: ideMark, harness: harnessMark, ui: uiMark, calm: calmMark };

// Home row copy. Project facts stay in content.ts; these lines only introduce each project.
const homeRows = {
  cli: 'A Rust coding agent for the terminal, with saved sessions, run controls and shared resource limits.',
  ide: 'A desktop editor with code navigation, Git tools, and an agent beside the code you are reading.',
  harness: 'An open source Rust engine for coding agents, with shared session limits and a durable event journal.',
  ui: 'Build with shared components, themes and layouts.',
  calm: 'A generated ocean with a whale, ships and coastlines, and a new sea for each seed.',
};

const habits = [
  ['Start small.', 'Each experiment answers one question, so it can be built, tried and judged quickly.'],
  ['Make it useful.', 'A project is finished when someone can use it, not when it is clever.'],
  ['Share the tools.', 'Tools we build for ourselves are released as open source. Products for business are commercial, with their own licenses.'],
] as const;

function HomeHero() {
  return <Hero
    art={ripple}
    drawOn
    title="Open source tools. Products for business."
    actions={<>
      <Button asChild arrow><a href="#projects">Explore the projects</a></Button>
      <Button asChild variant="link"><a href={GITHUB} rel="external noopener">Browse the source</a></Button>
    </>}
  >
    <p>ejmlabs builds open source projects and commercial products. Explore the code, try something out, or help improve it.</p>
  </Hero>;
}

export default function HomeContent() {
  return <>
    <HomeHero />
    <Section title="How we work.">
      <Rows aria-label="Habits">
        {habits.map(([title, description]) => <Row key={title} title={title} description={description} />)}
      </Rows>
      <Actions><Button variant="link" asChild><a href="/about/">More about ejmlabs</a></Button></Actions>
    </Section>
    {/* The one emphasis band: approved Ink marks sit on Sage, which keeps its light scheme in both page themes. */}
    <Section
      id="projects"
      emphasis
      title="Open source projects."
      intro={<p>A terminal agent, a desktop editor, the engine they share, the design system behind these sites, and ejm-calm, a generated ocean scene to watch. The code for all five is open source under the MIT license.</p>}
      actions={<Button variant="link" asChild><a href="/projects/">Read about the projects</a></Button>}
    >
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
    </Section>
    <Section
      title="Commercial products."
      intro={<p>Not everything we build is open source. Our commercial products have their own licenses and terms.</p>}
    >
      <Rows aria-label="Products">
        {/* The ground follows the page theme, unlike Sage, so gerry's mark switches to Paper in dark mode. */}
        <Row
          title={<Brand src={gerryInk} darkSrc={gerryPaper} width={32} height={32} name={GERRY_PROJECT.name} placement="project" />}
          href={GERRY_PROJECT.url}
          external
          description="Your team's workspace, with gerry built in: one place for engineering, support, sales, operations, finance and leadership. It is not released yet, and its own site has the waitlist for early access."
          meta="Commercial / coming soon"
        />
      </Rows>
    </Section>
    <Section
      title="See it in action."
      intro={<p>Watch a bug fix, follow Edi through an edit, and see the harness manage tools and saved history. The examples run locally, with no model connection.</p>}
      actions={<Button asChild arrow><a href="/try/">Watch the sessions</a></Button>}
    />
    <Section
      title="Help improve a project."
      intro={<p>Bug reports, documentation fixes, examples, and code changes are welcome. Start with a project's README and contribution guide, then open an issue or a pull request.</p>}
      actions={<Button asChild arrow><a href={GITHUB} rel="external noopener">Find a repository</a></Button>}
    />
  </>;
}
