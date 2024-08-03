const router = require("express").Router();
const User = require("../model/users");
const bcrypt = require("bcrypt");

//register
router.post("/register" , async (req , res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password , salt);

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
            city:req.body.city,
            zip:req.body.zip,
            country:req.body.country
        });
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(error){
        res.status(500).json("Oops! Something went wrong");
    }
});

//login
router.post("/login" , async (req , res) => {
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            res.status(404).json("User doesn't exists");
        }else{
            const validPassword = await bcrypt.compare(req.body.password , user.password);
            if(!validPassword){
                res.status(400).json("Enter valid password");
            }else{
                res.status(200).json(user);
            }
        }
    }catch(error){
        res.status(500).json("Oops! something went wrong");
    }
});

//update user's location data
router.put("/update/:id" , async (req , res) => {
    const locationData = {
        city:req.body.city,
        zip:req.body.zip,
        country:req.body.country
    }
    try{
        await User.findByIdAndUpdate(req.params.id , {
            $set:locationData
        });
        res.status(200).json("Location data update successfully");
    }catch(error){
        res.status(500).json("Oops! Somrthing went wrong");
    }
});

module.exports = router;