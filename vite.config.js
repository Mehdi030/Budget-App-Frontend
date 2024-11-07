// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [vue()], // Vue Plugin für die Unterstützung von .vue Dateien
    server: {
        port: 3000,     // Ändere den Port auf 3000 (oder einen anderen gewünschten Port)
        host: 'localhost',     // Zugriff über Netzwerk ermöglichen
        open: true      // Öffnet automatisch im Standardbrowser
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // Alias für einfacheren Zugriff auf den src Ordner
        }
    },
    build: {
        outDir: 'dist', // Ausgabeordner für das gebaute Projekt
        sourcemap: true // Erstellt Sourcemaps für einfacheres Debugging
    }
});