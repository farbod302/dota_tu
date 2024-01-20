const JWT = require("./jwt")
const res_handler = require("./res_handler")

const middleware = {

    body_handler(req, res, next) {
        const body_data = {
            "/auth/send_code": ["phone", "log_in"],
            "/auth/sign_up": ["name", "phone", "code", "dota_id", "password", "user_name", "info", "signature_heros", "roles", "nick_name"],
            "/auth/sign_in_with_password": ["user_name_or_phone", "password"],
            "/auth/sign_in_with_verification_code": ["code", "phone"],
            "/tournament/new_tournament":["name","tournament_type","teams_count","games_type","group_stage","prize_poll","entry","mmr_avg","registration_deadline","start_at"]
        }
        const { url, body, method } = req
        if (method === "GET") return next()
        const selected_request = body_data[url]
        if (!selected_request) return res.status(404).send("404 page not fond")
        const body_keys = Object.keys(body)
        const is_valid_body = selected_request.every(param => body_keys.includes(param))
        if (is_valid_body) return next()
        else res_handler.reject(res, "2")
    },

    token_handler(req, res, next) {
        const token = req.headers.token
        if (!token) return next()
        const user = JWT.verify(token)
        if (!user) return res_handler.reject(res, "8")
        else req.body.user_id = user.user_id
        next()
    }
}

module.exports = middleware