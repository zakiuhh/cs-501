import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // Vercel preset - output must go to .vercel/output so Vercel's Build Output API v3 picks it up.
  // serverDir must be functions/__server.func so it matches the route dest "/__server" in config.json.
  nitro: {
    preset: "vercel",
    output: {
      dir: ".vercel/output",
      serverDir: ".vercel/output/functions/__server.func",
      publicDir: ".vercel/output/static",
    },
  },
});
