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

Sh (shell script, udføres i terminalen)

/*Installation 
Følg disse trin for at installere og køre applikationen:/*
# Task Manager

1. Clone repository 

git clone https://github.com/nannafeltendahl/taskmanager.git
cd taskmanager
    

2. Install dependencies
Brug npm til at installere alle nødvendige pakker:
npm install
   

3. Start applikationen
npm start
    

Applikationen vil nu køre på http://localhost:3000. (ctr + left click on the URL)


Projektstruktur
En oversigt over projektets struktur:

 
taskmanager/
│
├── src/
│   ├── components/ # Alle React komponenter
│   │   ├── ConfirmationsDialog.tsx
│   │   ├── CreateTask.tsx
│   │   ├── Footer.tsx
│   │   ├── Task.tsx
│   │   └── Header.tsx

│   │
│   ├── font/            
│   │   ├── Open_Sans
│   ├── images/            
│   │   ├── diamondbackground.svg mm.
│   │ 
│   │
│   ├── App.tsx  
│   ├── App.css  # css styling 
│   ├── main.tsx  # Hoved fil til at rendere React komponenter
│   ├── types.tsx   # TypeScript typer og interfaces
│   └── index.html 
/
 */

Min task manager fuktioner:
Oprette opgaver: Brugeren kan tryppe på en ny task, og tilføje overskrift og tekst
Redigere opgaver: Brugeren kan trykke på den grønne redigeringspen, og ændre i teksten, prioritet og kategori
Slet opgaver: Brugeren kan slette opgaver, ved at trykke på den røde skraldespand
Nastaturnavigation: Jeg har tilføjet tastaturnavigation for at appen er inkluderende og tilgøngelig for alle brugere. 
LocalStoage: Jeg har brugt localStage så brugeren kan gemme sine opgaver ved opdateringer af siden på sin lokale enhed. 

Teknologier anvendt: 
React
Typescript
css
HTML 


