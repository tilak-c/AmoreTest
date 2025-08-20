// logger/logger.js
const winston = require('winston');
const {
  errorTransport,
  combinedTransport,
  consoleTransport,
} = require('./transports');

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ level, message, timestamp, ...meta }) =>
    `${timestamp} [${level.toUpperCase()}]: ${message}${Object.keys(meta).length ? ' ' + JSON.stringify(meta) : ''}`
  )
);

const logger = winston.createLogger({
  format:logFormat,
  transports: [
    errorTransport,
    combinedTransport,
    consoleTransport,
  ],
});

module.exports = logger;