const mongoose=require('mongoose')
const googleSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true
    }
});

const Google = mongoose.model('Google', googleSchema);
module.exports=Google