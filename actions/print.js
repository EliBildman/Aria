
module.exports = (payload, param) => {
    if(param.feild) {
        console.log(payload[param.feild]);
    } else if (param.msg) {
        console.log(param.msg)
    } else {
        console.log(payload);
    }
    return payload;
};
