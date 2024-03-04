const logger = require("./logger.js");

exports.secondLog = function () {
  logger.addLog("Second Log");
  logger.printNumLogs();
};
