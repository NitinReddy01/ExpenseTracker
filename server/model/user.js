const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username:{
        required:true,
        type:String
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:String
})

module.exports=mongoose.model('User',userSchema);
