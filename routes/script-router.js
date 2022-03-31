const express = require("express");
const router = express.Router();
const fs = require("fs");
const script_manager = require("../managers/script-manager");

router.get("/", (req, res) => {
  saved_scripts = script_manager.get_scripts();

  const baseURL = "http://" + req.headers.host + "/";
  const url = new URL(req.url, baseURL);
  const ID = url.searchParams.get("ID");

  if (ID == null) {
    //if no ID provided, return all saved_scripts
    res.json(saved_scripts);
  } else {
    const script = saved_scripts.find((ev) => ev.ID == ID);
    res.json(script);
  }
});

router.post("/", (req, res) => {
  const method = req.body.method;

  if (!method && req.files) {
    //create
    script_manager.add_script(req.files.script_upload);
  } else if (method == "delete") {
    script_manager.delete_script(req.body.ID);
  } else if (method == "run") {
    script_manager.run_script(req.body.ID);
  }

  res.status(200);
  res.end();
});

module.exports = router;
