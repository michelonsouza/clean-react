const {resolve} = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/main/index.tsx',
  devtool: 'inline-source-map',
  output: {
    path: resolve(__dirname, 'public', 'js'),
    publicPath: resolve(__dirname, 'public', 'js'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: resolve(__dirname, 'tsconfig.json'),
      }),
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ]
      }
    ]
  },
  devServer: {
    contentBase: resolve(__dirname, 'public'),
    writeToDisk: true,
    compress: true,
    historyApiFallback: true,
    port: 3000,
    open: true,
    liveReload: true,
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
};
