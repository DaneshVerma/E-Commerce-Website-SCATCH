const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners-model");
const dbgr = require("debug")("development: owner");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owner = await ownerModel.find();
    if (owner.length > 0) {
      return res
        .status(503)
        .send("You dont have any permission to create any new owner");
    }

    let { fullname, email, password } = req.body;

    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });
    res.send(createdOwner).status(201);
  });

  router.get("/", (req, res) => {
    res.send("hey its Owners!!");
  });

  dbgr(process.env.NODE_ENV);
}

module.exports = router;
