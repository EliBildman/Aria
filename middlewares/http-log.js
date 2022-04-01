const { ManagerLogger } = require('../loggers');

const logger = ManagerLogger('HTTP');

module.exports = (req, _res, next) => {
    const baseURL = 'http://' + req.headers.host + '/';
    const url = new URL(req.url, baseURL);

    logger.verbose(`${req.method} ${url.pathname}`);

    next();
};
