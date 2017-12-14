  const path = require('path');
  const assert = require('assert');

  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const InterpolateHtmlPlugin = require('interpolate-html-plugin');

  assert(process.env.NODE_ENV, 'NODE_ENV environment variable must be set!')
  assert(process.env.API_ROOT, 'API_ROOT environment variable must be set!')

  module.exports = {
    entry: './src/ts/index.tsx',
    devtool: 'inline-source-map',
    module: {
      rules: [
        // Typescript lint
        {
          test: /\.(tsx|ts)$/,
          enforce: 'pre',
          loader: 'tslint-loader',
          include: path.join(__dirname, 'src/ts'),
          exclude: /node_modules/,
          options: {
            tsConfigFile: 'tsconfig.json',
          }
        },
        // Typescript build
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ],
        }
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build')
    },
    plugins: [
      new InterpolateHtmlPlugin({
        API_ROOT: process.env.API_ROOT,
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: './src/html/index.html',
      }),
    ],
  };
