const express = require ('express');
const { accessChat, fetchChat, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require('../controllers/chatController');
const router = express.Router()

const isAuth = require('../middlewares/authMiddleware');

router.post('/',isAuth,accessChat);
router.get('/fetch',isAuth, fetchChat)
router.post('/group',isAuth, createGroupChat)
router.put('/rename',isAuth, renameGroup)
router.put('/groupadd',isAuth,addToGroup)
router.put('/groupremove',isAuth, removeFromGroup)











module.exports = router