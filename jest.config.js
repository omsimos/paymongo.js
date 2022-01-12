const { createJestConfig } = require("tsdx/dist/createJestConfig");
const { paths } = require("tsdx/dist/constants");
const dotenv = require("dotenv");
dotenv.config();

module.exports = createJestConfig(undefined, paths.appRoot);
