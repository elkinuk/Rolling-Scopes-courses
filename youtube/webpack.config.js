const NODE_ENV = process.env.NODE_ENV || 'dev';

module.exports = {
    context: __dirname + "/js",
    entry: "./entry",
    output: {
        path: __dirname + '/src',
        filename: "bundle.js",
        library: "bundle"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: [/node_modules/],
            use: [{
                loader: 'babel-loader',
                options: { 
                    presets: ['es2015'] 
                },
            }],
        }]
    },
    watch: NODE_ENV == 'dev',
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: NODE_ENV == 'dev' ? "source-map" : null
};
