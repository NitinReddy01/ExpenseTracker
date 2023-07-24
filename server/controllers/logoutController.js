const User=require('../model/user');

const userLogout= async (req,res)=>{
    const token=req.cookies?.jwt;
    console.log(token);
    if(!token) return res.sendStatus(204);
    const user=await User.findOne({refreshToken:token});
    // console.log(user);
    if(!user){
        res.clearCookie('jwt',{httpOnly:true,sameSite:'None',secure:true,maxAge: 24 * 60 * 60 * 1000});
        return res.sendStatus(204);
    }
    user.refreshToken='';
    await user.save();
    res.clearCookie('jwt',{httpOnly:true,sameSite:'None',secure:true,maxAge: 24 * 60 * 60 * 1000});
    return res.sendStatus(204);
}

module.exports=userLogout;