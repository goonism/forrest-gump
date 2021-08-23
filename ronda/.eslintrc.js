module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  ignorePatterns: ["node_modules/*", "out", "dist", "**/*.d.ts"],
  extends: ["../.eslintrc"],
  plugins: ["@typescript-eslint"],
  env: {
    es6: true
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    // We will use TypeScript's types for component props instead
    "react/prop-types": "off",

    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/consistent-type-imports": 2,
    // This rule is not compatible with Next.js's <Link /> components
    "jsx-a11y/anchor-is-valid": "off"
  }
}
