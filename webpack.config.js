var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './client');
var APP_DIR = path.resolve(__dirname, './public');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader',
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
        use: {
          loader: 'file-loader',
          // options: {
          //   name: 'http://18.219.35.229:80/assets/[name].[ext]'
          // }
        }
      }
    ]
  }
};

module.exports = config;
