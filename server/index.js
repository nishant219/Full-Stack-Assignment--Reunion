const express=require('express');
const app=express();

const port=5000;

app.get('/api/hello',(req,res)=>{
    res.send({message:'Hello Express!'});
});

app.listen(port,()=>console.log(`Listening on port ${port}`));

