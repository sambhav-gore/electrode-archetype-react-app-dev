"use strict";

/*
 * This partial adds DllReferencePlugin to the main bundle for referencing
 * DLL bundles.
 */

const fs = require("fs");
const glob = require("glob");
const webpack = require("webpack");
const archetype = require("electrode-archetype-react-app/config/archetype");
const Path = require("path");
const logger = require("electrode-archetype-react-app/lib/logger");

module.exports = function(options) {
  const config = options.currentConfig;
  logger.verbose("add-dll-references configurations", JSON.stringify(config, null, 2));

  try {
    const exists = fs.existsSync(Path.resolve(archetype.AppMode.src.client, "dll.config.js"));
    const filenames = glob.sync(Path.resolve("dll", "js", "*-manifest.*.json"));

    if (exists && filenames.length) {
      return {
        plugins: filenames.map(
          filename =>
            new webpack.DllReferencePlugin({
              context: config.context,
              manifest: require(filename) // eslint-disable-line global-require
            })
        )
      };
    }
  } catch (err) {
    logger.error("add-dll-references failed: %s", err);
  }

  return {};
};
