const joi=require('joi');

const signupValidation=(req,res,next)=>{
    const schema=joi.object({
        name:joi.string().min(3).max(20).required(),
        email:joi.string().email().required(),
        password:joi.string().min(3).max(20).required(),
    });
    const {err}=schema.validate(req.body);
    if(err){
        return res.status(400).json({message:'bad reqwt',err});
    }
    next();
}

const loginValidation=(req,res,next)=>{
    const schema=joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(3).max(20).required(),
    });
    const {err}=schema.validate(req.body);
    if(err){
        return res.status(400).json({message:'bad reqwt',err});
    }
    next();
}

module.exports={
    signupValidation,loginValidation
}