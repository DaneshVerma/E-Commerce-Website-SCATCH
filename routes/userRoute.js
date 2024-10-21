const express = require("express");
const router = express.Router();
const {registerUser, loginUser, logOutUser} =  require("../controllers/authController")

router.get("/", (req, res) => {
  res.send("hey its Users!!");
});

router.post("/register", registerUser);

router.post("/login", loginUser)

router.get("/logout", logOutUser)

module.exports = router;
