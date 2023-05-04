
async function logout(){
    let token=localStorage.getItem('user1');
    await fetch("http://127.0.0.1:8111/med/user/login/logout", {
      headers: {
        "Content-type": "application/json",
        'Connection': "keep-alive",
        "Accept-Encoding": "gzip, deflate, br",
        'Accept': "*/*",
        "User-Agent": "PostmanRuntime/7.31.1",
        "token":token
      },
      method: "POST",
    //   body: JSON.stringify({
    //     Email: user,
    //     Password: pass,
    //   }),
    }).then((response)=>
    response.json()).then((json)=>{console.log(json)
    location.assign('welcome.html');
        localStorage.removeItem('user1')
    })
}