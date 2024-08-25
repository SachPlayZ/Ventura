import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI: string = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase(): Promise<Mongoose> {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('Connected to MongoDB');
      return mongoose;
    });
  }
  cached!.conn = await cached!.promise;
  return cached!.conn;
}

export default connectToDatabase;