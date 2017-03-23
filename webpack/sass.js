const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { removeEmpty } = require('./helpers')

module.exports = (externalStyle) => ({
	module: {
		loaders: removeEmpty([
			{
				test: /\.scss/,
				loaders: [
					'css-to-string-loader',
					'css-loader?-minimize',
					'resolve-url-loader',
					'sass-loader?sourceMaps',
				],
				exclude: externalStyle,
			},
			!!externalStyle ? {
				test: /\.scss/,
				loader: ExtractTextPlugin.extract([
					'css-loader',
					'resolve-url-loader',
					'sass-loader?sourceMap',
				]),
				include: externalStyle,
			} : undefined,
			{
				test: /\.css/,
				loader: ExtractTextPlugin.extract([
					'css-loader',
					'resolve-url-loader',
				]),
				include: externalStyle,
			},
		]),
	},

	plugins: [
		new ExtractTextPlugin('[name].css'),
	],
})
