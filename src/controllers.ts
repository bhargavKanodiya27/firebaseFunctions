import {db} from './index';
import * as functions from 'firebase-functions';

interface User {
    name:string,
    technology:string,
    age:number
}
export const addUser = functions.https.onRequest(async (req, res)=>{
  try {
    const user: User = {
      name: req.body['name'],
      technology: req.body['technology'],
      age: req.body['age'],
    };
    const newUser = await db.collection('users').add(user);
    res.status(201).send(`Created a new user: ${newUser.id}`);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
export const updateUser = functions.https.onRequest(async (req, res)=>{
  try {
    const userId = JSON.stringify(req.params);
    const userIdParse = JSON.parse(userId);
    const id= userIdParse[0].slice(1);
    const user: User = {
      name: req.body['name'],
      technology: req.body['technology'],
      age: req.body['age'],
    };
    await db.collection('users').doc(id)
        .set({
          name: user.name,
          technology: user.technology,
          age: user.age,
        });
    res.status(201).send(`Updated a user: ${userId}`);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
export const deleteUser = functions.https.onRequest(async (req, res)=>{
  try {
    const userId = JSON.stringify(req.params);
    const userIdParse = JSON.parse(userId);
    const id= userIdParse[0].slice(1);
    await db.collection('users').doc(id).delete();
    res.status(201).send(`Deleted a user: ${userId}`);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
export const getUser = functions.https.onRequest(async (req, res)=>{
  try {
    const userId = JSON.stringify(req.params);
    const userIdParse = JSON.parse(userId);
    const id= userIdParse[0].slice(1);
    const userSnapShot= await db.collection('users').doc(id).get();
    const userDetails = await userSnapShot.data();
    res.status(200).json(userDetails);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
export const getUsers = functions.https.onRequest(async (req, res)=>{
  try {
    const allUsers= await db.collection('users').get();
    const usersData: any[] = [];
    allUsers.forEach(
        (doc)=>{
          usersData.push({
            id: doc.id,
            data: doc.data(),
          });
        }
    );
    res.status(201).json(usersData);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
