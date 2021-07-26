const fs = require('fs');

const cache_file = "./actions/cache/value-cache.json"

//param: {cache_name: str, payload_name: str}
module.exports = (payload, param) => {
    let cache = JSON.parse( fs.readFileSync(cache_file) );
    payload[param.payload_name] = cache[param.cache_name];
    return payload;
}