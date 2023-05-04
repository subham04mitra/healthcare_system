
const express=require('node:express')
const spawn=require('child_process').spawn;
const app=express()

const port=8888;
app.listen(port,console.log("on"))
app.post('/test',(req,res)=>{
  var x=req.body;
  console.log("a symtom",JSON.parse(x));
  res.send(x)
  const process=spawn('python',['MLAlgo.py',symtoms]);
  process.stdout.on('data',(data)=>{
  
    mystr=data.toString();
    // myjson=JSON.parse(mystr);
    console.log("anresult",mystr);
    res.send(mystr)
  })
})  
