const express=require('express');

const router=express.Router();
const {getMessage,sendMessage}=require('../controller/messageController');
const { auth } = require('../middleware/auth');

router.post('/getMessage/:id',auth,getMessage);
router.post('/sendMessage/:id',auth,sendMessage);

module.exports=router;