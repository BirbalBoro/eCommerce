const express = require("express");
const { json } = require("express");
const user = require("../models/user.model");
const { jwtGen, jwtVerify } = require("../utils/utils");
//router object
const authRouter = express.Router();

//Registration or signup
authRouter.post('/signup', (req, res) => {
    
    user.findOne({ email: req.body.email.toLowerCase() }).then((existingUser) => {
    const { username, email, password, phone, address } = req.body;
        //check if the input fields are empty
        if (!username) {
            return res.send({ error: "Name is required" });
        }

        if (!email) {
            return res.send({ error: "Email is required" });
        }

        if (!password) {
            return res.send({ error: "Password is required" });
        }

        if (!phone) {
            return res.send({ error: "Phone number is required" });
        }

        if (!address) {
            return res.send({ error: "Address is required" });
        }
        
        //checking existing or already registered user
        if (existingUser !== null) {
            return res.status(200)
                .json({ error: "This email is already registered! Please Login" });
        }


        user.findOne({ username: req.body.username.toLowerCase() }).then(
            (existingUsername) => {
              if (existingUsername !== null) {
                console.log("sads");
                return res
                  .status(400)
                  .json({ error: "This username already exist!" });
                }
                
                //register new user
              const newUser = new user(req.body);
              newUser.save().then((user) => {
                if (!user) {
                  return res.status(500).json({ error: err });
                }
                const token = jwtGen(user.toObject());
                return res.status(201).json({ success: true, token, user });
              });
            }
        );

    })
});


module.exports = {authRouter};