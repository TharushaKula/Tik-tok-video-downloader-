import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

// Flat config (Next.js 16 dropped `next lint`; eslint runs directly).
// eslint-config-next/core-web-vitals bundles the TypeScript setup too.
export default defineConfig([
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  ...nextCoreWebVitals,
  {
    rules: {
      // The app deliberately reads localStorage in mount effects and mirrors
      // it into state (SSR-safe hydration pattern); the one extra render on
      // mount is intended, so this react-hooks v6 rule stays off.
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);
