const Shows = require('../models/showModel')


const showCtrl = {
    nowShowing: async(req, res) => {
        try {
            const shows = await Shows.find({status: "1"})
            res.json({
                status: 'success',
                result: shows.length,
                shows: shows
            })
        } catch (e) {
            console.error(e.message);
            res.status(500).send("Server error");
        }
    },

    comingSoon: async(req, res) => {
        try {
            const shows = await Shows.find({status: "2"})
            res.json({
                status: 'success',
                result: shows.length,
                shows: shows
            })
        } catch (e) {
            console.error(e.message);
            res.status(500).send("Server error");
        }
    },

    deleteShow: async(req, res) => {
        try {
            await Shows.findByIdAndDelete(req.params.id)
            res.json({msg: "Xóa show thành công."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //Lay show bang id
    getByID: async(req, res) => {
        try {
            const show = await Shows.findOne({_id: req.params.id})
            res.json({show})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //Chinh sua thong tin show
    updateShow: async(req, res) => {
        try {
            const {movieID, price, startTime, endTime} = req.body;
            await Shows.findOneAndUpdate({_id: req.params.id}, {
                movieID, price, startTime, endTime
            })
            res.json({msg: "Cập nhật thành công."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    createShow: async(req, res) => {
        try {
            let {movieID, price, startTime, endTime} = req.body;
            const currentDate = new Date()
            currentDate.setHours(currentDate.getHours() + 7)
            const currentDateString = currentDate.toISOString()
            const dateString = currentDateString.slice(0, currentDateString.indexOf("T"))
            const showDate = startTime.slice(0, startTime.indexOf("T"))
            let status = 0
            startTime += ".000+00:00"
            endTime += ".000+00:00"
            let startTimeDate = new Date(startTime)
            if (showDate > dateString) {
                status = 2
            } else if (startTimeDate >= currentDate) {
                status = 1
            }
            const newShow = new Shows({
                movieID, price, startTime, endTime, status
            })
            await newShow.save()
            res.json({msg: "Thêm show mới thành công."})
            // res.json({
            //     startTime: startTime,
            //     current: currentDate,
            //     endTime: endTime,
            //     status: status
            // })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    updateSeat: async(req, res) => {
        try {
            const {seatsAvailable} = req.body;
            await Shows.findOneAndUpdate({_id: req.params.id}, {
                seatsAvailable: seatsAvailable
            })
            res.json({msg: "Cập nhật thành công."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = showCtrl

