const fs = require('fs');

const cache_file = "./actions/cache/value-cache.json"

//param: {payload_name: str, cache_name: str}
module.exports = (payload, param) => {
    let cache = JSON.parse( fs.readFileSync(cache_file) );
    param = JSON.parse(param)
    cache[param.cache_name] = payload[param.payload_name];
    fs.writeFileSync(cache_file, JSON.stringify(cache) );
    return payload;
}