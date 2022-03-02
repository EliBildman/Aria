
module.exports.param = {
    "key": "*string",
    "value": "*string",
    "type": "number&string&bool"
}

module.exports.run = (payload, param) => {
    if (param.type == 'number') param.value = parseFloat(param.value);
    if (param.type == 'bool') param.value = (param.value === 'true');
    payload[param.key] = param.value;
    return payload;
};
