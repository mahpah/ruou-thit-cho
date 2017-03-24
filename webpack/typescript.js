module.exports = configPath => ({
	module: {
		loaders: [{
			test: /\.ts$/,
			loaders: [
				`awesome-typescript-loader?configFileName=${configPath}`,
				'angular2-template-loader',
			],
			exclude: /node_modules/,
		}],
	},
})
