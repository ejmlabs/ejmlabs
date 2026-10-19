# ejmlabs redesign

Redesign and implement this site. The current result does not meet the owner's quality expectations. Use Sonnet 5.5 with max effort.

## Latest brief from the owner

- A minimal ejmlabs site with its original logo and one impressive solar scene.
- Deep space background.
- A realistic, cinematic Sun. The owner described the target as "Interstellar quality" and "from reality / a AAA game".
- A real three-dimensional model that visibly spins. Keep the camera stationary.
- Centre the solar disk and make its diameter about 75% of the shorter viewport dimension.
- The solar surface must be active and detailed, with convincing plasma motion, convection, magnetic structure and prominences.
- Use Three.js and whatever suitable libraries are needed. Rework the existing implementation freely where it improves the result.
- The owner rejected a projected NASA solar image with animated distortion as "hacky". Use a coherent three-dimensional surface and atmosphere that remain convincing throughout a full rotation.
- The earlier Mobius strip and flying camera concepts have been replaced by this Sun brief.
- Keep motion controlled and consistent. Preserve pause/resume, reduced motion support, responsive framing and a static fallback.
- Host on Cloudflare, with GCP only if needed. Domain: ejmlabs.com.

## Existing project

- Workspace: /Users/everettmorgan/Desktop/ejmlabs
- Website: site/
- Main Three.js scene: site/src/sun.js
- Procedural surface and volume shaders: site/src/solar-materials.js
- Instanced magnetic loops: site/src/magnetic-loops.js
- Build: cd site and run npm run build
- Checks: npm test
- Built static files: site/dist/
- Local preview is already served at http://127.0.0.1:4827/
- Cloudflare configuration: site/wrangler.jsonc
- A prior production deploy command was interrupted by the owner. Do not assume deployment completed. Focus this session on the redesign and its local preview.

## Brand source

Review ejmlabs_brand_guide.pdf and the extracted design-kit/ as needed. The kit contains the original vector logo paths, fonts, tokens, image variants, icon assets and a gallery. Preserve its accurate source assets and downloadable archive.

The visible paper logo is site/dist/assets/ejmlabs-paper.svg. The custom wordmark is vector artwork, not typed text. Keep the page composition minimal so the Sun carries the visual impact.

## Working rules

Never use em dashes. Use clear, plain writing. There is no openspec/ directory; work normally. Other agents have finished their changes, and you now own the site redesign. Keep edits within this project. Inspect the actual rendered result, refine it against the brief, and leave the local preview current with a successful build.
