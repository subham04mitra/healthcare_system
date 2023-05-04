const spawn=require('child_process').spawn;
const axios=require('axios')
const express=require('express');
const route=express.Router();
const home=require('../API/api-route/api_route');
route.use('/med',home);
route.get('/test',(req,res)=>{
    axios.get('http://127.0.0.1:8888/test')
    .then((response) => {
      console.log(response);
      let datao=response.data
      res.send(JSON.stringify(datao))
    })
})
  
module.exports=route;
