const {join} = require('path')

module.exports = {
    entry: join(__dirname, 'components', 'index.container.js'),
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