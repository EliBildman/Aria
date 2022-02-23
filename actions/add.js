
module.exports.param = {
    "num": "_number"
}

module.exports.run = (payload, param) => {
    payload.num += param.n
    return payload;
};