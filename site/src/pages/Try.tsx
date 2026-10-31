import { ShowcaseFrame } from '@ejm/demos/ShowcaseFrame';
import { FocusRegion } from '@ejm/ui/layout/SiteContent';
import { Hero } from '@ejm/ui/layout/Hero';
import { Section } from '@ejm/ui/layout/Section';
import { LazyCliPreview } from '@ejm/demos/islands/cli-preview';
import { LazyIdePreview } from '@ejm/demos/islands/ide-preview';
import { LazyHarnessPreview } from '@ejm/demos/islands/harness-preview';

// ShowcaseFrame centers itself with auto margins, which shrinks it to its content as a direct child of a Section body (a grid).
// A plain block wrapper keeps it at its full width.
export default function Try() {
  return (
    <>
      <Hero title="See the projects at work." titleId="try-title">
        <p>
          Follow a bug fix, inspect an edit, and watch tools at work.
        </p>
      </Hero>

      <Section
        id="cli"
        title="ejm-cli"
        intro={<p>Read the code, fix a flaky retry test, run the tests and inspect the diff.</p>}
      >
        <FocusRegion>
          <ShowcaseFrame
            label="ejm-cli example session"
            note="Example session with recorded test output."
          >
            <LazyCliPreview rootMargin="200px" />
          </ShowcaseFrame>
        </FocusRegion>
      </Section>

      <Section
        id="ide"
        title="ejm-ide"
        intro={<p>Read the source with Edi. Follow the search, edits and review.</p>}
      >
        <FocusRegion>
          <ShowcaseFrame
            label="ejm-ide example session"
            note="Example edit. Tests shown have not been run."
          >
            <LazyIdePreview rootMargin="200px" />
          </ShowcaseFrame>
        </FocusRegion>
      </Section>

      <Section
        id="harness"
        title="ejm-harness"
        intro={<p>Follow tool calls, then reopen the session and read its history.</p>}
      >
        <FocusRegion>
          <ShowcaseFrame
            label="ejm-harness example session"
            note="Recorded development session. Playback only; resource figures are reservations."
          >
            <LazyHarnessPreview rootMargin="200px" />
          </ShowcaseFrame>
        </FocusRegion>
      </Section>
    </>
  );
}
