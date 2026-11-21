import { copyFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

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
  ],
});
