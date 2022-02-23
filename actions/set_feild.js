
module.exports.param = {
    "key": "_string",
    "value": "_any"
}

module.exports.run = (payload, param) => {
    payload[param.key] = param.value;
    return payload;
};
