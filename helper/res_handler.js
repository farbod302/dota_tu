const res_handler = {
    status_codes: {
        "0": "شماره تماس نامعتبر است",
        "1": "کد تایید اشتباه است",
        "2": "پر کردن تمامی فیلد ها الزامی است",
        "3": "حساب شما مسدود شده است",
        "4":"این شماره تماس قبلا ثبت شده",
        "5":"نام کاربری قبلا توسط کاربر دیگری ثبت شده",
        "6":"نام کاربری یا رمز عبور اشتباه است",
        "7":"کاربری با این شماره تماس ثبت نشده",
        "8":"شناسه کاربری نامعتبر است"
    },

    reject(res, code) {
        res.status(400).json({
            status: false, msg: this.status_codes[code], data: {}
        })
    },
    response(res, msg, data) {
        res.json({
            status: true,
            msg,
            data: { ...data }
        })
    }
}


module.exports=res_handler