"use strict";
/**
 * Webpack coverage configuration
 */
const baseProfile = require("./profile.base");
const testBaseProfile = require("./profile.base.test");
const generateConfig = require("./util/generate-config");
const Path = require("path");

function makeConfig() {
  const testProfile = {
    partials: {
      "_sourcemaps-inline": { order: 10100 }
    }
  };

  const options = {
    profiles: {
      _base: baseProfile,
      "_test-base": testBaseProfile,
      _test: testProfile
    },
    profileNames: ["_base", "_test-base", "_test"],
    configFilename: Path.basename(__filename)
  };

  return generateConfig(options);
}

module.exports = makeConfig();
