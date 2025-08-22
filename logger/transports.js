// logger/transports.js
const winston = require('winston');
require('winston-daily-rotate-file');
require('dotenv').config();
const fs = require('fs');

// Ensure logs folder exists
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const rotationTime = process.env.LOG_ROTATION_TIME || '1d';
const logLevel = process.env.LOG_LEVEL || 'info';

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    ({ level, message, timestamp }) => `${timestamp} [${level.toUpperCase()}]: ${message}`
  )
);

const errorTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  frequency: rotationTime,
//   format: logFormat,
});

const combinedTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  level: logLevel,
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  frequency: rotationTime,
//   format: logFormat,
});

const consoleTransport = new winston.transports.Console({
  level: logLevel,
  format: winston.format.combine(
    winston.format.colorize(),
    // logFormat
  ),
});

module.exports = {
  errorTransport,
  combinedTransport,
  consoleTransport,
};