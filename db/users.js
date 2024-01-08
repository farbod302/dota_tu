const mongoose = require("mongoose")
const user = mongoose.Schema({
    user_id: String,
    identity: Object,
    dota_id: Number,
    roles: Array,
    signature_heros: Array,
    sign_date: Number,
    password: String,
    mmr: Number,
    info:String,
    rank: Object,
    team_id: { type: String, default: "" },
    search_for_team: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
})

module.exports = mongoose.model("User", user)