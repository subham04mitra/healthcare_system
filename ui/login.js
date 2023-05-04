async function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    let type=document.getElementsByName("type");
    var typ;
    for(i = 0; i < type.length; i++) {
      if(type[i].checked)
     typ=type[i].value;
  }
    console.log(type);
    let data1;
    let data;
    if(typ=='patient'){
     await fetch("http://127.0.0.1:8111/med/user/login", {
      headers: {
        "Content-type": "application/json",
        'Connection': "keep-alive",
        "Accept-Encoding": "gzip, deflate, br",
        'Accept': "*/*",
        "User-Agent": "PostmanRuntime/7.31.1",
      },
      method: "POST",
      body: JSON.stringify({
        Email: user,
        Password: pass,
      }),
    })
      .then((response) => response.json())
      .then((json) => {console.log(json);
      //   data = JSON.parse(json);
      data=JSON.stringify(json);
      data1=JSON.parse(data);
        console.log("user",data);
      });
      if(data1.Success==true){
      localStorage.setItem("user",(data));
  //   document.write("logged in");

    location.assign('patientuse copy.html')}
    else{
      alert("error")
    }}
    else if(typ=='doctor'){
      await fetch("http://127.0.0.1:8111/med/doctor/login", {
        headers: {
          "Content-type": "application/json",
          'Connection': "keep-alive",
          "Accept-Encoding": "gzip, deflate, br",
          'Accept': "*/*",
          "User-Agent": "PostmanRuntime/7.31.1",
        },
        method: "POST",
        body: JSON.stringify({
          Email: user,
          Password: pass,
        }),
      })
        .then((response) => response.json())
        .then((json) => {console.log(json);
        //   data = JSON.parse(json);
        data=JSON.stringify(json);
        data1=JSON.parse(data);
          console.log(data);
        });
        if(data1.Success==true){
        localStorage.setItem("user",(data));
    //   document.write("logged in");
  
      location.assign('profile1.html')}
      else{
        alert("error")
      }
    }
  }
//   async function logout(){
//     let token=localStorage.getItem('user1');
//     await fetch("http://127.0.0.1:8111/med/user/login/logout", {
//       headers: {
//         "Content-type": "application/json",
//         'Connection': "keep-alive",
//         "Accept-Encoding": "gzip, deflate, br",
//         'Accept': "*/*",
//         "User-Agent": "PostmanRuntime/7.31.1",
//         "token":token
//       },
//       method: "POST",
//     //   body: JSON.stringify({
//     //     Email: user,
//     //     Password: pass,
//     //   }),
//     }).then((response)=>
//     response.json()).then((json)=>{console.log(json)
//     location.assign('welcome.html');
//         localStorage.removeItem('user1')
//     })
// }