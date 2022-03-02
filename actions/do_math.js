
module.exports.param = {
    "operator": "add&subtract&divide&multiply",
    "n": "*number",
    ">num": "*number",
    "<num": "*number",
}

module.exports.run = (payload, param) => {
    if (param.operator == 'add') {
        payload.num += param.n;
    } else if (param.operator == 'subtract') {
        payload.num -= param.n;
    } else if (param.operator == 'divide') {
        payload.num /= param.n;
    } else if (param.operator == 'multiply'){
        payload.num *= param.n;
    }
    return payload;
};