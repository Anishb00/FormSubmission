const path = require('path');
const SRC = path.join(__dirname + '/client/src');
const DST = path.join(__dirname + '/client/dist');


module.exports = {
  entry: `${SRC}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DST
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC,
        exclude:[/node_modules/],
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      }
    ]
  }
};