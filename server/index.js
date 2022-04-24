const express = require('express')
const app = express()
const mongoose = require('mongoose')
const UserModel = require('./models/Users')

const cors = require('cors') //allows connection of api to front end without errors

app.use(express.json());
//because body is in json, we need to parse the json into an object.
//if not done, any requests done with the body will give an error because of its json format.
app.use(cors());

mongoose.connect('mongodb+srv://kv2461:LTYGr2zzy86W21Hw@cluster0.htfej.mongodb.net/merntutorial?retryWrites=true&w=majority')

app.get('/getUsers',(req,res) => {
    UserModel.find({}, (err,result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result); //res is info from b -> f, json used to parse and send back results json formatted
        }
    } ) //empty object would mean it returns all the data in the collection.
    //2nd parameter is a callback function that takes in err and result
});
// api requests - connection to database but need to establish a way to request from the database to the front end and front end to db
// aka api endpoints 
// app.get /getUsers (is the route that determines what it is), 2nd parameter is a callback function that takes in two arguments (req and res)
// req and res means request and response, req is information sent from the front end to backend, 
// and res is info from database(backend) to front end

app.post('/createUser', async (req,res) => {
    const user = req.body
    const newUser = new UserModel(user);
    await newUser.save()

    res.json(user) //when everything is done, return back new user created, even though it won't be used
    //just send it back so we know were getting the correct information in our backend
    //always need to use the res variable? that's what the vid said

})
//new route name is /createUser
//we will be using both req and res, cuz front end will have form that will want to post back into database
//to get that data from front end to db, can pass an object (name of object is body)
//body will exist inside the req variable (front end -> db)
//we assume that front end will send some sort of body object, call it user.
//user will represent the data we want to insert to our database
//in order to add data to our collection/model , create a variable called newUser and set it equal to new userModel() and pass user in
//in order to save new info, can only be done if its an async function
//when adding new data,updating data, or deleting data, do await

app.listen(3001, () => {
    console.log('Server is running in 3001');
})

//NOTE use thunderclient to test api requests