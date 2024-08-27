import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  pluginReact.configs.flat.recommended,
  {
    ignores: ["node_modules", "babel.config.js"],
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
);
