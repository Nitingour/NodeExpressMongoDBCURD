const mongoose=require('mongoose');
var employeeSchema= new mongoose.Schema({
eid:{ type:Number},
ename:{type:String},
salary:{type:Number}
  });
mongoose.model('Employee',employeeSchema);
