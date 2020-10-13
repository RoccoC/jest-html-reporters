const { BufferedConsole } = require('@jest/console')
const { addMsg } = require('./helper')

class ReporterConsoleBuffer extends Array {
  push(...logs) {
    logs.forEach((log) => {
      if (log.message.indexOf('[jest-html-reporters]') !== 0) {
        addMsg(log)
      }
    })
    return super.push(...logs)
  }
}

class ReporterConsole extends BufferedConsole {
  constructor(getSourceMaps) {
    super(getSourceMaps)
    this._buffer = new ReporterConsoleBuffer()
  }
}

const captureConsole = () => {
  // override console to intercept logs
  global.console = new ReporterConsole(global.console['_getSourceMaps'])
}

module.exports = {
  captureConsole,
}
