const express=require('express')
const bodyparser=require('body-parser')
const spawn=require('child_process').spawn;
const port=8888
const app=express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.post('/test',(req,res)=>{
    let data=req.body.symtom;
    console.log("...............",data,typeof data);
    const process=spawn('python',['model.py',data]);
  process.stdout.on('data',(data)=>{
    // console.log(data);
  console.log("exit");
    // let mystr=(data)
    // myjson=JSON.parse(mystr);
    console.log("anresult",JSON.parse(data),typeof data);
    res.send(JSON.parse(data))
    // console.log(mystr);
})})
app.listen(port,(err)=>{
    if(err){
        console.log("serror");
    }
    console.log("Server running in 8888..");
})