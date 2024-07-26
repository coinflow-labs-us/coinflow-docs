const webpack = require('webpack');

module.exports = {
  // Other configuration options...
  resolve: {
    fallback: {
      "url": require.resolve("url/")
    }
  },
  // Other configuration options...
};
