//load heads
const TP_Plug = require('./tp-plug');
const Motion_Sensor = require('./motion-sensor');
const Util = require('./util');

const heads = [
    TP_Plug,
    Motion_Sensor,
    Util,
]

//maybe temporary, need a list of actions
const actions = {};
for(let head of heads) {
    for(let action of head.actions) {
        actions[`${head.name}.${action.name}`] = action
    }
}

module.exports = {
    heads,
    actions
}