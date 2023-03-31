const userModel = require("../models/user.model");
const { json } = require("express");
const bcrypt = require("bcrypt");
const { jwtGen, jwtVerify } = require("../utils/utils");

const registerController = async (req, res) => {
    try {
        const { username, email, password, phone, address } = req.body;
        
        //validations
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
        
        //Check existing or already registered users
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "Already registered! Please login",
            })
        }

        const user = await new userModel({ username, email, phone, address, password: password }).save();
 
        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        })
   }
};

module.exports = {registerController};