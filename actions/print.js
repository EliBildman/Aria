
module.exports = (payload, param) => {
    if(param) {
        console.log(payload[param]);
    } else {
        console.log(payload);
    }
    return payload;
};
