import { defineConfig } from 'vite';
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
    // Base public path when served in development or production
    base: './',
    plugins: [viteSingleFile()],
});