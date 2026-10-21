import { SectionBody } from '@ejm/ui/layout/SiteContent';
import { ShowcaseFrame } from '@ejm/demos/ShowcaseFrame';
import { Band } from '@ejm/ui/layout/Band';
import { SectionHead } from '@ejm/ui/layout/SectionHead';
import { LazyCliPreview } from '@ejm/demos/islands/cli-preview';
import { LazyIdePreview } from '@ejm/demos/islands/ide-preview';
import { LazyHarnessPreview } from '@ejm/demos/islands/harness-preview';

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
            Follow a bug fix, inspect an edit, and watch tools at work.
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
            note="Example session with recorded test output."
          >
            <LazyCliPreview rootMargin="200px" />
          </ShowcaseFrame>
        </SectionBody>
      </Band>

      <Band id="ide" tone="sage" aria-labelledby="ide-title">
        <SectionHead title="ejm-ide" id="ide-title">
          <p>
            Read the source with Edi. Follow the search, edits and review.
          </p>
        </SectionHead>
        <SectionBody>
          <ShowcaseFrame
            label="ejm-ide example session"
            note="Example edit. Tests shown have not been run."
          >
            <LazyIdePreview rootMargin="200px" />
          </ShowcaseFrame>
        </SectionBody>
      </Band>

      <Band id="harness" tone="mist" aria-labelledby="harness-title">
        <SectionHead title="ejm-harness" id="harness-title">
          <p>
            Follow tool calls, then reopen the session and read its history.
          </p>
        </SectionHead>
        <SectionBody>
          <ShowcaseFrame
            label="ejm-harness example session"
            note="Recorded development session. Playback only; resource figures are reservations."
          >
            <LazyHarnessPreview rootMargin="200px" />
          </ShowcaseFrame>
        </SectionBody>
      </Band>
    </>
  );
}
