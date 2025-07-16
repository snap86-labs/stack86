// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import cloudflare from "@astrojs/cloudflare";


// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "stack86",
      plugins: [],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/snap86-labs/stack86",
        },
      ],
      sidebar: [
        {
          label: "Getting Started",
          autogenerate: { directory: "getting-started" },
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },

    imageService: "cloudflare",
  }),
});
