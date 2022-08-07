const express = require('express')
const mongoose = require('mongoose')
const app = express()
const xl = require('./models/links')
const morgan = require('morgan')

const dbURL = 'mongodb+srv://nr:123@x-link.0q2uj.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURL)
    .then((result) => {
        app.listen(process.env.PORT || 8080)
    }).catch((err) => {
        console.log(err);
    });

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.get('/',(req,res) => {
    xl.find().sort({ createdAt: -1})
        .then((result) => {
            res.render('index',{xl: result, ip: req.ip})
        }).catch((err) => {
            console.log(err);
        });
})

app.post('/',(req,res) => {
    const link = new xl(req.body)
    link.save()
        .then((result) => {
            res.redirect('/')
        }).catch((err) => {
            console.log(err);
        });
})

app.get('/link/:id' , (req , res)=>{
    const id = req.params.id

    xl.findById(id)
        .then((result) => {
            res.render('link',{xl: result})
        }).catch((err) => {
            res.status(404).render('404')
        });
})


app.use((req,res) => {
    res.status(404).render('404')
})
