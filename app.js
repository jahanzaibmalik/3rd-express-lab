const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/LocalDB',{ useNewUrlParser: true })
.then(console.log('MongoDB Connected'))
.catch(err => {console.log(err)});

require('./models/Students');
const Student = mongoose.model('students');

app.post('/student',(req,res)=>{
    const NewStudent = {
        id:req.body.id,
        name:req.body.name
    }
    new Student(NewStudent)
    .save()
    .then(s=>{
        res.send('Student Added ')
    })
    .catch(err => console.log(err));
});



app.listen(3000,()=>{console.log('Server Is Running on Port 3000')});