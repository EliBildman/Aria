
module.exports = (payload, param) => {
    let new_obj = JSON.parse(param);
    payload = {...payload, ...new_obj};
    return payload;
};
