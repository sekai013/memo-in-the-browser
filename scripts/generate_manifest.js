const packageVersion = require('../package.json').version
const manifest = require('../src/manifest.json')

manifest.version = packageVersion

require('fs').writeFileSync(
  require('path').resolve(__dirname, '../dist/manifest.json'),
  JSON.stringify(manifest, null, 2)
)
