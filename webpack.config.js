module.exports = {
  entry: {
     // This is the "main" file which should include all other modules
    entry: './client/main.js',
  },
  output: {
    // To the `dist` folder
    // path: './dist',
    // publicPath: 'dist/',
    path: './client/dist',
    publicPath: 'client/dist/',
    filename: 'build.js',
  },
  resolve: {
    // NPM by default installs Runtime Only version, which will not compile html templates
    alias: {
      // this is the solution.
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  module: {
    loaders: [
      {
        // Ask webpack to check: If this file ends with .js, then apply some transforms
        test: /\.js$/,
        // Transform it with babel
        loader: 'babel',
        // don't transform node_modules folder (which don't need to be compiled)
        exclude: /node_modules/
      },
      {
        // Looks for .vue files to complie into js, html, css
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },
  vue: {
    loaders: {
      js: 'babel'
    }
  }
};
