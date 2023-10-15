const mongoose = require('mongoose')
const validator = require('validator')


var userSchema = new mongoose.Schema({
    name:{type:'string',required:true},
    channelName:{type:'string',required:true},
    title:{type:'string',required:true},
    description:{type:'string',required:true},
    email:{
        type:'string',
        required:true,
        lowercase:true,
        validate:(value)=>{
                return validator.isEmail(value)
        }
    },
    
    createdAt:{type:Date,default:Date.now()}
})

let usersModel = mongoose.model('addNews',userSchema);

module.exports={mongoose,usersModel}