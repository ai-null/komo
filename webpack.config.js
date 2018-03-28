const {join} = require('path')

module.exports = {
    entry: join(__dirname, 'sauce', 'index.js'),
    output: {
        path: join(__dirname, 'assets', 'js'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }]
    }
}