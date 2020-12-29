const fs = require('fs');
const { resolve } = require('path');
const { DefinePlugin } = require('webpack');
const dotenv = require('dotenv');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const getEnvironment = (env) => {
  const basePath = resolve(__dirname, '.env');
  const envPath = `${basePath}.${env.NODE_ENV}`;
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  return Object.entries(fileEnv).reduce((accumulator, [key, value]) => {
    accumulator[`process.env.${key}`] = JSON.stringify(value);

    return accumulator;
  }, {});
}

module.exports = env => {
  const environment = getEnvironment(env);

  return {
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
      ],
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
          ],
        },
      ],
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
    plugins: [new CleanWebpackPlugin(), new DefinePlugin(environment)],
  };
};
