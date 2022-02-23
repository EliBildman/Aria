
module.exports.param = {
    "?field": "_string",
    "?msg": "_string",
}

module.exports.run = (payload, param) => {
    if(param.field) {
        console.log('[Print]:', payload[param.field]);
    } else if (param.msg) {
        console.log('[Print]:', param.msg)
    } else {
        console.log('[Print]:', payload);
    }
    return payload;
};
