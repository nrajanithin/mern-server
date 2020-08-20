// imports
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
//const bodyParser = require('body-parser')
const Student = require('./models/Students')
const app = express()
//db connections
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/students')
mongoose.connection.on('connected',()=>{
    console.log('Database is connected');
})
mongoose.connection.on('error',()=>{
    console.log('error occured');
})
//middlewares
app.use(cors())
app.use(express.json())


//routes
app.get('/',(req,res)=>{
    Student.find()
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).send(result);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
})
app.post('/students',(req,res)=>{
    console.log(req.body.firstname);
    console.log(req.body.lastname);
    console.log(req.body.place);
    const student = new  Student({
        _id : new mongoose.Types.ObjectId,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        place: req.body.place
    });
    student.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({msg:"succesfully submitted"});
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error occured"});
    })
})
app.delete('/student/:id',(req,res)=>{
    const id = req.params.id;
    Student.remove({_id:id},(err,result)=>{
        if(err)
        {
            console.log(err);
            res.status(500).send('error occured');
        }
        else{
            res.status(200).json({msg:"successfully deleted"});
        }
    })
})
app.put('/student/:id',(req,res)=>{
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const place = req.body.place;
    const id = req.params.id;
    Student.update({_id:id},{$set:{firstname:firstname,lastname:lastname,place:place}})
    .then(result=>{
        console.log(result);
        res.status(200).json({msg:"successfully updated"});
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occurred"});
    })
})


//server
app.listen(5000,()=>{
    console.log('server was connected on port:5000')
})