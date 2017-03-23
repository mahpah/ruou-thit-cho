module.exports = () => ({
	module: {
		loaders: [{
			test: /\.ts$/,
			loaders: [
				'awesome-typescript-loader',
				'angular2-template-loader',
			],
			exclude: /node_modules/,
		}],
	},
});
