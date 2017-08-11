import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';


export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
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
      inject: true
    }),
    // eliminate duplicate package when generating bundle
    new webpack.optimize.DedupePlugin(),
    // Minify js
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style', 'css']}
    ]
  }
}
