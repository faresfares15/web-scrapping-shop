import mongoose from 'mongoose'
let isConnected: boolean = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if(!process.env.MONGODB_URI) return console.log('No MONGODB_URI env variable found');
    if (isConnected) return console.log('=> using existing database connection')

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        isConnected = true
        console.log('=> using new database connection')
    } catch (error) {
        console.log(error);
        
    }
    
};