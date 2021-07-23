
module.exports = (payload, param) => {
    let n = parseFloat(param)
    payload.num += n
    return payload;
};
