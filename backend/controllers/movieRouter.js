// import moduls
import express from 'express'

//import middlewares
import isUserLoginMiddleware from '../middlewares/isUserLogin/isUserLogin.js'
import fetchMoviesMiddleware from '../middlewares/movies/fetchMoviesMiddleware.js'
import fetchAMovieMiddleware from '../middlewares/movies/fetchAMovieMiddleware.js'
import registerMovieMiddleware from '../middlewares/movies/registerMovieMiddleware.js'
import updateMovieMiddleware from '../middlewares/movies/updateMovieMiddleware.js'
import deleteMovieMiddleware from '../middlewares/movies/deleteMovieMiddleware.js'
import fetchRecentionsMiddleware from '../middlewares/movies/fetchRecentionsMiddleware.js'
import fetchMoviesUserRatingMiddleware from '../middlewares/movies/fetchMoviesUserRatingMiddleware.js'
import searchMovieMiddleware from '../middlewares/movies/searchMovieMiddleware.js'
import isUserAdmin from '../middlewares/isUserAdmin/isUserAdmin.js'

const router = express.Router()

//admin can search a movie
router.get('/search-movie', isUserLoginMiddleware, isUserAdmin, searchMovieMiddleware);

//fetch all Movies
router.get('/' , fetchMoviesMiddleware)

//fetch a list of movies with avreage user rating
router.get('/rating' , fetchMoviesUserRatingMiddleware)

//fetch information about a movie
router.get('/:id' , fetchAMovieMiddleware)

// register a movie
router.post('/', isUserLoginMiddleware, isUserAdmin, registerMovieMiddleware)

//update a movie
router.put('/:id', isUserLoginMiddleware ,isUserAdmin, updateMovieMiddleware)

//delete a movie
router.delete('/', isUserLoginMiddleware ,isUserAdmin, deleteMovieMiddleware)

// fetch all recentions  for a movie
router.get('/:id/recentions', fetchRecentionsMiddleware )










export default router