import {
  AssetGrid,
  BrandAsset,
  PaletteSwatch,
  SectionBody,
} from '@ejm/ui/layout/SiteContent';
import { Band } from '@ejm/ui/layout/Band';
import { Fact, Facts } from '@ejm/ui/layout/Facts';
import { Row, Rows } from '@ejm/ui/layout/Rows';
import { SectionHead } from '@ejm/ui/layout/SectionHead';
import { Button } from '@ejm/ui/components/ui/button';
import brandPalette from '@ejm/tokens/assets/brand/palette.json';

const downloads = [
  {
    title: 'Brand kit',
    href: '/ejmlabs-design-kit.zip',
    description:
      'ejmlabs and project logos, SVG and PNG exports, social assets, templates, fonts with their licenses, a palette and a short usage guide.',
    meta: 'ZIP',
  },
  {
    title: 'Artwork and swag concepts',
    href: '/ejmlabs-swag-kit.zip',
    description:
      'Eight SVG masters, a size and source manifest, three concept previews and a guide to preparing a supplier sample. No merchandise is offered for sale.',
    meta: 'ZIP',
  },
];
const palette = (['sage', 'forest', 'ink', 'paper', 'mist'] as const).map(
  (name) => [name, brandPalette.colors[name]] as const,
);
const projects = [
  { name: 'cli', height: 1179 },
  { name: 'ide', height: 1016 },
  { name: 'harness', height: 548 },
];

export default function BrandContent() {
  return (
    <>
      <Band tone="paper" aria-labelledby="brand-title">
        <SectionHead
          as="h1"
          purpose="page"
          title="Logos, colors and artwork."
          id="brand-title"
        >
          <p>
            Files and guidance for identifying ejmlabs and its projects. Choose
            an approved logo, keep its proportions and clear space, and read the
            rights notice before using it.
          </p>
        </SectionHead>
        <SectionBody>
          <AssetGrid>
            <BrandAsset
              background="paper"
              src="/design-kit/logos/ejmlabs-primary.svg"
              alt="ejmlabs primary logo on Paper"
              width={600}
              height={103}
              caption="Primary logo for light backgrounds."
              action={
                <Button variant="link" asChild>
                  <a href="/design-kit/logos/ejmlabs-primary.svg" download>
                    Primary SVG
                  </a>
                </Button>
              }
            />
            <BrandAsset
              background="ink"
              src="/design-kit/logos/ejmlabs-paper.svg"
              alt="ejmlabs Paper logo on Ink"
              width={600}
              height={103}
              caption="Paper logo for dark backgrounds."
              action={
                <Button variant="link" asChild>
                  <a href="/design-kit/logos/ejmlabs-paper.svg" download>
                    Paper SVG
                  </a>
                </Button>
              }
            />
          </AssetGrid>
        </SectionBody>
      </Band>

      <Band tone="sage" aria-labelledby="downloads-title">
        <SectionHead title="Choose a kit." id="downloads-title">
          <p>
            Both downloads include a public guide and the existing artwork
            rights notice. Font licenses travel with the fonts. Downloading a
            kit does not grant a new license to the marks.
          </p>
        </SectionHead>
        <SectionBody>
          <Rows aria-label="Downloads">
            {downloads.map((d) => (
              <Row
                key={d.href}
                title={d.title}
                href={d.href}
                description={d.description}
                meta={d.meta}
              />
            ))}
          </Rows>
        </SectionBody>
      </Band>

      <Band tone="paper" aria-labelledby="project-marks-title">
        <SectionHead title="Identify the project." id="project-marks-title">
          <p>
            Use a project's horizontal logo when naming it. Standalone marks and
            square icons are included for small spaces where the name is already
            clear.
          </p>
        </SectionHead>
        <SectionBody>
          <AssetGrid>
            {projects.map(({ name: project, height }) => (
              <BrandAsset
                key={project}
                background="paper"
                src={`/design-kit/projects/${project}/logo-primary.svg`}
                alt={`ejm-${project} primary logo`}
                width={2400}
                height={height}
                caption={`ejm-${project}`}
                action={
                  <Button variant="link" asChild>
                    <a
                      href={`/design-kit/projects/${project}/logo-primary.svg`}
                      download
                    >
                      Project SVG
                    </a>
                  </Button>
                }
              />
            ))}
          </AssetGrid>
        </SectionBody>
        <SectionBody>
          <Facts>
            <Fact label="SVG">
              Use the outlined vector files for sharp output at any size. They
              need no installed font.
            </Fact>
            <Fact label="PNG">
              Use the matching raster export when a tool cannot import SVG.
            </Fact>
            <Fact label="variants">
              Choose Primary or Ink on light backgrounds and Paper on dark ones.
              Keep the supplied colors.
            </Fact>
            <Fact label="small sizes">
              Use a prepared favicon, avatar or square icon. Keep its canvas
              intact.
            </Fact>
          </Facts>
        </SectionBody>
      </Band>

      <Band tone="mist" aria-labelledby="palette-title">
        <SectionHead title="Two fonts, five colors." id="palette-title">
          <p>
            Sage leads, Forest is an accent, and Ink, Paper and Mist carry text
            and surfaces. Use Manrope for text and IBM Plex Mono for code and
            short labels.
          </p>
        </SectionHead>
        <SectionBody>
          <Facts>
            {palette.map(([name, hex]) => (
              <Fact key={name} label={name}>
                <PaletteSwatch color={name}>{hex}</PaletteSwatch>
              </Fact>
            ))}
            <Fact label="contrast">
              Use Ink on Paper or Sage, Paper on Forest, or Forest on Mist for
              normal text. Sage on Paper does not meet WCAG AA for normal text.
            </Fact>
            <Fact label="fonts">
              Manrope 400 and 600; IBM Plex Mono 500. The kit includes TTF and
              WOFF2 files with their SIL Open Font License notices.
            </Fact>
          </Facts>
        </SectionBody>
      </Band>

      <Band tone="paper" aria-labelledby="usage-title">
        <SectionHead title="Keep the artwork intact." id="usage-title">
          <p>
            Do not redraw, retype, stretch or add effects to a logo. Allow clear
            space outside the artwork and check contrast at the size people will
            see it.
          </p>
        </SectionHead>
        <SectionBody>
          <Facts>
            <Fact label="full logo">
              Leave at least half the symbol's height clear on every side of the
              ejmlabs logo.
            </Fact>
            <Fact label="standalone mark">
              Leave one quarter of the mark's width clear on every side.
            </Fact>
            <Fact label="project logo">
              Leave half the project mark's height around its horizontal logo.
              Square icons and favicons include their own clear space.
            </Fact>
            <Fact label="artwork rights">
              All rights are reserved except where a file or its notice grants a
              separate license. Public access does not grant a right to use the
              marks or redistribute the kit. Ask a maintainer for permission
              beyond those rights.
            </Fact>
            <Fact label="software">
              The MIT licenses of ejm-cli, ejm-ide and ejm-harness are separate
              from the artwork rights.
            </Fact>
            <Fact label="swag concepts">
              Mockups are visual concepts, not verified physical samples or
              products for sale. The SVGs are starting artwork for supplier
              sampling, not approved production dielines or embroidery files.
            </Fact>
          </Facts>
        </SectionBody>
      </Band>
    </>
  );
}
