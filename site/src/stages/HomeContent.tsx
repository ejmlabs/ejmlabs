import uiMark from '@ejm/tokens/assets/logos/symbol-ink.svg?url';
import cliMark from '@ejm/tokens/assets/projects/cli/mark-ink.svg?url';
import ideMark from '@ejm/tokens/assets/projects/ide/mark-ink.svg?url';
import harnessMark from '@ejm/tokens/assets/projects/harness/mark-ink.svg?url';
import { Band } from '@ejm/ui/layout/Band';
import { Button } from '@ejm/ui/components/ui/button';
import { Row, Rows } from '@ejm/ui/layout/Rows';
import { SectionHead } from '@ejm/ui/layout/SectionHead';
import { Brand } from '@ejm/ui/shell/Brand';
import { Actions, SectionBody } from '@ejm/ui/layout/SiteContent';
import { projects } from '../content';

const projectMarks = { cli: cliMark, ide: ideMark, harness: harnessMark, ui: uiMark };

export default function HomeContent() {
  return <>
    <Band id="projects" tone="sage" aria-labelledby="projects-title">
      <SectionHead as="h1" purpose="page" title="Current projects." id="projects-title">
        <p>Open source tools to use, study and improve. MIT licensed.</p>
      </SectionHead>
      <SectionBody>
        <Rows aria-label="Projects">
          {projects.map(p => <Row
            key={p.id}
            title={<Brand src={projectMarks[p.id]} width={32} height={32} name={p.name} placement="project" />}
            href={p.url}
            external
            description={p.row}
            meta={p.kind}
          />)}
        </Rows>
      </SectionBody>
      <SectionBody>
        <Actions><Button variant="link" asChild><a href="/projects/">Project guides and source</a></Button></Actions>
      </SectionBody>
    </Band>
    <Band tone="paper" aria-labelledby="try-title">
      <SectionHead title="See it in action." id="try-title">
        <p>A code fix, an editor session, and tools sharing a resource limit.</p>
        <Actions><Button asChild arrow><a href="/try/">Watch the sessions</a></Button></Actions>
      </SectionHead>
    </Band>
  </>;
}
