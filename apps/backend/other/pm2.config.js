module.exports = {
  apps: [
    {
      name: 'Server',
      script: ['node', '--inspect', './index.js']
        .filter(Boolean)
        .join(' '),
      watch: ['./index.js', './src/**/*.ts', './.env'],
      env: {
        NODE_ENV: process.env.NODE_ENV ?? 'development',
        FORCE_COLOR: '1',
      },
    },
  ],
}
