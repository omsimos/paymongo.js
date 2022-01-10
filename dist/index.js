
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./paymongo.js.cjs.production.min.js')
} else {
  module.exports = require('./paymongo.js.cjs.development.js')
}
