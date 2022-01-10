const { createJestConfig } = require("tsdx/dist/createJestConfig");
const { paths } = require("tsdx/dist/constants");

module.exports = createJestConfig(undefined, paths.appRoot);
