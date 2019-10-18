// Webpack uses this to work with directories
const path = require('path');

// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {

  // Path to your entry point. From this file Webpack will begin his work
  entry: './src/javascript/index.js',

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on final bundle. For now we don't need production's JavaScript 
  // minifying and other thing so let's set mode to development
  mode: 'development',

  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                presets: ['@babel/preset-env']
                }
            }
        },
        {
            // Apply rule for .sass, .scss or .css files
            test: /\.(sa|sc|c)ss$/,
        
            // Set loaders to transform files.
            // Loaders are applying from right to left(!)
            // The first loader will be applied after others
            use: [
                {
                    // This loader resolves url() and @imports inside CSS
                    loader: "css-loader",
                },
                {
                    // Then we apply postCSS fixes like autoprefixer and minifying
                    loader: "postcss-loader"
                },
                {
                    // First we transform SASS to standard CSS
                    loader: "sass-loader",
                    options: {
                        implementation: require("sass")
                    }
                }
            ]
        }
    ]
  }
};