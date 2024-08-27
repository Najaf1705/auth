const ensureAuthentication = require('../Middlewares/Auth');

const router=require('express').Router();

router.get("/",ensureAuthentication,(req,res)=>{
    res.status(200).json([
        {
            name: "mobile",
            price: 20000,
        },
        {
            name: "TV",
            price: 15000,
        },
    ])
});

module.exports=router;