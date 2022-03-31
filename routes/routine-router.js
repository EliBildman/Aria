const e = require("express");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const routine_manager = require("../managers/routine-manager");

const routine_path = "configs/routines.json";
const events_path = "configs/events.json";
const schedule_path = "configs/schedules.json";

router.get("/", (req, res) => {
  let routines = routine_manager.get_routines();

  const baseURL = "http://" + req.headers.host + "/";
  const url = new URL(req.url, baseURL);
  const ID = url.searchParams.get("ID");

  if (ID == null) {
    //if no ID provided, return all routined events
    res.json(routines);
  } else {
    const event = routines.find((r) => r.ID == ID);
    res.json(event);
  }
});

router.post("/", (req, res) => {
  const method = req.body.method;

  if (method == "create") {
    routine_manager.create_routine(req.body.routine);
  } else if (method == "update") {
    routine_manager.update_routine(req.body.ID, req.body.routine);
  } else if (method == "delete") {
    routine_manager.delete_routine(req.body.ID);
  } else if (method == "run") {
    const ID = req.body.ID;
    routine_manager.run_routine(ID);
  }

  res.status(200);
  res.end();
});

module.exports = router;
