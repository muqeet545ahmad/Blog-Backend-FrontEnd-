const mongoose = require("mongoose")

const dbConnnection =async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongo db is connected at ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        
    }
}
module.exports = dbConnnection