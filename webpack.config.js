const path = require('path');

const entryPath = path.join(__dirname, 'src', 'code.tsx');
console.log('Entry path:', entryPath);
console.log('Directory contents:', require('fs').readdirSync(path.join(__dirname, 'src')));

module.exports = {
  mode: 'production',
  entry: {
    code: entryPath
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'code.js',
    path: path.join(__dirname, 'dist')
  }
};