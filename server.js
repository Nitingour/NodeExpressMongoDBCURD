var express=require('express');
var app=express();
const session = require('express-session');


var path=require('path');
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');


app.use(session({secret:'asdfsd234324',saveUninitialized:true,resave:false}));

const PORT=process.env.PORT || 5000;
app.listen(PORT,(request,response)=>{
  console.log("server started:"+PORT);
});

app.get('/',(request,response)=>{
//  response.setHeader("Content-Type","text/html");
//  response.end("<h1>Hello from NodeJS</h1>");
response.render('index',{'headmsg':'Login Form'});
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));



app.get('/logout',(request,response)=>{
  request.session.views=null;
response.render('index');
});

app.get('/createEmp',(request,response)=>{
response.render('createEmp');
});


////////////////////////////////////////////////////////////////////////////
app.get('/profile/:id',(req,res)=>{
res.send('User:'+req.params.id);
});

const mongoose=require('./models/db');
const Login=mongoose.model('Login');
const Employee=mongoose.model('Employee');

/*app.get('/logInsert',(request,response)=>{
var login=new Login();
login.uid='admin';
login.password='12345';
  login.save((err,doc)=>{
    if(err) throw err;
    else
    console.log("Data Inserted");
  });

 });
*/
app.post('/loginCheck',(request,response)=>{

Login.findOne({uid:request.body.uid},(err,doc)=>{
      if(err) throw err;
    //  console.log(doc.password+"-"+request.body.pwd);
    //  console.log(doc.password==request.body.pwd);
      if(doc.password==request.body.pwd)
      {
        request.session.views=request.body.uid;
        response.render('home',{user:request.session.views});
    }else
      response.render('index',{'msg':'Login Fail'});

 });
});


app.post('/empInsert',(request,response)=>{
var emp=new Employee();
emp.eid=request.body.eid;
emp.ename=request.body.ename;
emp.salary=request.body.salary;
  emp.save((err,doc)=>{
    if(err) throw err;
    else {console.log("Data Inserted");
    response.render("createEmp",{msg:"Data Inserted..."});
}
  });
 });

 app.get('/viewEmp',(request,response)=>{
   Employee.find((err,doc)=>{
     if(err) throw err;
     else{
       console.log(doc);
       response.render('viewEmp',{'list':doc});
        }
   });
 });

 app.get('/updateEmp',(request,response)=>{
   var id=request.query.id;
   Employee.findById(id,(err,doc)=>{
        if(err) throw err;
        else{
          console.log(">>>>>>>>>>>>>>>"+doc);
          response.render('viewOneEmp',{'emp':doc});
           }
   });
 });

 app.post('/empUpdateAction',(request,response)=>{
      var id=request.body.id;
 Employee.findOneAndUpdate({_id:id},request.body,{new:true},(err,doc)=>{
       if(err) throw err;
      else
          response.redirect('/viewEmp');
 });
 });

 app.get('/deleteEmp',(request,response)=>{
   var id=request.query.id;
  Employee.findByIdAndRemove(id,(err,result)=>{
        if(err) throw err;
        else
            response.redirect('/viewEmp');
   });
 });
