import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { ejmSite } from '@ejm/site/vite';
import { ejmSsg } from '@ejm/ssg/vite';

// ejmSite adds the shared head tags and writes theme-boot.js, the icons and _headers. ejmSsg prerenders every route.
// The ejm-ui packages are linked from the sibling checkout, so React must resolve to one copy.
export default defineConfig({
  resolve: { dedupe: ['react', 'react-dom'] },
  plugins: [tailwindcss(), react(), ejmSite({ project: 'ejmlabs' }), ejmSsg({ site: 'src/site.tsx' })],
  build: { target: 'es2022', cssMinify: 'lightningcss' },
});
