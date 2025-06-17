const { createLogger, format, transports } = require('winston');
const path = require('path');

const logFormat = format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level.toUpperCase()} - $ {message}`;
});

const logger = createLogger({
    level:'info',
    format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [
        new transports.Console({
            format: format.combine(format.colorize(), logFormat)   
        }),

        //Fichier pour les erreurs
        new transports.File({
            filename: path.join(__dirname,  '../logs/error.log'),
            level: 'error',
            format: format.combine(format.timestamp(), logFormat)
        }),
        // Fichier pour toutes les infos
        new transports.File({
            filename: path.join(__dirname, '../logs/combined.log'),
            format: format.combine(format.timestamp(), logFormat)
        })
    ],
    exitOnError: false
});

module.exports = logger;
