"use strict";
const express = require("express");
const morgan = require("morgan");
const { MongoClient, ObjectId } = require("mongodb");
const uri ='mongodb+srv://abdullamansur3:ePDWlPbl2zy7GHXV@soccer.jd4ta79.mongodb.net/?retryWrites=true&w=majority';
const objectId = new ObjectId();
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app
  .use(morgan('tiny'))
  .use(express.json())
  .use(express.static('public'))


  .post('/api/profile', async (req, res) => {
   
    const account = req.body;
    console.log(req.body);
try {
  await client.connect()
  const usersCollection = client.db('UserDatabase').collection('Users');
  const user = await usersCollection.findOne({ email: account.email });
  if (user) {
    res.status(200).json({status: 200, user});
    console.log(`User ${account.email} already exists in MongoDB`);
  } else {
    console.log("adding a new user");
    const newUser = {
      _id: account.email,
      email: account.email,
      name: account.name,
      favoriteTeams: []
    }
    await usersCollection.insertOne(newUser);  
    res.status(201).json({status: 201, user: newUser})
  }

} catch(error){
console.log(error);
res.status(400).json({status: 400, error});
} finally {
  client.close()
}
   
  })

  .patch('/api/user/add/favorite-team/:id', async (req, res) => {
    try {
      const teamId = req.params.id;
      const account = req.body;
      console.log(req.body);

      await client.connect();
      const usersCollection = client.db('UserDatabase').collection('Users');

      const foundUser = await usersCollection.findOne({ email: account.email });
      if (!foundUser){
       return res.status(404).json({ status: 404, message: 'user not found'})
      } else if (foundUser.favoriteTeams.includes(teamId)){
        return res.status(409).json({ status: 409, message : "team is already a favorite"})
      }
      const user = await usersCollection.updateOne(
        { email: account.email },
        { $push: { favoriteTeams: teamId } }
      );
      if (user.modifiedCount === 0) {
        res.status(400).json({
          status: 400,
          message: `User ${account.email} change not made`,
        });
        console.log(`User ${account.email} not found in MongoDB`);
        return;
      }
      res.sendStatus(204);
      console.log(`Team ${teamId} added to the favorite teams of user ${account.email}`);
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: 400, error });
    } finally {
      client.close();
    }
  })

  .patch('/api/user/remove/favorite-team/:id', async (req, res) => {
    try {
      const teamId = req.params.id;
      const account = req.body;
      console.log(req.body);

      await client.connect();
      const usersCollection = client.db('UserDatabase').collection('Users');

      const foundUser = await usersCollection.findOne({ email: account.email });
      if (!foundUser){
       return res.status(404).json({ status: 404, message: 'user not found'})
      } else if (!foundUser.favoriteTeams.includes(teamId)){
        return res.status(409).json({ status: 409, message : "team is not a favorite"})
      }
      const user = await usersCollection.updateOne(
        { email: account.email },
        { $pull: { favoriteTeams: teamId } }
      );
      if (user.modifiedCount === 0) {
        res.status(400).json({
          status: 400,
          message: `User ${account.email} change not made`,
        });
        console.log(`User ${account.email} not found in MongoDB`);
        return;
      }
      res.sendStatus(204);
      console.log(`Team ${teamId} added to the favorite teams of user ${account.email}`);
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: 400, error });
    } finally {
      client.close();
    }
  })


  .get('*', (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(8000, () => console.log(`Listening on port 8000`));