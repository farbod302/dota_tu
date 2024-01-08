const express = require("express")
const sms_handler = require("../helper/sms_handler")
const res_handler = require("../helper/res_handler")
const router = express.Router()
const User = require("../db/users")
const { uid } = require("uid")
var shortHash = require('short-hash');
const JWT = require("../helper/jwt")

router.post("/send_code", async (req, res) => {
    const { phone, log_in } = req.body
    const is_valid_phone = sms_handler.phone_validator(phone)
    if (!is_valid_phone) return res_handler.reject(res, "0")
    const is_already_exist = await User.findOne({ "identity.phone": phone })
    if (is_already_exist && !log_in) return res_handler.reject(res, "4")
    if (!is_already_exist && log_in) return res_handler.reject(res, "7")
    sms_handler.send_new_code(phone)
    res_handler.response(res, "کد تایید برای شما ارسال شد", {})
})

router.post("/sign_up", async (req, res) => {
    const { name, phone, code, dota_id, password, user_name, info, signature_heros, roles, mmr, rank_medal, rank_star } = req.body
    const is_user_name_taken = await User.findOne({ "identity.user_name": user_name })
    if (is_user_name_taken) return res_handler.reject(res, "5")
    const is_valid_code = sms_handler.verify_code(phone, code)
    if (!is_valid_code) return res_handler.reject(res, "1")

    const user_id = uid(6)
    const new_user = {
        identity: {
            name,
            user_name,
            phone
        },
        signature_heros,
        roles,
        info,
        dota_id,
        user_id,
        date: Date.now(),
        password: shortHash(password),
        mmr,
        rank: {
            rank_medal,
            rank_star
        }
    }
    new User(new_user).save()
    const jwt_token = JWT.sign({ user_name, user_id })
    res_handler.response(res, "ثبت نام شما با موفقیت انجام شد", { token: jwt_token })
})


router.post("/sign_in_with_password", async (req, res) => {
    const { user_name_or_phone, password } = req.body
    const user = await User.findOne(
        {
            $or: [{ "identity.phone": user_name_or_phone }, { "identity.user_name": user_name_or_phone }],
            password: shortHash(password)
        }
    )
    if (!user) return res_handler.reject(res, "6")
    const { user_id, identity } = user
    const jwt_token = JWT.sign({ user_id, user_name: identity.user_name })
    res_handler.response(res, "خوش آمدید", { token: jwt_token })
})


router.post("/sign_in_with_verification_code", async (req, res) => {
    const { phone, code } = req.body
    const is_valid_code = sms_handler.verify_code(phone, code)
    if (!is_valid_code) return res_handler.reject(res, "1")
    const user = await User.findOne({ "identity.phone": phone })
    const { user_id, identity } = user
    const jwt_token = JWT.sign({ user_id, user_name: identity.user_name })
    res_handler.response(res, "خوش آمدید", { token: jwt_token })

})


module.exports = router