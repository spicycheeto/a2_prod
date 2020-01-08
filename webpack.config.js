const webpack = require('webpack');
const path = require( "path" );

module.exports = {
  context: path.join( __dirname, "./src" ),
  entry: {

    index: "./UnauthorizedClient.js",
    authindex:"./client.js"


  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          //"sass-loader"//  compiles Sass to CSS, using Node Sass by default
        ]
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.resolve( __dirname, "dist" ),
    filename: "[name].bundle.js",

    //path: __dirname + '/dist',
    //publicPath: '/',
    //filename: 'bundle.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
 }
},
 plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};

/*PRIOR to optimization: (splitChunks)
Built at: 01/18/2019 5:35:39 AM
          Asset     Size  Chunks             Chunk Names
index.bundle.js  222 KiB       0  [emitted]  index
Entrypoint index = index.bundle.js
 [2] ./store.js + 2 modules 21.4 KiB {0} [built]
     | ./store.js 10.1 KiB [built]
     | ./api.js 10.8 KiB [built]
     |     + 1 hidden module
 [4] ../node_modules/react-redux/es/index.js + 18 modules 29 KiB {0} [built]
     |    19 modules
[33] ./UnauthorizedClient.js + 31 modules 111 KiB {0} [built]
     | ./UnauthorizedClient.js 552 bytes [built]
     | ./routes/clientRoutes/unauthorizedRoutes.js 1.2 KiB [built]
     |     + 30 hidden modules
    + 45 hidden modules
*/
