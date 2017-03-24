const path = require('path')
const merge = require('webpack-merge')
const pkg = require('./package.json')
const webpack = require('webpack')
const context = path.resolve(__dirname, './src')
const entry = {
	index: './index.ts',
}
const resolve = {
	extensions: ['.ts', '.js', '.json'],
}

/* eslint-disable */
let externals = [
	...Object.keys(pkg.devDependencies),
	...Object.keys(pkg.dependencies)
]
	.reduce(
		(memo, key) =>
			Object.assign(memo, { [key]: key }),
		{}
	)
externals['rxjs/Observable'] = 'rxjs/Observable'
externals['rxjs/Subject'] = 'rxjs/Subject'
externals['rxjs/ReplaySubject'] = 'rxjs/ReplaySubject'
/* eslint-enable */

const loaders = [{
	test: /\.ts$/,
	loaders: [
		'awesome-typescript-loader?configFileName=tsconfig.build.json',
		'angular2-template-loader',
	],
	exclude: /node_modules/,
}, {
	test: /\.jade/,
	loaders: [
		`html-loader?root=${root}`,
		`pug-html-loader?${JSON.stringify({ doctype: 'html' })}`,
	],
}, {
	test: /\.scss/,
	loaders: [
		'css-to-string-loader',
		'css-loader?-minimize',
		'resolve-url-loader',
		'sass-loader?sourceMaps',
	],
}]

const plugins = [
	new webpack.ContextReplacementPlugin(
		// The (\\|\/) piece accounts for path separators in *nix and Windows
		/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
		path.resolve(__dirname, './src') // location of your src
	),
]

const common = {
	context,
	entry,
	resolve,
	externals,
	module: {
		loaders,
	},
	plugins,
}

const buildOutput = {
	output: {
		library: pkg.name,
		libraryTarget: 'umd',
		filename: '[name].js',
		chunkFilename: '[id].part.js',
		path: path.resolve(__dirname, './dist'),
	},
}

module.exports = (env = {}) => {
	if (env.build) {
		return merge(
			common,
			buildOutput
		)
	}
}
