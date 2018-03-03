var {join} = require('path')

module.exports = {
    entry: join(__dirname, 'assets/js', 'index.js'),
    output: {
        path: join(__dirname, 'assets/js'),
        filename: 'bundle.js'
    },
    modules: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }]
    }
}