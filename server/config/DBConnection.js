const mongoose=require("mongoose");

mongoose.set('strictQuery', false);

const DBConnection=()=>{
    mongoose.connect(
        process.env.DB_URL,
        {
            useNewUrlParser:true,  
            useUnifiedTopology:true,
        }
    ).then(()=>{
            console.log("___DB connection successful___");
        }
    ).catch((err)=>{
        console.log("DB connection failed");
        console.log(err);
        process.exit(1);
    });
}

module.exports=DBConnection;