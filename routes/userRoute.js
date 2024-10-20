const express = require('express');
const router = express.Router()

router.get("/", (req, res)=>{
    res.send("hey its Users!!")
})

module.exports = router