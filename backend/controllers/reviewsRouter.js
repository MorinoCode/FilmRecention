// import moduls
import express from 'express'


//import middlewares
import fetchAllRecentionsMiddleware from '../middlewares/recentions/fetchAllRecentionsMiddleware.js'
import sendRecentionMiddleware from '../middlewares/recentions/sendRecentionMiddleware.js'
import fetchARecentionMiddleware from '../middlewares/recentions/fetchARecentionMiddleware.js'
import updateARecentionMiddleware from '../middlewares/recentions/updateARecentionMiddleware.js'
import updateARecentionAdminMiddleware from '../middlewares/recentions/updateARecentionAdminMiddleware.js'
import deleteARecentionMiddleware from '../middlewares/recentions/deleteARecentionMiddleware.js'
import isUserLoginMiddleware from '../middlewares/isUserLogin/isUserLogin.js'
import isUserAdmin from '../middlewares/isUserAdmin/isUserAdmin.js'




const router = express.Router()


//fetch a list of all recentions
router.get('/' , fetchAllRecentionsMiddleware)

//fetch a certaion recention
router.get('/:recId' , fetchARecentionMiddleware)

//send a recention to a movie
router.post('/:id/send-recention/:userId', isUserLoginMiddleware , sendRecentionMiddleware)

//update a certaion recention
router.put('/:recId/edit-recention/:userId' ,isUserLoginMiddleware, updateARecentionMiddleware)

//update a certaion recention by Admin
router.patch('/:recId/' ,isUserLoginMiddleware, isUserAdmin, updateARecentionAdminMiddleware)

//delete a recention
router.delete('/:recId' ,isUserLoginMiddleware, deleteARecentionMiddleware)





export default router