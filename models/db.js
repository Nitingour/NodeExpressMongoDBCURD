const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/EmployeeDB',{useNewUrlParser:true},(err)=>{
  if(err) throw err;
  else console.log("MongoDB Connected Successfully");
});
require('./employee.model');
require('./login.model');
module.exports=mongoose;
