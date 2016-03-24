var fs = require('fs');
var babelrc = fs.readFileSync('./.babelrc');
var babelLoaderQuery = JSON.parse(babelrc);

module.exports = {
  context: __dirname + '/../src',
  entry: './client.js',
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader?' + JSON.stringify(babelLoaderQuery)]
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.scss$/,
        loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: __dirname + '/dist'
  }
};