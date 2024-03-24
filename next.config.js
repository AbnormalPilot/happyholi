module.exports 
  ={
    webpack(config, options) {
        config.module.rules.push({
            test: /\.(wav)$/,
            use: {
              loader: 'file-loader',
              options: {
                publicPath: '/_next/static/sounds/',
                outputPath: 'static/sounds/',
                name: '[name].[ext]',
                esModule: false,
              },
            },
          });
      return config;
    },
  }