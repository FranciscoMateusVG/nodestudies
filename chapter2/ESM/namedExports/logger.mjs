export function log(message) {
  console.log(message)
}

export const DEFAULT_LEVEL = 'info'

export const LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3
}

export class Logger {
  constructor({ level = DEFAULT_LEVEL } = {}) {
    this.level = level
  }

  log(message, level = 'info') {
    if (LEVELS[level] <= LEVELS[this.level]) {
      log(`[${level}] ${message}`)
    }
  }
}
