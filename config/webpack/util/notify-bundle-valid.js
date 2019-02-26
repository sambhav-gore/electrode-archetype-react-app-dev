"use strict";

const Fs = require("fs");
const Path = require("path");
const archetype = require("electrode-archetype-react-app/config/archetype");

module.exports = function notifyBundleValid() {
  setTimeout(() => {
    Fs.writeFileSync(Path.resolve(archetype.eTmpDir, "bundle.valid.log"), `${Date.now()}`);
  }, 100);
};
