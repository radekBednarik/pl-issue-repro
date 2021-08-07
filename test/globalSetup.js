"use strict";

const { getTomlConfig, writeContextState } = require("./utils");

// hardcoded here, since it will run in the container
// do not want to shuffle with ENV vars
const DEF = "urls.config.toml";

module.exports = async () => {
  process.env.DEF = JSON.stringify(getTomlConfig(DEF));
  writeContextState();
};
