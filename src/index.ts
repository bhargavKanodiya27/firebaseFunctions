import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import {addUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers} from './controllers';
const config = {
  databaseURL: process.env.databaseURL,
  storageBucket: process.env.storageBucket,
  projectId: process.env.projectId,
};
admin.initializeApp(config);
const app = express();
const db = admin.firestore();
app.get('/', (req, res) => res.status(200).send('Hey there!'));
exports.app = functions.https.onRequest(app);
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUser = getUser;
exports.getUsers = getUsers;
export {db};
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info('Hello logs!', {structuredData: true});
//   response.send('Hello from Firebase!');
// });
