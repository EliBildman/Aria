//load heads
const TP_Plug = require("./tp-plug");
const Motion_Sensor = require("./motion-sensor");
const Util = require("./util");
const Scripts = require("./scripts");
const Email = require("./email");

const heads = [TP_Plug, Motion_Sensor, Util, Scripts, Email];

//maybe temporary, need a list of actions / events
const actions = {};
const events = [];
for (let head of heads) {
  for (let action of head.actions) {
    actions[`${head.name}.${action.name}`] = action;
  }
  for (let event of head.events) {
    events.push(`${head.name}.${event}`);
  }
}

module.exports = {
  heads,
  actions,
  events,
};
