const { removeEmpty } = require('./helpers')

module.exports = (env) => ({
	module: {
		loaders: [{
			test: /\.json$/,
			loader: 'json-loader',
		}, {
			test: /\.(woff|woff2|ttf|eot|ico)$/,
			loader: env.dev ? 'url-loader?name=assets/[name].[hash].[ext]' :
												'url-loader?limit=50',
		}, {
			test: /\.(jpe?g|png|gif|svg)$/i,
			loaders: removeEmpty([
				'file-loader?name=[name].[ext]',
			]),
		}],
	},
})
