// open-close function
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


 async function submit(){
    let d=localStorage.getItem('user');
let z=JSON.parse(d)
let token=z.Token
let sym1=document.getElementById("sym1").value;
  let sym2=document.getElementById("sym2").value;
  let sym3=document.getElementById("sym3").value;
  let sym4=document.getElementById("sym4").value;
  let sym5=document.getElementById("sym5").value;
  let sym6=document.getElementById("sym6").value;
  let symtoms=[]
  if(sym1!='None'){
    symtoms.push(sym1)
  }
  if(sym2!='None'){
    symtoms.push(sym2)
  }
  if(sym3!='None'){
    symtoms.push(sym3)
  }
  if(sym4!='None'){
    symtoms.push(sym4)
  }
  if(sym5!='None'){
    symtoms.push(sym5)
  }
  if(sym6!='None'){
    symtoms.push(sym6)
  }
  console.log(symtoms.toString());
    console.log("submit called");
    await fetch("http://127.0.0.1:8111/med/user/test", {
        headers: {
          "Content-type": "application/json",
          'Connection': "keep-alive",
          "Accept-Encoding": "gzip, deflate, br",
          'Accept': "*/*",
          "User-Agent": "PostmanRuntime/7.31.1",
          "token":token
          
        },
        method: "POST",
        body: JSON.stringify({
          symtom:symtoms.toString()
          
      
        }),
      }).then((response)=>
      response.json()).then((json)=>{
        console.log("diago json",json);
        data=JSON.stringify(json)
        localStorage.setItem('result',data)
      location.assign('diagoresult.html');
          
      })
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