import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMD5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';


export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    // generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),
    // Hash the files using md5 so that their names change when content changes.
    new WebpackMD5Hash(),
    // use commonschunkplugin to create a seperate bundle
    // of vendor libraries so that they're cached seperately.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // create html file that includes reference to bundled js.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
     // minify: {
      //  removeComments: true,
     //   colapseWhitespace: true,
      //  removeRedundantAttributes: true,
      //  useShortDoctype: true,
      //  removeEmptyAttributes: true,
     //   removeStyleLinkTypeAttributes: true,
     //   keepClosingSlash: true,
      //  minifyJS: true,
      //  minifyCSS: true,
      //  minifyURLs: true
    //  },
      inject: true,
      // properties you define here are available in index.html
      //using htmlwebpackplugin.options.varname
      trackJSToken:'e24adc9a278f42a2baac04abf0cff77e'
    }),
    // eliminate duplicate package when generating bundle
    new webpack.optimize.DedupePlugin(),
    // Minify js
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}
