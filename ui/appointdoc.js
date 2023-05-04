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


async function logout(){
    let data=localStorage.getItem('user');
    let data1=JSON.parse(data)
    let token=data1.token
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
var docdata;
async function appoint(){
    let data=localStorage.getItem('user');
    // console.log(typeof data);
    let data1=JSON.parse(data)
    console.log(data1);
    let token=data1.Token
    // console.log(token);
    
    await fetch("http://127.0.0.1:8111/med/user/appoint", {
    headers: {
      "Content-type": "application/json",
      'Connection': "keep-alive",
      "Accept-Encoding": "gzip, deflate, br",
      'Accept': "*/*",
      "User-Agent": "PostmanRuntime/7.31.1",
      "token":token
      
    },
    method: "GET",
    // body: JSON.stringify({
    //   Email: z.Data[0].Email,
      
    
    // })
  }).then((response)=>
  response.json()).then((json)=>{
    docdata=json.Data
   console.log("json",json)   
  })
  console.log(data);
  
  var li = "<table>";

        li += "<thead>";

        li += "<th>" + "Name" + "</th>";
    
        li += "<th>" + "Speciality" + "</th>";
        li += "<th>" + "Mobile" + "</th>";
        li += "<th>" + "Address" + "</th>";
        li += "<th>" + "Book Now" + "</th>";
        
        li += "</thead>";
        for(let i=0;i<docdata.length;i++){           
            li += `<tr>
             
              <td>${docdata[i].Name} </td>
              <td>${docdata[i].Specialization}</td>
              <td>${docdata[i].Mobile}</td>
             
              <td>${docdata[i].Address}</td>
              
              <td><span style="font-size:40px" class="fa fa-user-md" onclick="openPopup(${i})"></span></td> 
         
        </tr>`;
        }
        document.getElementById("table").innerHTML = li;
}
appoint();
// var doc_name;
// var doc_emais;
function openPopup(d){
  document.getElementById("myForm").style.display = "block";
  localStorage.setItem('doctor',JSON.stringify(docdata[d]))
  console.log(docdata[d]);

}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  popup.classList.remove("open-popup");
}
async function confirmappointment(aa){
  console.log(aa);
  
  // console.log(x);
  let date=document.getElementById("date").value;
  let time=document.getElementById("time").value;
  let mode=document.getElementById("mode").value;
  let userstr=localStorage.getItem('user');
  let docstr=localStorage.getItem('doctor');
  let doc=JSON.parse(docstr);
  let user=JSON.parse(userstr)
  console.log(doc);
  let pat_name=user.Data[0].Name;
  let pat_email=user.Data[0].Email;
  let obj={
    date:date,time:time,mode:mode,pat_name:pat_name,pat_email:pat_email,doc_name:doc.Name,
    doc_email:doc.Email
  }
  await fetch("http://127.0.0.1:8111/med/user/bookappoin", {
        headers: {
          "Content-type": "application/json",
          'Connection': "keep-alive",
          "Accept-Encoding": "gzip, deflate, br",
          'Accept': "*/*",
          "User-Agent": "PostmanRuntime/7.31.1",
          "token":user.Token
        },
        method: "POST",
        body: JSON.stringify({
          data:obj

        })
      }).then((response)=>{
        alert("Appoitment Done !")
        document.getElementById("date").value='';
  document.getElementById("time").value='';
  mode=document.getElementById("mode").value='';
  closeForm()
      })
      // response.json()).then((json)=>{
      //   console.log("diago json",json);
      //   data=JSON.stringify(json)
      //   localStorage.setItem('result',data)
      // location.assign('diagoresult.html');
          
      }


