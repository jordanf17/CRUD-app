const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const product = require('./models/product');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
    console.log('MONGO CONNECTION OPEN!!')
})
.catch(err => {
    console.log('oh no mongo error')
    console.log(err);
})
app.set('views',path.join(__dirname,'views'))
app.engine('ejs',ejsMate)
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.get('/products',async (req,res) => {
    const products = await product.find({})
    res.render('products/index',{products})
})
app.get('/products/new', (req, res) => {
    res.render('products/new')
})
app.post('/products',async (req,res) => {
    const newproduct= new product(req.body)
    await newproduct.save();
    res.redirect(`/products/${newproduct._id}`)
})
app.get('/products/:id',async (req, res) => {
    const {id} = req.params; 
    const anyproduct = await product.findById(id)
    res.render('products/show',{anyproduct})
})
app.get('/products/:id/edit',async (req, res) => {
    const {id} = req.params; 
    const aproduct = await product.findById(id)
    res.render('products/edit',{aproduct})
})
app.delete('/products/:id', async (req,res) => {
    const { id } = req.params;
    const deletedProduct = await product.findByIdAndDelete(id)
    res.redirect('/products')
})
app.put('/products/:id', async (req,res) => {
    const {id} = req.params;
    const aproduct = await product.findByIdAndUpdate(id, req.body,{runValidators:true, new:true})
    res.redirect(`/products/${aproduct._id}`)
})


app.listen(3000, () => {
    console.log('On port 3000')
})