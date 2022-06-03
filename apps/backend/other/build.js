const path = require('path')

const fsExtra = require('fs-extra')
const glob = require('glob')

const pkg = require('../package.json')

const here = (...s) => path.join(__dirname, ...s)

const allFiles = glob.sync(here('../src/**/*.*'), {
  ignore: ['**/tsconfig.json', '**/eslint*', '**/__tests__/**'],
})

const entries = []
for (let file of allFiles) {
  if (/\.(ts|js|tsx|jsx)$/.test(file)) {
    entries.push(file)
  } else {
    let dest = file.replace(here('../src'), here('../dist'))
    fsExtra.ensureDir(path.parse(dest).dir)
    fsExtra.copySync(file, dest)
    console.log(`copied: ${file.replace(`${here('../src')}/`, '')}`)
  }
}

console.log()
console.log('building...')

require('esbuild')
  .build({
    entryPoints: glob.sync(here('../src/**/*.+(ts|js|tsx|jsx)')),
    outdir: here('../dist'),
    target: [`node${pkg.engines.node}`],
    platform: 'node',
    format: 'cjs',
    logLevel: 'info',
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
