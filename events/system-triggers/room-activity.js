const events = require("../events");

const inactivity_delay = 5; //mins
let active;
let inactivity_timeout;
let activity_lock = false;
const activity_lock_delay = 3000; //ms

const inactive = () => {
  events.run("room_inactive", {});
  active = false;
  activity_lock = true;
  setTimeout(() => {
    activity_lock = false;
  }, activity_lock_delay);
};

const set_active = () => {
  if (!activity_lock) {
    if (active) {
      clearTimeout(inactivity_timeout);
    } else {
      active = true;
      events.run("room_active", {});
    }
    inactivity_timeout = setTimeout(inactive, inactivity_delay * 1000 * 60); //* 1000 ms/s * 60 s/min
  }
};

const register = () => {
  events.on("POST /io/room-active", set_active);
};

module.exports = {
  register,
};
