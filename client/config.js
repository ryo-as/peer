// load modules
const glob = require('glob');
const path = require('path');

// define project root directory
const PROJECT_ROOT_PATH = `${__dirname}/..`;
const EXTENSIONS = ['js', 'coffee', 'jsx', 'es6']

var entries = {};

glob.sync(`${__dirname}/script/*.es6`).forEach((file) => {
  entries[path.basename(file, path.extname(file))] = file;
});

module.exports = {
  context: __dirname,
  entry: entries,
  output: {
    path: `${PROJECT_ROOT_PATH}/public/javascripts`,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.(es6|jsx|js)$/,
        exclude: /node_modules/,
        loaders: 'babel-loader',
        query:{
          presets: ['react', 'es2016']
        }
      }
    ]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
};
