const webpack = require('webpack')
const merge = require('webpack-merge')
const HTMLWebpackTemplate = require('html-webpack-plugin')
const root = require('./webpack/helpers').root(__dirname)
const devServer = require('./webpack/dev-server')
const typescript = require('./webpack/typescript')
const pug = require('./webpack/pug')
const sass = require('./webpack/sass')
const file = require('./webpack/file')
const production = require('./webpack/production')

const DEV_PORT = process.env.DEV_PORT || 8000

module.exports = (env = {}) => {
	const context = root('./src')
	const entry = {
		example: './example/index.ts',
	}

	const output = {
		filename: 'index.js',
		chunkFilename: '[id].part.js',
		path: root('./build'),
		pathinfo: !env.prod, // should include path name comment for every import
	}

	const resolve = {
		extensions: ['.ts', '.js', '.json'],
		modules: [
			root('src'),
			'node_modules',
		],
	}

	const plugins = [
		new HTMLWebpackTemplate({
			template: 'example/index.html',
		}),

		/**
		 * get rid of critical import warning
		 * from https://github.com/angular/angular/issues/11580
		 */
		new webpack.ContextReplacementPlugin(
			// The (\\|\/) piece accounts for path separators in *nix and Windows
			/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
			root('./src') // location of your src
		),
	]

	const config = merge(
		{
			context,
			resolve,
			entry,
			output,
			plugins,
			devtool: 'source-map',
		},
		devServer(DEV_PORT),
		typescript('tsconfig.json'),
		pug(root('example')),
		sass(),
		file(env),
		production(env)
	)

	return config
}
