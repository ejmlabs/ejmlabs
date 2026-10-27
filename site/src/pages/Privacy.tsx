import { InlineCode, SectionBody } from '@ejm/ui/layout/SiteContent';
import { Band } from '@ejm/ui/layout/Band';
import { Fact, Facts } from '@ejm/ui/layout/Facts';
import { SectionHead } from '@ejm/ui/layout/SectionHead';

export default function Privacy() {
  return (
    <>
      <Band tone="sage" aria-labelledby="privacy-title">
        <SectionHead
          as="h1"
          purpose="page"
          title="Your privacy on this site."
          id="privacy-title"
        >
          <p>
            We use Cloudflare Web Analytics to count visits. The only cookie
            remembers your theme choice.
          </p>
        </SectionHead>
      </Band>
      <Band tone="paper" aria-labelledby="facts-title">
        <SectionHead title="What we collect and store." id="facts-title" />
        <SectionBody>
          <Facts>
            <Fact label="analytics">
              Cloudflare Web Analytics counts visits to ejmlabs.com and its
              project sites.
            </Fact>
            <Fact label="cookies">
              Analytics sets no cookies. The ejm-theme cookie remembers whether
              you chose light or dark, so that choice follows you across
              ejmlabs.com and its project sites.
            </Fact>
            <Fact label="do not track">
              If your browser sends Do Not Track or Global Privacy Control, the
              analytics script is not loaded at all.
            </Fact>
            <Fact label="example sessions">
              The sessions play locally in your browser with sample code and
              recorded output. Playback is not saved between visits.
            </Fact>
            <Fact label="downloads">
              The download page, <InlineCode>install.sh</InlineCode> and{' '}
              <InlineCode>releases.json</InlineCode> are static files. The
              files they point to are served by GitHub, which keeps its own
              request logs under its own policy. The install script sends
              nothing to ejmlabs.com and contacts only GitHub.
            </Fact>
            <Fact label="reports">
              The report links open the project's GitHub issues or private
              security report form. This site reads nothing from you to build
              them, holds no report and keeps no copy. GitHub's terms apply to
              what you send there.
            </Fact>
            <Fact label="third parties">
              Cloudflare hosts the site and runs the analytics. No other third
              party loads on a page. Links to GitHub are ordinary links and
              load nothing until you follow one.
            </Fact>
            <Fact label="accounts">The site has no accounts or sign-in.</Fact>
          </Facts>
        </SectionBody>
      </Band>
    </>
  );
}
