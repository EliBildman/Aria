// const leds = require(join(__dirname, 'led-controller'));
const bulb_controller = require("./bulb-controller");
const plug_controller = require("./plug-controller");

const get_device = (info, devices) => {
  for (d of devices) {
    if (matches_fields(info, d)) return d;
  }
};

const get_all_lights = () => {
  return bulb_controller
    .get_bulbs()
    .concat(plug_controller.get_plugs((_function = "LIGHT")));
};

const run_on_all = (callback, only_bulbs = false) => {
  const bulbs = bulb_controller.get_bulbs();
  const plugs = plug_controller.get_plugs((_function = "LIGHT"));
  let promises = [];

  for (b of bulbs) promises.push(callback(b));

  if (!only_bulbs) {
    for (p of plugs) {
      promises.push(callback(p));
    }
  }

  return Promise.all(promises);
};

const get_lights_on = () => {
  return get_states().then((states) => {
    for (s of states) if (s) return true;
  });
};

const set_all = (color) => {
  return run_on_all((bulb) => {
    bulb.set(color);
  }, (only_bulbs = true));
};

const all_on = (trans = 1000) => {
  return run_on_all((light) => {
    light.on();
  });
};

const all_off = (trans = 1000) => {
  return run_on_all((light) => {
    // console.log(light.name);
    light.off();
  });
};

const get_states = () => {
  return run_on_all((light) => light.get()); //add leds when they work lmao
};

const turn_on = (info) => {
  d = get_device(info, get_all_lights());
  return d.on();
};

const turn_off = (info) => {
  d = get_device(info, get_all_lights());
  return d.off();
};

const get = (info) => {
  d = get_device(info, get_all_lights());
  return d.get();
};

const set = (info, color) => {
  d = get_device(info, get_all_lights());
  return d.set(color);
};

const take_scene = (scene) => {
  let promises = [];

  for (config in scene.smartlights) {
    d = get_device({ name: config.name });

    if (config.is_on) {
      if (config.is_on) promises.push(d.set(config.color));
    } else {
      promises.push(d.turn_off());
    }
  }

  return Promise.all(promises);
};

const connect_led = (ws) => {
  leds.new_strip(ws);
};

module.exports = {
  get_lights_on,
  set_all,
  all_off,
  all_on,
  get_states,
  turn_on,
  turn_off,
  get,
  set,
  take_scene,
  connect_led,
  // pingPong,
  // randomRipple,
  // cascadeOn,
  // cascadeLightMiddle,
};
