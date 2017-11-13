const autoprefixer =require('autoprefixer');
const webpack =require('webpack');
const path =require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
//const ExtractTextPlugin  =require('extract-text-webpack-plugin');

module.exports={
	entry:{
		main:'./src/index.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		publicPath:'/',
		filename:'static/js/bundle.js',
		chunkFilename:'static/js/[name].chunk.js'
	},
	resolve:{
		extensions:['.js','.json']

	},
	module:{
		loaders:[
			{
				test:/\.js[x]?$/,
				exclude: /node_modules/,
				loader:'babel-loader?presets[]=es2015&presets[]=react'
			},
			{
				test:/\.(scss|css)$/,
				use:[
					{
						loader:'style-loader',
					},
					{
						loader:'css-loader',
						options:{
							importLoaders:1,
						}
					},
					{
						loader:'sass-loader'
					},
					{
						loader:'postcss-loader',
						options:{
							plugins:(loader)=>[
								require('autoprefixer')(),
							]
						}
					}
				]
			},
			{
				test:/\.(png|jpg)$/,
				loader:'url-loader?limit=10000',
			},
			{
				test:/\.(woff|eot|ttf|svg|gif)$/,
				loader:'file-loader?name=iconfont/[path][name].[ext]'
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:path.join(__dirname,'src/index.html'),
			inject:true
		}),
		new webpack.HotModuleReplacementPlugin(),
		new OpenBrowserPlugin({url:'http://localhost:9999'})
	],
	devServer:{
		contentBase:'./src/',
		historyApiFallback:true,
		hot:true,
		inline:true,
		port:9999
	}
}