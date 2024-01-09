const res_handler = require("./res_handler")

const middleware = {

    body_handler(req, res, next) {
        const body_data = {
            "/auth/send_code": ["phone","log_in"],
            "/auth/sign_up":[ "name", "phone", "code", "dota_id", "password", "user_name","info","signature_heros","roles","nick_name"],
            "/auth/sign_in_with_password":["user_name_or_phone","password"],
            "/auth/sign_in_with_verification_code":["code","phone"]
        }
        const { url, body, method } = req
        if (method === "GET") return next()
        const selected_request = body_data[url]
        if (!selected_request) return res.status(404).send("404 page not fond")
        const body_keys = Object.keys(body)
        const is_valid_body = selected_request.every(param => body_keys.includes(param))
        if (is_valid_body) return next()
        else res_handler.reject(res, "2")
    }
}

module.exports = middleware