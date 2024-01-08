const jwt = require("jsonwebtoken")
const JWT = {
    sign(payload) {
        const token = jwt.sign(payload, process.env.JWT, { expiresIn: "7d" })
        return token
    },

    verify(token) {
        try {
            const data = jwt.verify(token, process.env.JWT)
            return data
        } catch {
            return null
        }
    }
}

module.exports = JWT