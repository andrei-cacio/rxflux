module.exports = {
	entry: ['./index.js'],
	output: {
		path: './dist',
		filename: 'index.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
	            exclude: /(node_modules|bower_components)/,
	            loader: 'babel-loader'
			}
		]
	}
}