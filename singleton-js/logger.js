class Logger {
  constructor() {
    if (!Logger.instance) {
      this.logs = [];
      Logger.instance = this;
    }
    return Logger.instance;
  }

  addLog(log) {
    this.logs.push(log);
    console.log(`Fancy logger : ${log}`);
  }

  printNumLogs() {
    console.log(`The total number of logs is ${this.logs.length}`);
  }
}

const logger = new Logger();
Object.freeze(logger);

module.exports = logger;
