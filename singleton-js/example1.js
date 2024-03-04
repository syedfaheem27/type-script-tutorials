const logger = require("./logger.js");

exports.firstLog = function () {
  logger.addLog("First Log");
  logger.printNumLogs();
};
