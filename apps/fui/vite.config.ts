import { defineConfig, searchForWorkspaceRoot } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    root: __dirname,
    cacheDir: '../../node_modules/.vite/fui',
    plugins: [nxViteTsPaths(), react()],
    server: {
        port: 4200,
        host: 'localhost',
        fs: {
            allow: [
                // search up for workspace root
                // required in this monorepo to correctly find the
                // source directory
                searchForWorkspaceRoot(process.cwd())
            ]
        }
    },
    preview: {
        port: 4300,
        host: 'localhost'
    },
    // Configuration for building your library.
    // See: https://vitejs.dev/guide/build.html#library-mode
    build: {
        outDir: '../../dist/apps/fui',
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true
        }
    }
});
