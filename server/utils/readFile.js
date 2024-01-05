const { readFileSync } = require('fs')

const readFile = asset => JSON.parse(readFileSync(asset))

module.exports = readFile
