"use strict";

const notifyBundleValid = require("../util/notify-bundle-valid");
const WebpackReporter = require("electrode-webpack-reporter");

module.exports = function(options) {
  if (!process.env.HTML_WEBPACK_REPORTER_OFF) {
    const reporter = new WebpackReporter();

    reporter.apply(options.currentConfig);
    reporter.on("report", reporterOptions => {
      if (reporterOptions.state && !reporterOptions.stats.hasErrors()) {
        notifyBundleValid();
      }
    });
  }
};
