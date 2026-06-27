import mongoose from "mongoose";


const connectDB= async () => {
    try {
     const connectionInstance=   await mongoose.connect(`${process.env.MONGODB_URI}/NOteapp`)
     console.log(`\n mongodb connectecd and db host:${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(`Mongodb connection is unsuccsefull`,error);
        process.exit(1)
    }
}

export default connectDB

