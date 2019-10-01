const mongoose = require('mongoose')
var contactSchema = mongoose.Schema({
   name:{
       type:String,
       required: true
   },
   email:{
       type:String,
       required: true
   },
   password:String,
   gender : String,
   phone: String,
   create_date:{
       type:Date,
       default: Date.now
   }
})
var Contact = module.exports = mongoose.model('contact',contactSchema )
module.exports.get = (callback , limit)=>{
   Contact.find(callback).limit(limit)
} 