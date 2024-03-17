import { Mongoose } from 'mongoose';

declare global {
  var mongooseConn: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  } | undefined;
}

export { };