const User=require('../model/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const userLogin = async (req,res)=>{
    // console.log(req.body);
    let {uname,pword}=req.body;
    if(!uname || !pword ) return res.status(400).send({'message':'Username and Password are required'});

    const user=await User.findOne({username:uname});
    if(!user) return res.sendStatus(401);   //unauthorized

    const match=await bcrypt.compare(pword,user.password);
    if(match){
        const accessToken=jwt.sign(
            {
                username:uname
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:'30s'
            }
        );
        const refreshToken = jwt.sign(
            { "username": uname },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        user.refreshToken=refreshToken;
        await user.save();
        // console.log(user);
        // res.send({"message":"login succesful"});
        res.cookie('jwt',refreshToken,{httpOnly:true,sameSite:'None',secure:true,maxAge: 24 * 60 * 60 * 1000});
        res.send({accessToken});
    }
    else{
        res.sendStatus(401);
    }
}

module.exports=userLogin;
