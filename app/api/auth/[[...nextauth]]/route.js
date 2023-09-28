import NextAuth from 'next-auth';

// import { MongoClient,ServerApiVersion  } from 'mongodb';

import { authOptions } from '@/lib/auth';

// const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.hokks6t.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
// console.log(uri)   
// const mongoClient = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });
  
const handlers = NextAuth(authOptions);

export {handlers as GET, handlers as POST}
// export default handlers;