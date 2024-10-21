const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    let { email, fullname, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (user) {
      req.flash("error", "Already have account !!");
      res.redirect("/");
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          if (err) return res.send(err.message);
          else {
            let user = await userModel.create({
              email,
              password: hash,
              fullname,
            });
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/shop");
          }
        });
      });
    }
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email: email });
  if (!user) {
    req.flash("error", "Email or Password is Wrong!");
    res.redirect("/");
  } else {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = generateToken(user);
        res.cookie("token", token).status(200).redirect("/shop");
      } else {
        res.status(401).redirect("/shop");
      }
    });
  }
};

module.exports.logOutUser = async (req, res) => {
  req.flash("error", "Logged Out Sucessfully.");
  res.cookie("token", "").redirect("/");
};
