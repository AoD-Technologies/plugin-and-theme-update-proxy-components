module.exports = {
  env: {
    test: {
      presets: ['babel-preset-react-app']
    },
    production: {
      presets: [
        [
          '@babel/preset-env',
          {
            bugfixes: true,
            modules: false
          }
        ],
        [
          '@babel/preset-react',
          {
            runtime: 'automatic'
          }
        ]
      ],
      plugins: [
        '@babel/plugin-transform-react-constant-elements',
        'babel-plugin-transform-dev-warning',
        [
          'babel-plugin-transform-react-remove-prop-types',
          {
            mode: 'unsafe-wrap'
          }
        ],
        [
          '@babel/plugin-transform-runtime',
          {
            useESModules: true
          }
        ]
      ],
      ignore: [
        /@babel[\\|/]runtime/, // Fix a Windows issue.
        /\.test\.js$/
      ]
    }
  }
}
