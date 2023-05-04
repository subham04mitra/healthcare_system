let z=localStorage.getItem('user');
function y(z){
    // z=z.toString();
    let z1=JSON.parse(z);
    // document.write(z1)
    console.log(z1);
    // document.getElementById("username").innerText=z1.Data[0].Name;
    document.getElementById("name").innerText=z1.Data[0].Name;
    document.getElementById("mobile").innerText=z1.Data[0].Mobile;
    document.getElementById("id").innerText=z1.Data[0].RegistrationId;
    document.getElementById("address").innerText=z1.Data[0].Address;
    document.getElementById("avl").innerText=z1.Data[0].Avaibility;
    document.getElementById("userpassword").innerText=z1.Data[0].Password;
    console.log(z1);
    // localStorage.setItem('user1',z1)
    // localStorage.removeItem('user')

}
y(z);
// for open offcanvas
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  document.body.style.backgroundColor = "white";
}

// previous

async function logout(){
    let token=localStorage.getItem('user');
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
        localStorage.clear()
    })
}
async function showpathis(){
  // let d=localStorage.getItem('user');
  // let z=JSON.parse(d)
  // let token=z.Token
  // console.log(token);

//   await fetch(`http://127.0.0.1:8111/med/doctor`, {
//     headers: {
//       "Content-type": "application/json",
//       'Connection': "keep-alive",
//       "Accept-Encoding": "gzip, deflate, br",
//       'Accept': "*/*",
//       "User-Agent": "PostmanRuntime/7.31.1",
//       "token":token
      
//     },
//     method: "GET",
    
//   }).then((response)=>
//   response.json()).then((json)=>{
// // let data1=json;

//     data=JSON.stringify(json)
//     localStorage.setItem('pathis',data)
//     console.log(data);
  location.assign('showpathis.html');
      
  }
  async function updateavl(){
    let avlb=document.getElementsByName("avl");
    var avl;
    for(i = 0; i < avlb.length; i++) {
      if(avlb[i].checked)
     avl=avlb[i].value;
  }
  console.log(avl);
    let data=JSON.parse(localStorage.getItem('user'));
    let token=data.Token
    let email=data.Data[0].Email;
    console.log(email,avl);
    if(avl==true){
      document.getElementById("avl").innerText="Available"
    }
    else if(avl==false){
      document.getElementById("avl").innerText="Not Available"
    }
    // =avl=false?"Not Available":"Available";
    await fetch("http://127.0.0.1:8111/med/doctor/updateavl", {
          headers: {
            "Content-type": "application/json",
            'Connection': "keep-alive",
            "Accept-Encoding": "gzip, deflate, br",
            'Accept': "*/*",
            "User-Agent": "PostmanRuntime/7.31.1",
            "token":token
          },
          method: "PUT",
          body: JSON.stringify({
            Email: email,
            data: {Avaibility:avl},
          }),
        }).then((response)=>
        response.json()).then((json)=>{
          console.log(json);
        // location.assign('profile1.html');
        document.getElementById("avl").innerText=avl
            
        })
  }