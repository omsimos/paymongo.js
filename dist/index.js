"use strict";

if (process.env.NODE_ENV === "production") {
  module.exports = require("./paymongo-client.cjs.production.min.js");
} else {
  module.exports = require("./paymongo-client.cjs.development.js");
}
