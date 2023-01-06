import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import svgrPlugin from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => {
      return {
        ...prev,
        ["process.env." + key]: `"${val}"`,
      };
    },
    {}
  );

  return {
    css: {
      preprocessorOptions: {
        scss: {
          importer(...args) {
            return {
              file: `${path.resolve(__dirname, "./src/**/*.scss")}`,
            };
          },
        },
      },
    },
    define: envWithProcessPrefix,
    plugins: [
      // Added to .storybook/webpack.config.js as well
      // as a module `moduleName.default()`
      tsconfigPaths(),

      react({
        exclude: ["**/node_modules/**", "**/vite.config.ts"],
        include: [
          "./vite.config.ts",
          "src/**/*.tsx",
          "src/**/*.ts",
          "src/**/*.jsx",
          "src/**/*.js",
        ],
      }),
      svgrPlugin({
        svgrOptions: {
          icon: true,
        },
      }),
    ],
  };
});
