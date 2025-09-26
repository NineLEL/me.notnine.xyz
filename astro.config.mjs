import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	integrations: [icon()],
	vite: {
    plugins: [tailwindcss()]
  }
});
