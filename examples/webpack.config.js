const fs = require('fs')
const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const entry = {
  index: path.join(__dirname, 'index.ts')
}
const HtmlWebpackPlugins = [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, './index.html'),
    filename: 'index.html',
    chunks: ['index']
  })
]

let entries = fs.readdirSync(path.join(__dirname, 'samples'))
entries.forEach(example => {
  entry[example] = path.join(__dirname, `samples/${example}/${example}.ts`)
  HtmlWebpackPlugins.push(
    new HtmlWebpackPlugin({
      template: path.join(__dirname, `samples/${example}/${example}.html`),
      filename: `${example}.html`,
      chunks: [example]
    })
  )
})


module.exports = {
  mode: 'development',
  entry: entry,
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: '127.0.0.1',
    port: 8888,
    open: true,
    hot: true
  },
  plugins: [
    ...HtmlWebpackPlugins,
    new webpack.HotModuleReplacementPlugin()
  ]
}
