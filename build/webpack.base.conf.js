var webpack = require('webpack'),
  ENV = require('./config/ENV'),
  PATHS = require('./config/PATHS'),
  styleRules = require('./config/style-rules'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  NyanProgressPlugin = require('nyan-progress-webpack-plugin');

module.exports = {
  entry: {
    app: PATHS.SRC.join('app.js')
  },
  // devtool - source map 配置详见 http://webpack.github.io/docs/configuration.html#devtool
  devtools: false,
  output: {
    path: PATHS.DIST,
    publicPath: ''
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {
      // 自定义路径别名
      vue: 'vue/dist/vue.js',
      MOCK: PATHS.MOCK,
      '@': PATHS.SRC
    }
  },
  resolveLoader: {
    root: PATHS.ROOT.join('node_modules')
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      loader: 'babel!eslint',
      include: PATHS.SRC,
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.(png|jpe?g|gif)$/,
      loader: 'file-loader?name=images/[name].[ext]'
    }, {
      test: /\.(woff|woff2|eot|ttf|svg)(\?\S*)?$/,
      loader: 'url?limit=100000&name=[name].[ext]'
    }].concat(styleRules.basic)
  },
  vue: {
    loaders: Object.assign({
      js: 'babel!eslint'
    }, styleRules.vueLoader)
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  plugins: [
    new NyanProgressPlugin(), // 进度条
    new webpack.DefinePlugin(Object.assign({
      'process.env.NODE_ENV': JSON.stringify(ENV.__ENV__)
    }, ENV)),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: PATHS.SRC.join('index.html')
    })
  ]
};
