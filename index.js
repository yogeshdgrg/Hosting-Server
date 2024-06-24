const express = require('express')
const { connectMongoDB } = require("./connection")
require('dotenv').config()
const personRouter = require("./routes/person")

//* Creating the server with the name app
const app = express()
PORT = process.env.PORT || 8005

app.use(express.json())

// const url = "mongodb://127.0.0.1:27017/person"
// const url = 'mongodb+srv://yogeshgurung667:gorkha12345@cluster0.lxiawnr.mongodb.net/'
const url = process.env.MONGO_URL
connectMongoDB(url)
    .then(() => {
        console.log("MongoDb Connected...")
    })
    .catch((err) => {
        console.log(err)
    })


app.use("/person", personRouter)



app.listen(PORT, () => {
    console.log(`Server is listening at the localhost:${PORT}...`)
})