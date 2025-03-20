module.exports = {
  // presets: ['module:metro-react-native-babel-preset'],
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ts', '.tsx'],
        alias: {
          '~': './',
        },
      }
    ],
    '@babel/plugin-transform-class-static-block',
    'react-native-reanimated/plugin'
  ]
};
