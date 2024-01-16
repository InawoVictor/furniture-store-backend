const express = require('express')
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const app = express()
const productRouter = require("./routes/products")

dotenv.config()

const port = process.env.PORT || 3000

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected successfully");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true}));
app.use('/api/products', productRouter)

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    } catch (error) {
        console.log(error);
    }
}

app.get('/', (req, res) => res.send('Hello World!'))

startServer()