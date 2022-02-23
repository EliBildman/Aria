const fs = require('fs');
const cache_file = "./actions/cache/value-cache.json"

module.exports.param = {
    "cache_name": "_string",
    "payload_name": "_string",
}

//param: {cache_name: str, payload_name: str}
module.exports.run = (payload, param) => {
    let cache = JSON.parse( fs.readFileSync(cache_file) );
    payload[param.payload_name] = cache[param.cache_name];
    return payload;
}