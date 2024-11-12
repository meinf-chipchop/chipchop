npx create-expo-app@latest ./
npx create-expo-app@latest --name "MyApp" --template blank
npm start

npm install nativewind
npm install --save-dev tailwindcss@3.3.2
npx tailwindcss init

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./<custom directory>/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

```javascript
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["nativewind/babel"], // Add this line
  };
};
```

```typescript
// In the root directory create a file called nativewind-env.d.ts
/* eslint-disable prettier/prettier */
/// <reference types="nativewind/types" />
```

npm install react-native-safe-area-context

```javascript
// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

npx expo start -c
npx expo lint

```javascript
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};

// Delete `␍`eslintprettier/prettier error 
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
```

npx expo install -- --save-dev prettier eslint-config-prettier eslint-plugin-prettier

npm i react-native-swiper
npx expo install expo-image-picker
npm i react-native-paper