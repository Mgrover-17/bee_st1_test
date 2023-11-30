const express = require('express')
const app = express()
const DB = require('./middlewares/db')
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.use(express.json)
DB.connectToDb()

app.use('/products', productRoutes);
app.use('/reviews', reviewRoutes);

app.listen(5000,()=>{
    console.log(`Running on port 5000`)
})