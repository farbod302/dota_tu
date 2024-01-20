const mongoose = require("mongoose")
const tournament = mongoose.Schema({
    tournament_id: String,
    name: String,
    tournament_type: Boolean,
    teams_count: Number,
    games_type: Boolean,
    group_stage: Boolean,
    prize_poll: Number,
    entry: Number,
    mmr_avg: Number,
    registration_deadline: Number,
    created_at: Number,
    start_at: Number,
})

module.exports = mongoose.model("Tournament", tournament)