const mongoose=require('mongoose');

const user=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    avtar:{
        type:String,
        default:'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png',
    },
    role:{
        type:String,
        default:'user',
        enum:['user','admin'],
    },
    favourites:[{
        type:mongoose.Types.ObjectId,
        ref:'books',
    }],
    cart:[{
        type:mongoose.Types.ObjectId,
        ref:'books',
    }],
    orders:[{
        type:mongoose.Types.ObjectId,
        ref:'order',
    }]

},{timestamps:true});

module.exports=mongoose.model("user",user);