const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: './public/res/js/main.js',
    vendors: ['angular', 'angular-route', 'angular-animate', 'angular-ui-bootstrap']
  },
  output: {
    filename: './public/dist/js/app.bundle.js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: 'css-loader'
      })
    },
    {
      test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
      loader: 'url-loader'
    }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name:'vendors', filename:'./public/dist/js/vendor.bundle.js'}),
    new ExtractTextPlugin('./public/dist/css/style.bundle.css')
  ]
}
