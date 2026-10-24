import { ShowcaseFrame } from '@ejm/demos/ShowcaseFrame';
import { LazyCliPreview } from '@ejm/demos/islands/cli-preview';
import { Band } from '@ejm/ui/layout/Band';
import { SectionHead } from '@ejm/ui/layout/SectionHead';
import { SectionBody } from '@ejm/ui/layout/SiteContent';

// The static excerpt is what the server renders and what shows without scripts; playback loads near the viewport.
export default function HomeDemo() {
  return <Band id="try" tone="mist" aria-labelledby="cli-demo-title">
    <SectionHead title="Try ejm-cli in your browser." id="cli-demo-title">
      <p>A simulated session that behaves like the real tool: it can read your project, and it cannot change a file until you grant write access. Nothing runs on your machine.</p>
    </SectionHead>
    <SectionBody>
      <ShowcaseFrame id="cli-demo" label="ejm-cli example session" note="Simulated demo. Nothing runs on your machine and nothing is sent anywhere.">
        <LazyCliPreview rootMargin="200px" />
      </ShowcaseFrame>
    </SectionBody>
  </Band>;
}
