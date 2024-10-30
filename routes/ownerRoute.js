const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners-model");
const dbgr = require("debug")("development: owner");
const bcrypt = require("bcrypt");
if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owner = await ownerModel.find();
    if (owner.length > 0) {
      return res
        .status(503)
        .send("You dont have any permission to create any new owner");
    }

    let { fullname, email, password } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash){
        let createdOwner = await ownerModel.create({
          fullname,
          email,
          password: hash
        })
        res.send(createdOwner).status(201);
      })
    })

  });

  router.get("/admin", (req, res) => {
    let success = req.flash("success")
    res.render("createproducts", {success});
  });

  dbgr(process.env.NODE_ENV);
}

module.exports = router;
