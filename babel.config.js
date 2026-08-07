module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: { '@': './src' },
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
      },
    ],
    'react-native-worklets/plugin',
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
