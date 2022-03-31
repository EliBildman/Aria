const motion_sensor = require("../heads/motion-sensor");

const io_socket = (io) => {
  io.on("connection", (socket) => {
    socket.on("REGISTER", (config) => {
      if (config.type === "MOTION_SENSOR") {
        motion_sensor.take_new_connection(socket, config);
        socket.emit("REGISTERED");
      }
    });

    socket.on("foo", (data) => {
      console.log("foo recieved");
    });
  });
};

module.exports = io_socket;
