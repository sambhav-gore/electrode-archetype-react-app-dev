"use strict";
/**
 * Webpack dev configuration
 */
const baseProfile = require("./profile.base");
const generateConfig = require("./util/generate-config");
const Path = require("path");

function makeConfig() {
  const devProfile = {
    partials: {
      _define: { order: 10100 },
      _dev: { order: 10200 },
      "_html-reporter": { order: 10300 } // must be after _dev to override devServer
    }
  };

  const options = {
    profiles: {
      _base: baseProfile,
      _dev: devProfile
    },
    profileNames: ["_base", "_dev"],
    configFilename: Path.basename(__filename)
  };

  return generateConfig(options);
}

module.exports = makeConfig();
