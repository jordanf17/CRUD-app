const mongoose = require('mongoose')
const product = require('./models/product');


mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
    console.log('MONGO CONNECTION OPEN!!')
})
.catch(err => {
    console.log('oh no mongo error')
    console.log(err);
})
const seedProducts = [
    {
        name:'Fairy Eggplant',
        price:1.00,
        category:'vegetable'
    },
    {
        name:'Organic goddess melon',
        price:4.99,
        category:'fruit'
    },
    {
        name:'Organic mini seedless watermelon',
        price:3.99,
        category:'fruit'
    },
    {
        name:'Organic celery',
        price:1.50,
        category:'vegetable'
    }
]

product.insertMany(seedProducts)
.then(p=>{
    console.log(p)
})
.catch(e => {
    console.log(e)
})