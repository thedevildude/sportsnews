import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default ({ mode }) => {
  return defineConfig({
    build: {
      outDir: 'build',
    },
    plugins: [
      react(), VitePWA({
        devOptions: {
          enabled: true,
        },
        manifest: {
          name: "Sports Center Application",
          short_name: "Sports Center",
          description: "Sports Center Application",
          icons: [
            {
              src: "/icons/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/icons/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
            {
              src: "icons/apple-touch-icon.png",
              sizes: "180x180",
              type: "image/png",
            },
            {
              src: "icons/favicon-16x16.png",
              sizes: "16x16",
              type: "image/png",
            },
            {
              src: "icons/favicon-32x32.png",
              sizes: "32x32",
              type: "image/png",
            },
            {
              src: "icons/favicon.ico",
              sizes: "48x48",
              type: "image/png",
            },
          ],

  }}),
    ],
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
    },
    mode: "production",
  });
};