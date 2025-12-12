module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // otros plugins si tienes...
      'react-native-reanimated/plugin', // Asegúrate de que esta línea esté presente
    ],
  };
};