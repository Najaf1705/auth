const userModel = require("../Models/UserSchema");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const signup=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const user=await userModel.findOne({email});
        if(user){
            return res.status(409).json({
                message: 'user already exists',
                success: false,
            })
        }
        const userObj=new userModel({name,email,password});
        userObj.password=await bcrypt.hash(password,10);
        await userObj.save();
        res.status(201).json({
            message: "Signup succesful",
            success: true,
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            success: false,
        }) 
    }
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
        if(!user){
            res.status(403).json({
                message: "password or email is wrong",
                success: false,
            })
        }
        const isPassEql=await bcrypt.compare(password,user.password);
        if(!isPassEql){
            res.status(403).json({
                message: "password or email is wrong",
                success: false,
            })
        }
        const jwtToken=jwt.sign(
            {email:user.email,id: user._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )

        res.status(200).json({
            message: `Login successful`,
            success: true,
            jwtToken,
            email,
            name: user.name
        })

    } catch (error) {
        res.status(403).json({
            message: "error in loging in",
            success: false,
            error
        })
    }
}

module.exports={
    signup,login
}