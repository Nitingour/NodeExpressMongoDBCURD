const mongoose=require('mongoose');
var loginSchema= new mongoose.Schema({
uid:{ type:String},
password:{type:String}
  });
mongoose.model('Login',loginSchema);
