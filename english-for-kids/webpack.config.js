const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SRC = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist'
    },
    module: {
        rules:[ 
        {
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: {
                   minimize: false
                }
            }]
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node-modules/'
        },
        {
            test: /\.mp3$/,
            include: SRC,
            loader: 'file-loader'
        },
        {
            test: /\.css$/,
            use: [
              'style-loader',
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              }, {
                loader: 'postcss-loader',
                options: { sourceMap: true, config: { path: './postcss.config.js' } }
              }
            ]
        },
        {
            test: /\.scss$/,
            use: [
              'style-loader',
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              }, {
                loader: 'postcss-loader',
                options: { sourceMap: true, config: { path: './postcss.config.js' } }
              }, {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
        },
        {
            test: /\.(jpe?g|png|svg|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  outputPath: 'img',
                  name: '[name].[ext]'
                }},
              {
                loader: 'image-webpack-loader',
                options: {
                  bypassOnDebug : true,
                  mozjpeg: {
                    progressive: true,
                    quality: 75
                  },
                  // optipng.enabled: false will disable optipng
                  optipng: {
                    enabled: false,
                  },
                  pngquant: {
                    quality: [0.65, 0.90],
                    speed: 4
                  },
                  gifsicle: {
                    interlaced: false,
                    optimizationLevel: 1
                  },
                  // the webp option will enable WEBP
                  webp: {
                    quality: 75
                  }
                }
              }
            ]
          },
          {
            test: /\.(woff|woff2|ttf|otf|eot)$/,
            use: [{
              loader: 'file-loader',
              options: {
                outputPath: 'fonts'
              }
            }]
          }    
    ]
    },
    devServer: {
        overlay: true
    }
}