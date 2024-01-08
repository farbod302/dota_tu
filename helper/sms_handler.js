const sms_handler = {
    sent_cods: [],

    phone_validator(phone) {
        return phone.startsWith("09") && phone.length === 11
    },

    send_new_code(phone) {
        const random_num = 1234
        const new_codes = this.sent_cods.filter(e => e.phone === phone)
        new_codes.push({ phone, code: random_num })
        this.sent_cods = new_codes
        return true
    },
    verify_code(phone, code) {
        const is_valid = this.sent_cods.find(sms => sms.code == code && sms.phone === phone)
        if (!is_valid) return false
        this.sent_cods = this.sent_cods.filter(e => e.phone !== phone)
        return true
    }
}

module.exports = sms_handler