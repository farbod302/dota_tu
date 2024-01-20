const express = require("express")
const router = express.Router()
const Tournament = require("../db/tournament")
const res_handler = require("../helper/res_handler")
const { uid } = require("uid")


router.post("/new_tournament", (req, res) => {
    const tournament_id = uid(8)
    new Tournament({ ...req.body, tournament_id,created_at:Date.now() }).save()
    res_handler.response(res, "تورنومنت با موفقیت اضافه شد", { tournament_id })
})


module.exports = router