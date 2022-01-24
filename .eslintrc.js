module.exports = {
  extends: [
    "react-app",
    "plugin:prettier/recommended",
    "plugin:cypress/recommended",
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
