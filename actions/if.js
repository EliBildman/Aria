module.exports.param = {
    "field": "*string",
    "operator": ">&<&=",
    "value": "*number"
}

module.exports.run = (payload, param) => {
    const op = param.operator;
    if(op === '>' && !(payload[param.field] > param.value)) payload.END_RUN = true; 
    if(op === '<' && !(payload[param.field] < param.value)) payload.END_RUN = true; 
    if(op === '=' && !(payload[param.field] === param.value)) payload.END_RUN = true; 
    return payload;
};
