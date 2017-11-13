const autoprefixer =require('autoprefixer');
const webpack =require('webpack');
const path =require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin  =require('extract-text-webpack-plugin');
const shell =require('shelljs');
const fs =require('fs-extra');
const removeAssetsPath =path.join(path.resolve(__dirname,'./dist'),'static');
shell.rm('-rf',removeAssetsPath);
shell.mkdir('-p',removeAssetsPath);
shell.config.silent=true;
shell.cp('-R','static/*',removeAssetsPath);
shell.config.silent=false;
module.exports={
	entry:{
		main:'./src/index.js',
		vendor:[
			'react','react-dom','react-router'
		]
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		publicPath:'/',
		filename:'static/js/[name].[hash:8].js',
		chunkFilename:'static/js[name].[hash:8].chunk.js'
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
				loader:ExtractTextPlugin.extract(
						{
							fallback:'style-loader',
							use:[
							{
								loader:'css-loader',
								options:{
									importLoaders:1,
									minimize:true
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
							}]
						}
					)
			
			},
			{
				test:/\.(png|jpg)$/,
				loader: 'url-loader?limit=10000&name=images/[hash:8].[name].[ext]'
			},
			{
				test:/\.(woff|eot|ttf|svg|gif)$/,
				loader:'url-loader',
				query:{
					limit:10000,
					name:'static/img/[name.[hash:8].[ext]'
				}
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:path.join(__dirname,'src/index.html'),
			inject:true,
			 minify: {
		        removeComments: true,
		        collapseWhitespace: true,
		        removeRedundantAttributes: true,
		        useShortDoctype: true,
		        removeEmptyAttributes: true,
		        removeStyleLinkTypeAttributes: true,
		        keepClosingSlash: true,
		        minifyJS: true,
		        minifyCSS: true,
		        minifyURLs: true,
		      }
		}),
		new ExtractTextPlugin({
			filename:'static/css/vendor.[hash].css'
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name:'verndor.[hash]',
			filename:'static/js/vendor.[hash:8].bundle.js'
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
		        warnings: false
		     },    
			minimize:true
		})
	]
}
fs.copy('./src/reset.css','./dist/reset.css')
fs.copy('./src/tang-men.ico','./dist/tang-men.ico')