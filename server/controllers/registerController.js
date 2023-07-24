const User=require('../model/user');
const bcrypt=require('bcrypt');

const userRegister= async (req,res)=>{
    let {uname,pword}=req.body;
    if(!uname || !pword ) return res.status(400).send({'message':'Username and Password are required'});

    let duplicate=await User.findOne({username:uname});
    if(duplicate) return res.status(409).send({'message':`User with ${uname} already exists`});

    try{
        const hashedPass=await bcrypt.hash(pword,10);
        const newUser= await User.create({
            username:uname,
            password:hashedPass
        })
        // console.log(savedUser);
        res.status(201).send({'message':`User ${uname} registered`});
    }
    catch(err){
        res.status(500).send({'message':err.message});
    }
}

module.exports=userRegister;