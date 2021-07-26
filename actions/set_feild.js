
module.exports = (payload, param) => {
    payload = {...payload, ...param};
    return payload;
};
