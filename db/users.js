const mongoose = require("mongoose")
const user = mongoose.Schema({
    user_id: String,
    identity: Object,
    dota_id: Number,
    roles: Array,
    signature_heros: Array,
    sign_date: Number,
    password: String,
    nick_name:String,
    info:String,
    rank: Object,
    team_id: { type: String, default: "" },
    search_for_team: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    avatar:String
})

module.exports = mongoose.model("User", user)