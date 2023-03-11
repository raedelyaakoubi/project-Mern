const express = require ('express');
const { registerUser, authUser, deleteUser, getAll } = require('../controllers/userController');
const { validationCheck } = require('../middlewares/DataCheck');
const isAuth = require('../middlewares/authMiddleware');

const router = express.Router()



router.post('/register', validationCheck, registerUser)
router.post('/login' , validationCheck,authUser )
router.delete('/:idDelete",', deleteUser);
//router.get('/current",', isAuth,getUser);
router.get('/', isAuth,getAll);

module.exports = router