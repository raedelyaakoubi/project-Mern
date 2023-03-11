const express = require ('express');
const { allMessages, sendMessage } = require('../controllers/messageController');
const isAuth = require('../middlewares/authMiddleware');
const router = express.Router()



//sending message
router.post('/', isAuth,sendMessage)
router.get('/:chatId', isAuth, allMessages)


//fetching message





module.exports = router