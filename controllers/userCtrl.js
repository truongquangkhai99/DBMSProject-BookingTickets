const Users = require('../models/userModel')
const Orders = require('../models/orderModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCtrl = {
    register: async (req, res) => {
        try {
            const {name, email, password} = req.body;

            const user = await Users.findOne({email})
            if (user) {
                return res.status(400).json({msg: "Email đã được đăng ký."})
            }
            if (password.length < 8) {
                return res.status(400).json({msg: "Mật khẩu phải có ít nhất 8 kí tự."})
            }

            //Ma hoa mat khau bang bcrypt
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, 
                email, 
                password: passwordHash
            })

            //Luu thong tin tai khoan vao CSDL
            await newUser.save()

            //Tao jsonwebtoken de xac thuc
            const accesstoken = createAccessToken({id: newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })

            res.json({accesstoken})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    refreshToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) {
                return res.status(400).json({msg: "Cần đăng nhập hoặc đăng ký tài khoản."})
            }
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) {
                    return res.status(400).json({msg: "Cần đăng nhập hoặc đăng ký tài khoản."})
                }
                const accesstoken = createAccessToken({id: user.id})
                res.json({user, accesstoken})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
        
    },

    login: async (req, res) => {
        try {
            const {email, password} = req.body;

            //Kiem tra tai khoan co ton tai khong
            const user = await Users.findOne({email})
            if (!user) {
                return res.status(400).json({msg: "Người dùng không tồn tại."})
            }
            //Neu tai khoan ton tai thi kiem tra mat khau
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({msg: "Mật khẩu không chính xác."})
            }
            //Neu mat khau khop thi create access token va refresh token
            const accesstoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            })

            res.json({accesstoken})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "Đăng xuất."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getUser: async (req, res) =>{
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if (!user) {
                return res.status(400).json({msg: "Người dùng không tồn tại."})
            }
            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    history: async(req, res) => {
        try {
            const history = await Orders.find({customerID: req.user.id})
            res.json(history)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}
// RefreshToken dung de lay token moi khi token cu het han.
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userCtrl