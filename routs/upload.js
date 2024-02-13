const express = require("express")
const { uid } = require("uid")
const router = express.Router()
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/../files`)
    },
    filename: function (req, file, cb) {
        const random_name = uid(5)
        const format = file.originalname.split(".").slice(-1)[0]
        req.body.image_name=`${random_name}.${format}`
        cb(null, `${random_name}.${format}`)
    }
})

const upload = multer({ storage })


router.post("/upload", upload.single("image"), (req, res) => {

    const { image_name } = req.body
    res.json({
        status: true,
        msg: "عکس با موفقیت بارگذاری شد",
        data: {
            image_name
        }
    })

})

module.exports = router