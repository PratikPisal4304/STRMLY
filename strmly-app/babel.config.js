module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // IMPORTANT: reanimated/plugin must be the last plugin listed.
      'react-native-reanimated/plugin',
    ],
  };
};