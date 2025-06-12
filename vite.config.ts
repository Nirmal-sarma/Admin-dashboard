import { reactRouter } from "@react-router/dev/vite";
import { sentryReactRouter, type SentryReactRouterBuildOptions } from "@sentry/react-router";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const sentryConfig: SentryReactRouterBuildOptions = {
  org: "analytics-dashboard",
  project: "travel-analytics-dashboard",
  // An auth token is required for uploading source maps.
  authToken: "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"
  // ...
};



export default defineConfig(config => {
  return {
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(),sentryReactRouter(sentryConfig, config)],
  sentryConfig,
  ssr:{
    noExternal:[/@syncfusion/]
  }
  };
});
