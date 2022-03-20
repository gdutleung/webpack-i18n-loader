const path = require('path');

module.exports = {
  mode: "development",
  entry: './src/index.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'lib'),
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-typescript"],
          }
        }],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};