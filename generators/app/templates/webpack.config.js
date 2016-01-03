var webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path'),
  argv = require('yargs').argv;


var appPath = path.join(__dirname, 'app');
var appJsPath = path.join(appPath, 'app.js');


module.exports = {
  cache: true,
  debug: true,
  devTool: 'inline-source-map',
  watch:true,
  //devtool: 'sourcemap',
  entry: appJsPath,
  output: {
    path: path.join(__dirname, "www"),
    filename: "bundle-[hash:6].js"
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: [/app\/lib/, /node_modules/],
        loaders: ['eslint-loader', 'ng-annotate']
      }
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        exclude: [/app\/lib/, /node_modules/],
        loader: 'babel'
      },
      {
        test: /\.html$/,
        loader: 'raw'
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url'
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?mimetype=application/font-woff&prefix=fonts'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?mimetype=application/octet-stream&prefix=fonts'
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?mimetype=application/vnd.ms-fontobject&prefix=fonts'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?mimetype=image/svg+xml&prefix=fonts'
      }
    ]
  },
  resolve: {
    root: [
      path.join(__dirname, 'app'),
      path.join(__dirname, 'node_modules')
    ],
    alias: {
      ionic: [path.join(__dirname, 'node_modules/ionic-sdk/release/js/ionic.js')],
      ionicAngular: [path.join(__dirname, 'node_modules/ionic-sdk/release/js/ionic-angular.js')],
      formlyIonic : [path.join(__dirname,'node_modules', 'angular-formly-templates-ionic','dist','angular-formly-templates-ionic.js')],
      app: [path.join(__dirname, 'app')]
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(argv.env || 'development')
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject:'body'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
};
