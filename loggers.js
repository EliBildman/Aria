const { createLogger, format, transports } = require('winston');

//exports catagories of loggers as functions that produce given logger

const HeadLogger = (name) => {
    return createLogger({
        level: 'debug',
        defaultMeta: { category: 'head' },
        transports: [
            new transports.File({
                format: format.combine(
                    format.label({ label: name, message: false }),
                    format.timestamp({ format: 'MM:DD:YYYY HH:mm:ss' }),
                    format.json()
                ),
                filename: `./${process.env.LOG_FILE}`,
            }),
            new transports.Console({
                format: format.combine(
                    format.label({ label: name, message: true }),
                    format.printf((log) => log.message)
                ),
            }),
        ],
    });
};

module.exports = {
    HeadLogger,
};
