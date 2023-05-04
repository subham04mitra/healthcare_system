// open-close function

// let z=localStorage.getItem('user');
function y(){
    // z=z.toString();
    let z=localStorage.getItem('user');
    let z1=JSON.parse(z);
    // document.write(z1)
    document.getElementById("username").innerText=z1.Data[0].Name;
    document.getElementById("name").innerText=z1.Data[0].Name;
    document.getElementById("mobile").innerText=z1.Data[0].Mobile;
    document.getElementById("email").innerText=z1.Data[0].Email;
    document.getElementById("userpassword").innerText=z1.Data[0].Password;
    console.log(z1);
    // localStorage.setItem('user1',z1)
    // localStorage.removeItem('user')

}
y();
function openPopup() {
  // console.log("hello");
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  popup.classList.remove("open-popup");
}
async function logout(){
    let data=localStorage.getItem('user');
    let token=data.token
    console.log(token);
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
        localStorage.clear();
    })
}
async function medical(){

  location.assign('history.html');
      

}
async function diago(){
  location.assign('diago.html')
}
async function appoint(){
  location.assign('appointdoc.html')
}
async function showappoint(){
  
  location.assign('showappoint.html');
      
  }
 

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