
module.exports.param = {
    "?field": "*string",
    "?msg": "*string",
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
