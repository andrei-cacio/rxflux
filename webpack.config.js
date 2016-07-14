module.exports = {
	entry: ['./index.js'],
	output: {
		path: './dist',
		filename: 'main.js'
	},
  	devtool: 'source-map',
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
