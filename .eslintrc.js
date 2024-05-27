module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
  extends: [
    "next",
    "airbnb",
    "airbnb-typescript",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "turbo",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "import"],
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: ["apps/*/tsconfig.json", "packages/*/tsconfig.json"],
      },
    },
  },
  rules: {
    "import/prefer-default-export": 0,
    "newline-before-return": 2,
    "max-depth": [1, 4],
    "react/jsx-max-depth": [1, { max: 4 }],
    "@typescript-eslint/consistent-type-imports": 1,
    "@typescript-eslint/consistent-type-exports": 1,
    "@typescript-eslint/member-ordering": 1,
    "@typescript-eslint/method-signature-style": 1,
    "@typescript-eslint/no-import-type-side-effects": 1,
    "@typescript-eslint/require-array-sort-compare": 1,
    "@typescript-eslint/sort-type-constituents": 1,
    "@next/next/no-html-link-for-pages": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "react/destructuring-assignment": 0,
    "react/react-in-jsx-scope": 0,
    "@typescript-eslint/no-misused-promises": [
      2,
      {
        checksVoidReturn: false,
      },
    ],
    "react/require-default-props": 0,
    "react/jsx-props-no-spreading": 0,
    "no-console": [1, { allow: ["error"] }],
    "no-void": [2, { allowAsStatement: true }],
  },
  ignorePatterns: ["**/*.js", "**/*.json", "node_modules", "public", "styles", ".next", "coverage", "dist", ".turbo"],
};
