import { lazy } from 'react';
import { LazyIsland } from '@ejm/demos/islands/LazyIsland';
import { CliView } from '@ejm/demos/views';
import { Band } from '@ejm/ui/layout/Band';
import { SectionHead } from '@ejm/ui/layout/SectionHead';
import { Note, SectionBody } from '@ejm/ui/layout/SiteContent';

// The interactive session and its styles load together in their own chunk near the viewport, so the page CSS stays as it is.
// The stylesheet repeats the page imports in the same order, so its rules keep their shared cascade when it is added.
const CliIsland = lazy(() => Promise.all([import('@ejm/demos/islands/cli'), import('./cli-demo.css')]).then(([island]) => island));

export default function HomeDemo() {
  return <Band id="try" tone="mist" aria-labelledby="cli-demo-title">
    <SectionHead title="Try ejm-cli in your browser." id="cli-demo-title">
      <p>A simulated session that behaves like the real tool: it can read your project, and it cannot change a file until you grant write access. Nothing runs on your machine.</p>
    </SectionHead>
    <SectionBody>
      <div id="cli-demo" data-demo="cli">
        <LazyIsland
          island={CliIsland}
          rootMargin="200px"
          fallback={<>
            <CliView label="ejm-cli, a simulated screen" />
            <Note>Simulated demo. Nothing runs on your machine and nothing is sent anywhere.</Note>
          </>}
        />
      </div>
    </SectionBody>
  </Band>;
}
