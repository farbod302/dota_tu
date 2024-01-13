const express = require("express")
const router = express.Router()
const User=require("../db/users")
const res_handler = require("../helper/res_handler")


router.get("/profile",async (req, res) => {
    const { user_id } = req.body
    const selected_user=await User.findOne({user_id})
    res_handler.response(res,"",{user:selected_user})
})


module.exports = express.Router