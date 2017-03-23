module.exports = (root) => ({
	module: {
		loaders: [{
			test: /\.jade/,
			loaders: [
				`html-loader?root=${root}`,
				`pug-html-loader?${JSON.stringify({ doctype: 'html' })}`,
			],
		}],
	},
})
