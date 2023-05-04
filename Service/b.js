
module.exports= function xx(){
    const process=spawn('python',['MLAlgo.py',"Vomiting,Yellowish Skin,Itching"]);
    process.stdout.on('data',(data)=>{
    
      mystr=data.toString();
      // myjson=JSON.parse(mystr);
      console.log(mystr);
      return(mystr)
    })

}