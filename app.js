const express= require('express');
const app= express();
var port = 3000;
const nodemailer = require('nodemailer');
const bodyParser=require('body-parser');
const ejs= require('ejs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/lnd',(req,res)=>{
    res.render('lnd')
})
app.post('/send',(req, res) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:'abhisheknambiar25@gmail.com',
        pass:'lovehiking1998'
    }
})

ejs.renderFile(__dirname + "/views/email.ejs", { name: 'Stranger' }, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        var mainOptions = {
            from: 'abhisheknambiar25@gmail.com"',
            to: req.body.email,
            subject: 'Thank you! We will get back to you soon!',
            html: data
        };
        console.log("html data =>", mainOptions.html);
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log('Email sent!!');
            }
        });
    }});
    

// transporter.sendMail(mailOptions, function (err, res) {
//     if(err){
//         console.log(err);
//     } else {
//         console.log('Email Sent');
//     }
// })

//redirect back to the current page 
res.redirect('/')
  });


app.listen(port,()=>{
  console.log('Logged into port'+port);
})
