//{
//  feild?: string,
//  msg?: string
//}
module.exports = (payload, param) => {
    if(param.feild) {
        console.log('[Print]:', payload[param.feild]);
    } else if (param.msg) {
        console.log('[Print]:', param.msg)
    } else {
        console.log('[Print]:', payload);
    }
    return payload;
};
