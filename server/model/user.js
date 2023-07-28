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
},{timestamps:true});

module.exports=mongoose.model('User',userSchema);
