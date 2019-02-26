"use strict";

const xsh = require("xsh");
const partialConfigs = require("../partial");
const WebpackConfigComposer = require("webpack-config-composer");
const optionalRequire = require("optional-require")(require);
const Path = require("path");
const _ = require("lodash");
const logger = require("electrode-archetype-react-app/lib/logger");

/* eslint-disable max-statements */
function generateConfig(options) {
  const composer = new WebpackConfigComposer();
  composer.addProfiles(options.profiles);
  composer.addPartials(partialConfigs.partials);

  let customConfig;
  const customDirs = [process.cwd(), Path.resolve("archetype/config/webpack")];

  const foundDir = customDirs.find(d => {
    customConfig = optionalRequire(Path.join(d, options.configFilename));
    return !!customConfig;
  });
  if (foundDir) {
    const dir = xsh.pathCwd.replace(foundDir);
    logger.info(`Custom webpack config ${options.configFilename} loaded from ${dir}`);
  } else {
    const dirs = customDirs.map(d => xsh.pathCwd.replace(d)).join("; ");
    logger.info(`No custom webpack config ${options.configFilename} found in dirs ${dirs}`);
  }

  const keepCustomProps = options.keepCustomProps;
  const compose = () => composer.compose({ keepCustomProps }, options.profileNames);

  let config;

  if (customConfig) {
    if (_.isFunction(customConfig)) {
      config = customConfig(composer, options, compose);
    } else {
      config = _.merge(compose(), customConfig);
    }
  } else {
    config = compose();
  }

  logger.verbose("Final Webpack config", JSON.stringify(config, null, 2));

  return config;
}

module.exports = generateConfig;
