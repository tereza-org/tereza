const { babelConfig } = require('@ttoss/config');

module.exports = babelConfig({
  presets: ['next/babel'],
  plugins: ['relay'],
});
