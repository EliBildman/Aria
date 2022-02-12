const PRINT_LOGS = true;

module.exports = (req, res, next) => {

    const time = new Date().toTimeString();
    const baseURL = 'http://' + req.headers.host + '/';
    const url = new URL(req.url, baseURL);

    if(PRINT_LOGS) console.log(`[LOG]: ${time} ${req.method} ${url.pathname}`);

    next();

};