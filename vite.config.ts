import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { fileURLToPath } from 'node:url';

// `npm run build`         -> normal production build (BrowserRouter, real URLs)
// `npm run build:preview` -> one self-contained HTML file for quick client review
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    ...(mode === 'preview-single' ? [viteSingleFile()] : []),
  ],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: mode === 'preview-single'
    ? { outDir: 'dist-preview', assetsInlineLimit: 100_000_000 }
    : {
        outDir: 'dist',
        rollupOptions: {
          output: {
            manualChunks: (id: string) =>
              /node_modules\/(react|react-dom|scheduler|react-router|react-router-dom)\//.test(id) ? 'react'
              : /node_modules\/(motion|motion-dom|motion-utils|framer-motion)\//.test(id) ? 'motion'
              : undefined,
          },
        },
      },
}));
