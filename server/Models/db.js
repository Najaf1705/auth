const mongoose=require('mongoose');

const mongoose_url=process.env.MONGO_CONN;

// mongoose.connect(mongoose_url)
//     .then(()=>{
//         console.log("Mongo connected");
//     }).catch((err)=>{
//         console.log(`Cant connect to mongo due to ${err}`);
//     })

const con=async()=>{
    try{
        await mongoose.connect(mongoose_url);
        console.log("connected");
    }catch(err){
        console.log(err);
    }
}

con();