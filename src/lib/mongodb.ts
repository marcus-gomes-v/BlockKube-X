import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface Cached {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Initialize 'cached' with a structure to ensure it's never 'undefined'.
// This allows TypeScript to know that 'cached' always has a defined structure.
const cached: Cached = global.mongooseConn ?? { conn: null, promise: null };

async function connectToDatabase(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Assign 'cached' back to 'global' to ensure it's reused in hot reloads in development.
global.mongooseConn = cached;

export default connectToDatabase;
