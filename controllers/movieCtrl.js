const Movies = require('../models/movieModel')

const movieCtrl = {
    //Lay danh sach phim
    getMovies: async(req, res) => {
        try {
            const movies = await findMovieByText(req.query.arg)

            res.json({
                status: 'success',
                result: movies.length,
                movies: movies
            })
            
        } catch (err) {
            const movies = await findMovieByText("Man")
            res.json({
                status: 'success',
                result: movies.length,
                movies: movies
            })
        }
    },

    //Them phim moi
    createMovie: async(req, res) =>{
        try {
            console.log("hello cuong")
            const {title, plot, fullplot, poster, year, genres, runtime, cast} = req.body;
            const newMovie = new Movies({
                title, plot, fullplot, poster, year, genres, runtime, cast
            })
            await newMovie.save()
            res.json({msg: "Thêm phim mới thành công."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //Xoa phim
    deleteMovie: async(req, res) => {
        try {
            await Movies.findByIdAndDelete(req.params.id)
            res.json({msg: "Xóa phim thành công."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //Chinh sua thong tin phim 
    updateMovie: async(req, res) => {
        try {
            const {title, plot, fullplot, poster, year, genres, runtime, cast} = req.body;
            await Movies.findOneAndUpdate({_id: req.params.id}, {
                title, plot, fullplot, poster, year, genres, runtime, cast
            })
            res.json({msg: "Cập nhật thành công."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //Lay phim bang id
    getByID: async(req, res) => {
        try {
            const movie = await Movies.findOne({_id: req.params.id})
            res.json({movie})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = movieCtrl

//Su dung mongo atlas search de toi uu kha nang tim kiem.
var findMovieByText = function (arg) {
    return Movies.aggregate([
        {
        $search: {
            text: {
                query: arg,
                path:'fullplot'
            },
            highlight: {
                path: 'fullplot'
            }
        }},
        {
        $project: {
            title: 1,
            _id: 1,
            poster: 1,
            year: 1,
            plot: 1,
            fullplot: 1,
            score: { $meta: 'searchScore'},
            highlight: {$meta: 'searchHighlights'}
        }
        },
        {
        $limit: 16
        }
    ])
};