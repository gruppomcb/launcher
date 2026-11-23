import { copyFileSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));
const appVersion = JSON.parse(readFileSync(resolve(projectRoot, "package.json"), "utf8")).version;

export default defineConfig({
  plugins: [
    {
      name: "copy-common-apps-json",
      apply: "build",
      closeBundle() {
        copyFileSync(
          resolve(projectRoot, "common-apps.json"),
          resolve(projectRoot, "dist", "common-apps.json"),
        );
      },
    },
    {
      name: "write-app-version",
      apply: "build",
      closeBundle() {
        writeFileSync(resolve(projectRoot, "dist", "version"), `${appVersion}\n`);
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(projectRoot, "index.html"),
        release: resolve(projectRoot, "release", "index.html"),
        privacy: resolve(projectRoot, "privacy", "index.html"),
        terms: resolve(projectRoot, "terms", "index.html"),
      },
    },
  },
});
