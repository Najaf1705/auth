const jwt=require('jsonwebtoken');

const ensureAuthentication=(req,res,next)=>{
    const auth=req.headers['authorization'];
    if(!auth){
        res.status(403).json({
            message: 'Unauthorized'
        })
    }
    try {
        const verifiedJWT=jwt.verify(auth,process.env.JWT_SECRET);
        req.user=verifiedJWT;
        next();
    } catch (error) {
        res.status(403).json({
            message: 'Unauthorized JWT expired or wrong' 
        })
    }
}

module.exports=ensureAuthentication;