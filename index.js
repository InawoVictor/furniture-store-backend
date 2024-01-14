const express = require('express')
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const app = express()

dotenv.config()

const port = 3000 || process.env.PORT

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected successfully");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}


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