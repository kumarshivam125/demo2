const express=require('express');

const router=express.Router();
const {login,signup,getOtherUser}=require('../controller/userController');
const { auth } = require('../middleware/auth');

router.post('/signup',signup);
router.post('/login',login);
router.post('/getOtherUser',auth,getOtherUser);

module.exports=router;