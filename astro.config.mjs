import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
let devComponentIdPlugin;
try {
    ({ devComponentIdPlugin } = await import('./.phantomwp/ide/dev-tools.mjs'));
} catch {
    devComponentIdPlugin = () => ({ name: 'phantom-dev-tools-noop', apply: 'serve' });
}

export default defineConfig({
    integrations: [mdx(), sitemap(), react()],
    image: {
        service: { entrypoint: 'astro/assets/services/sharp' },
    },
    server: {
        host: true,
        allowedHosts: ['.app.github.dev', '.fly.dev'],
    },
    devToolbar: { enabled: false },
    vite: {
        plugins: [devComponentIdPlugin()],
        server: {
            headers: {
                'Content-Security-Policy': "frame-ancestors *",
            },
      allowedHosts: ['localhost', '.fly.dev'],
      cors: { origin: /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/ },
      hmr: {
        clientPort: 443,
        protocol: 'wss',
      },
      watch: {
        ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**', '**/.output/**'],
      },
        },
    },
});
