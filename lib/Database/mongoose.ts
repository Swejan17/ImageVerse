import mongoose ,{Mongoose} from 'mongoose';

const MONGO_URL = process.env.NEXT_MONGODB_URL;

interface MongooseConnection{
    conn : Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose ;

if(!cached){
    cached = (global as any).mongoose = {conn: null, promise: null};
}

export const connectToDatabase = async ()=>{
    if(cached.conn){
        return cached.conn;
    }

    if(!MONGO_URL){
        throw new Error("Please define the MONGO_URL environment variable inside .env.local");
    }
    cached.promise = cached.promise || mongoose.connect(MONGO_URL, {
        dbName:"ImageVerse",
        bufferCommands: false,
    });
    return cached.conn;
}