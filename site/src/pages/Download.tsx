import { Button } from '@ejm/ui/components/ui/button';
import { ExternalLink } from '@ejm/ui/shell/ExternalLink';
import { Fact, Facts } from '@ejm/ui/layout/Facts';
import { Hero } from '@ejm/ui/layout/Hero';
import { Section } from '@ejm/ui/layout/Section';
import { Actions, FileDetail, InlineCode, InlineLink, Note, ReadingColumn } from '@ejm/ui/layout/SiteContent';
import { CopyLine } from '../CopyLine';
import { UI_PROJECT } from '../content';
import { PROJECTS } from '@ejm/site/projects';
import { artifactFor, artifacts, installLine, reportLinks, UI_PACKAGES_PUBLISHED, versionOf, type Product, type Target } from '../releases';

const TARGETS: readonly [Target, string][] = [
  ['linux-x86_64', 'Linux x86_64'],
  ['darwin-aarch64', 'macOS Apple silicon'],
  ['darwin-x86_64', 'macOS Intel'],
  ['windows-x86_64', 'Windows x86_64'],
];

const PRODUCTS: readonly { product: Product; name: string; project: 'cli' | 'harness' | 'ide' }[] = [
  { product: 'cli', name: 'ejm-cli', project: 'cli' },
  { product: 'worker', name: 'ejm-harness worker', project: 'harness' },
  { product: 'ide', name: 'ejm-ide', project: 'ide' },
];

/** What a platform with no file says. macOS command-line builds wait for notarization; nothing else is promised. */
function waiting(product: Product, target: Target) {
  return product !== 'ide' && target === 'darwin-aarch64' ? 'Waiting for notarization' : 'Not yet available';
}

const megabytes = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

function Cell({ product, target }: { product: Product; target: Target }) {
  const a = artifactFor(product, target);
  if (!a) return waiting(product, target);
  return (
    <>
      <ExternalLink href={a.url}>{a.filename}</ExternalLink>
      <FileDetail>
        {a.version} · {megabytes(a.bytes)}
      </FileDetail>
      <FileDetail>sha256 {a.sha256}</FileDetail>
    </>
  );
}

const repoOf = { cli: PROJECTS.cli.repo, harness: PROJECTS.harness.repo, ide: PROJECTS.ide.repo, ui: UI_PROJECT.repo } as const;
const reportProducts = [
  { name: 'ejm-cli', repo: repoOf.cli, version: versionOf('cli') },
  { name: 'ejm-harness', repo: repoOf.harness, version: versionOf('worker') },
  { name: 'ejm-ide', repo: repoOf.ide, version: versionOf('ide') },
  { name: 'ejm-ui', repo: repoOf.ui, version: undefined },
] as const;

export default function Download() {
  const installable = (['cli', 'worker'] as const).filter(p => versionOf(p));
  const unsigned = artifacts.filter(a => a.notarized !== true);
  const anyMac = unsigned.some(a => a.target.startsWith('darwin-'));
  const anyNotarized = unsigned.length < artifacts.length;
  return (
    <>
      <Hero title="Download." titleId="download-title">
        <p>Early releases from the lab. Install the command-line tools with one line, or download a file and check it yourself.</p>
      </Hero>

      <Section title="What is available.">
        {PRODUCTS.map(({ product, name }) => (
          <Section key={product} title={name}>
            <Facts>
              {TARGETS.map(([target, label]) => (
                <Fact key={target} label={label}>
                  <Cell product={product} target={target} />
                </Fact>
              ))}
            </Facts>
          </Section>
        ))}
        <Note>
          Linux x86_64 builds need glibc 2.39 or newer, for example Ubuntu 24.04 or Debian 13. ejm-cli also needs <InlineCode>libdbus-1</InlineCode>,
          and its stored sign-in needs a running Secret Service. If a program will not start, the system's own message names what is missing.
        </Note>
        <Facts>
          <Fact label="ejm-ui">
            {UI_PACKAGES_PUBLISHED ? (
              <InlineCode>npm install @ejm/ui @ejm/tokens react react-dom tailwindcss</InlineCode>
            ) : (
              <>
                Not yet available as packages. <ExternalLink href={`${UI_PROJECT.url}docs/`}>Build from source</ExternalLink> for now.
              </>
            )}
          </Fact>
        </Facts>
      </Section>

      <Section
        title="Install with one line."
        intro={<p>The script installs one file into <InlineCode>~/.local/bin</InlineCode>. It needs no administrator rights and does not edit your shell setup.</p>}
      >
        <ReadingColumn>
          {installable.length === 0 && <p>The install lines appear here when a release is published.</p>}
          {installable.map(product => (
            <CopyLine key={product} label={product === 'cli' ? 'ejm-cli' : 'ejm-harness worker'} command={installLine(product)} />
          ))}
          <Note>
            To read the script first, download <ExternalLink href="https://ejmlabs.com/install.sh">install.sh</ExternalLink>, then run{' '}
            <InlineCode>sh install.sh --dry-run cli</InlineCode> to see what it would do.
          </Note>
        </ReadingColumn>
      </Section>

      <Section title="Verify your download.">
        <Section title="By hand">
          <p>
            Download a file from the table, then compare its SHA-256 digest with the value beside it. On Linux run{' '}
            <InlineCode>sha256sum FILE</InlineCode>; on macOS run <InlineCode>shasum -a 256 FILE</InlineCode>. The same digests are in{' '}
            <ExternalLink href="https://ejmlabs.com/releases.json">releases.json</ExternalLink> and in each release's notes on GitHub.
          </p>
        </Section>
        <Section title="What the checksum shows">
          <p>
            A matching digest confirms that you received the file we published. It does not prove who built it. The digests and the install
            script come from this site and the files come from GitHub, so a swapped file is caught, but a change to this site would not be.
          </p>
        </Section>
        {(artifacts.length === 0 || unsigned.length > 0) && (
          <Section title="Unsigned builds">
            <p>
              {anyNotarized ? 'Builds not marked notarized' : 'These builds'} are not signed with a developer certificate and are not notarized. Your system may warn before opening them.
              {anyMac && ' On macOS, try to open the file, then choose Open Anyway in System Settings, Privacy and Security, and confirm.'}
            </p>
          </Section>
        )}
        <Section title="Who sees the download">
          <p>
            Files come from GitHub, which keeps its own request logs. This site counts visits as described on the{' '}
            <InlineLink href="/privacy/">privacy page</InlineLink> and sees nothing else.
          </p>
        </Section>
      </Section>

      <Section title="Report a problem." emphasis intro={<p>Reports go to each project's GitHub issues. Do not post security details in public.</p>}>
        <Facts>
          {reportProducts.map(({ name, repo, version }) => {
            const links = reportLinks(repo, version);
            return (
              <Fact key={name} label={name}>
                <Actions>
                  <Button variant="link" asChild>
                    <ExternalLink href={links.bug}>Report a bug</ExternalLink>
                  </Button>
                  <Button variant="link" asChild>
                    <ExternalLink href={links.feedback}>Send feedback</ExternalLink>
                  </Button>
                  <Button variant="link" asChild>
                    <ExternalLink href={links.security}>Report a vulnerability privately</ExternalLink>
                  </Button>
                </Actions>
              </Fact>
            );
          })}
        </Facts>
      </Section>
    </>
  );
}
