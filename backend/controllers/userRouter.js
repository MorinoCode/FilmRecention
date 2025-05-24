// import moduls
import express from 'express'

//import middlewares
import fetchUsersMiddleware from '../middlewares/users/fetchUserMiddleware.js'
import createAccountMiddleware from '../middlewares/users/createAccountMiddleware.js'
import loginMiddleware from '../middlewares/users/loginMiddleware.js'
import deleteUserMiddleware from '../middlewares/users/deleteUserMiddleware.js'
import makeUserAdminMiddleware from '../middlewares/users/makeUserAdminMiddleware.js'

import isUserLogin from '../middlewares/isUserLogin/isUserLogin.js'
import isUserAdmin from '../middlewares/isUserAdmin/isUserAdmin.js'

const router = express.Router()

// fetch all users
router.get('/' , fetchUsersMiddleware)

//create account
router.post('/register', createAccountMiddleware)

//login
router.post('/login' , loginMiddleware)

//Delete a user
router.delete('/delete-user/:userId' ,isUserLogin, isUserAdmin, deleteUserMiddleware)

//Make a user admin
router.post('/make-admin/:userId', isUserLogin, isUserAdmin, makeUserAdminMiddleware);



export default router