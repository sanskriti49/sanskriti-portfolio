import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules/framer-motion")) {
						return "motion";
					}
					if (id.includes("node_modules/gsap") || id.includes("node_modules/@gsap")) {
						return "animation";
					}
					if (id.includes("node_modules/lucide-react") || id.includes("node_modules/react-icons")) {
						return "icons";
					}
					if (id.includes("node_modules/ogl")) {
						return "webgl";
					}
					if (id.includes("node_modules/three") || id.includes("node_modules/@react-three") || id.includes("node_modules/postprocessing")) {
						return "three-dither";
					}
				},
			},
		},
	},
});
