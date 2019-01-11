const path = require('path')
const butternut = require('rollup-plugin-butternut')

const resolve = p => path.resolve(__dirname, '../', p)

module.exports = {
  input: 'index.js',
  output: {
    name: 'ts',
    file: resolve('dist/time-slicing.min.js'),
    format: 'iife'
  },
  plugins: [butternut()]
}
