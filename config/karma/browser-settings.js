"use strict";

const archetype = require("electrode-archetype-react-app/config/archetype");
const logger = require("electrode-archetype-react-app/lib/logger");

module.exports = function(settings) {
  const browser = archetype.karma.browser.toLowerCase();
  if (browser === "chrome") {
    settings.browsers = ["ChromeHeadless"];

    logger.info("Using Chrome Headless to run Karma test");
  } else if (browser === "phantomjs") {
    settings.frameworks.push("phantomjs-shim");
    settings.browser = ["PhantomJS"];

    logger.warn(
      "Using PhantomJS to run Karma test. It's been deprecated and may be removed in the future."
    );
  } else {
    logger.error(`Unknown browser ${browser} set for Karma test. Failed.`);
    return process.exit(1);
  }

  return settings;
};
