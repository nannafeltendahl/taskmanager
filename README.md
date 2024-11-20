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



/*Installation 
Følg disse trin for at installere og køre applikationen:/*
# Task Manager

    1. **clone repositorie **:
sh git clone https://github.com/nannafeltendahl/taskmanager.git
    cd task-manager
    

2. Installer pakker
Brug npm til at installere alle nødvendige pakker:
sh npm install
   

3. Start applikationen
sh npm start
    

Applikationen vil nu køre på http://localhost:3000.


Projektstruktur
En oversigt over projektets struktur:

 
taskmanager/
│
├── src/
│   ├── components/         # Alle React komponenter
│   │   ├── ConfirmationsDialog.tsx
│   │   ├── CreateTask.tsx
│   │   ├── Footer.tsx
│   │   ├── Task.tsx
│   │   └── Header.tsx

│   │
│   ├── font/            
│   │   ├── Open_Sans
│   ├── images/            
│   │   ├── diamondbackground.svg
│   │ 
│   │
│   ├── App.tsx  
│   ├── App.css  # css styling 
│   ├── main.tsx  # Hoved fil til at rendere React komponenter
│   ├── types.tsx   # TypeScript typer og interfaces
│   └── index.html 
/
 */


