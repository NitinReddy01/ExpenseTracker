const User=require('../model/user');
const jwt=require('jsonwebtoken');

const handleRefreshToken=async (req,res)=>{
    // console.log(req.cookies);
    const token=req.cookies?.jwt;
    if(!token) return res.sendStatus(401);

    const user=await User.findOne({refreshToken:token});
    if(!user) return res.sendStatus(403);

    jwt.verify(token,process.env.REFRESH_TOKEN_SECRET,(err,decoded)=>{
        if( err || user.username!== decoded.username) return res.sendStatus(403);
        const accessToken=jwt.sign(
            {
                username:user.username
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:'30s'
            }
        );
        res.send({accessToken});
    })
}

module.exports=handleRefreshToken;