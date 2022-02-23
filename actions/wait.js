
module.exports.param = {
    "ms": "_number",
}

module.exports.run = (payload, param) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(payload);
        }, param.ms);
    });
};
