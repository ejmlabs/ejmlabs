import { SectionBody } from '@ejm/ui/layout/SiteContent';
import { ShowcaseFrame } from '@ejm/demos/ShowcaseFrame';
import { Band } from '@ejm/ui/layout/Band';
import { SectionHead } from '@ejm/ui/layout/SectionHead';
import { LazyCliShowcase } from '@ejm/demos/islands/cli-lazy';
import { LazyIdeShowcase } from '@ejm/demos/islands/ide-lazy';
import { LazyHarnessShowcase } from '@ejm/demos/islands/harness-lazy';

export default function Try() {
  return (
    <>
      <Band tone="sage" aria-labelledby="try-title">
        <SectionHead
          as="h1"
          purpose="page"
          title="See the projects at work."
          id="try-title"
        >
          <p>
            Watch a bug fix in CLI, follow an edit with Edi, and see harness
            manage tools and saved sessions.
          </p>
        </SectionHead>
      </Band>

      <Band id="cli" tone="mist" aria-labelledby="cli-title">
        <SectionHead title="ejm-cli" id="cli-title">
          <p>
            Read the code, fix a flaky retry test, run the tests and inspect the
            diff.
          </p>
        </SectionHead>
        <SectionBody>
          <ShowcaseFrame
            label="ejm-cli example session"
            note="Sample session with recorded test output. No model runs here."
          >
            <LazyCliShowcase rootMargin="200px" />
          </ShowcaseFrame>
        </SectionBody>
      </Band>

      <Band id="ide" tone="sage" aria-labelledby="ide-title">
        <SectionHead title="ejm-ide" id="ide-title">
          <p>
            Follow Edi through file reads, code search and automatically
            reviewed edits.
          </p>
        </SectionHead>
        <SectionBody>
          <ShowcaseFrame
            label="ejm-ide example session"
            note="Sample editor session with recorded tool output. No model runs here."
          >
            <LazyIdeShowcase rootMargin="200px" />
          </ShowcaseFrame>
        </SectionBody>
      </Band>

      <Band id="harness" tone="mist" aria-labelledby="harness-title">
        <SectionHead title="ejm-harness" id="harness-title">
          <p>
            Watch tools share a job limit, then reopen the session and read its
            history.
          </p>
        </SectionHead>
        <SectionBody>
          <ShowcaseFrame
            label="ejm-harness example session"
            note="Formatted local recording. No worker or model runs here. Resource figures are admission reservations."
          >
            <LazyHarnessShowcase rootMargin="200px" />
          </ShowcaseFrame>
        </SectionBody>
      </Band>
    </>
  );
}
