const express=require('express');
const router=express.Router();
const userRegister=require('../controllers/registerController');

router.post('/',userRegister);

module.exports=router;