import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugIn = {
  registerType: "prompt",
  includeAssets: [
    "favicon.ico",
    "apple-touc-icon.png",
    "maskable_icon.png",
    "android-chrome-192x192.png",
    "android-chrome-512x512.png",
    "add.png",
  ],
  manifest: {
    name: "LoCanjeamos",
    short_name: "LoCanjeamos",
    description: "Cambiá lo que tenés por algo que querés!",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "/maskable_icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    shortcuts: [
      {
        name: "Agregar",

        description: "Agrega un producto",

        url: "https://locanjeamos.com.ar/#/addProduct",

        icons: [
          {
            src: "/add.png",

            sizes: "96x96",
          },
        ],
      },
    ],
    theme_color: "#ffe66d",
    background_color: "#f0e7db",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
  base: "",
});
