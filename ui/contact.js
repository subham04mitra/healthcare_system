async function send(){
    let Name=document.getElementById("name").value;
    let Mobile=document.getElementById("mobile").value;
    let Message=document.getElementById("msg").value;
    await fetch("http://127.0.0.1:8111/med/sendmail", {
      headers: {
        "Content-type": "application/json",
        'Connection': "keep-alive",
        "Accept-Encoding": "gzip, deflate, br",
        'Accept': "*/*",
        "User-Agent": "PostmanRuntime/7.31.1",
        // "token":token
      },
      method: "POST",
      body: JSON.stringify({
        name:Name,
        mobile:Mobile,
        message:Message,
        date:new Date().toISOString().slice(0,16)
      }),
    }).then((response)=>
    response.json()).then((json)=>{alert(json.Message)
        document.getElementById('name').value="";
        document.getElementById('mobile').value="";
        document.getElementById('msg').value="";

        
    })
}