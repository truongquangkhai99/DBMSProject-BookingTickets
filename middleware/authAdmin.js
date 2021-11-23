const Users = require('../models/userModel')

const authAdmin = async (req, res, next) => {
    try {
        //Tim kiem user qua req bang id va kiem tra user co phai Admin hay khong
        const user = await Users.findOne({_id: req.user.id})
        //Truong role = 0 la client, 1 la admin.
        if (user.role === 0) {
            return res.status(400).json({msg: "Truy cập quyền Admin không được chấp nhận."})
        }
        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authAdmin