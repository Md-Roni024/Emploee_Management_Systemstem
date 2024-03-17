const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        const con = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDb connected: ${con.connection.host}`)
    }catch(err){
        console.log('Database Not Connected.')
        process.exit(1)
    }
}

module.exports = connectDB