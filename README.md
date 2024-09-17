## Live demo Video - [https://drive.google.com/file/d/19a4aFq1zim8aFCjcridj260qaEB4CEpK/view?usp=sharing](https://drive.google.com/file/d/19a4aFq1zim8aFCjcridj260qaEB4CEpK/view?usp=sharing)

## Pendulum Oscillation Simulator built using Vite, React, and TypeScript.

### It simulates the motion of a pendulum in two scenarios:

- Ideal Case: A theoretical scenario where the pendulum experiences no friction or air resistance, allowing it to swing indefinitely.
- Real Case with Damping: A more realistic scenario where the pendulum's motion is affected by a damping coefficient, simulating energy loss due to friction or air resistance, eventually bringing the pendulum to rest.

The use of Vite allows for fast development and optimized builds, while React manages the user interface, providing real-time visualization of the pendulum's motion. TypeScript ensures type safety, improving code quality and reducing bugs. The simulation likely allows users to adjust parameters such as length, mass, gravity, and the damping coefficient to see how these affect the oscillation behavior in both the ideal and real cases.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
