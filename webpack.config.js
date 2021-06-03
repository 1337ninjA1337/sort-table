const path = require('path')
const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;
const filename = (ext) => isDev ?  `[name].${ext}` : `[name].[contenthash].${ext}`
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports ={
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: "./js/index.js",
    output: {
        filename: `./js/${filename('js')}`,
        path: path.resolve(__dirname, 'app')
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'app'),
        open: true,
        compress: true,
        hot: true,
        port: 3000,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }), 
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`})
    ],
    module: {
        rules: [
            {
            test: /\.css$/i,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader, 
                    options: {
                        hmr: isDev
                    }
                },
                'css-loader'],
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ]      
    }
}