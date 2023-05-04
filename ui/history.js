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

   
       
        // console.log( data1.Data[0].Email);
        // let token=data1.Token
        // // console.log(token);
        // await fetch("http://127.0.0.1:8111/med/medhistory", {
        //     headers: {
        //       "Content-type": "application/json",
        //       'Connection': "keep-alive",
        //       "Accept-Encoding": "gzip, deflate, br",
        //       'Accept': "*/*",
        //       "User-Agent": "PostmanRuntime/7.31.1",
        //     },
        //     method: "POST",
        //     body: JSON.stringify({
        //       Email: data1.Data[0].Email,
        //         time:"",
        //         token:token
        //     }),
        //   })
        //     .then((response) => response.json())
        //     .then((json) => {
        //         json.forEach((data) => {
  
        //             str.push(data);
        //         });
        //     });
        // console.log(str);

    // console.log(str);
    // function display() {
    //     let userdata=localStorage.getItem('user');
    //     let meddata=localStorage.getItem('medhis')
    //     console.log(meddata);

    var data1;
 async function medical(){
    let d=localStorage.getItem('user');
    let z=JSON.parse(d)
    let token=z.Token
    // console.log(token);
    
    
    await fetch("http://127.0.0.1:8111/med/user/medhistory", {
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
        Email: z.Data[0].Email,
        
      
      }),
    }).then((response)=>
    response.json()).then((json)=>{
      data1=json})
      console.log(data1);
    var li = "<table>";

        li += "<thead>";

        li += "<th>" + "Date" + "</th>";
    
        li += "<th>" + "Symtoms" + "</th>";
        li += "<th>" + "Disease" + "</th>";
        li += "<th>" + "Doctor's Name" + "</th>";
        li += "<th>" + "View" + "</th>";
        
        li += "</thead>";
        // console.log(data1.Data);
        for(let i=0;i<data1.Data.length;i++) {           
            li += `<tr>
             
              <td>${data1.Data[i].date} </td>
              <td>${data1.Data[i].symtoms}</td>
              <td>${data1.Data[i].disease}</td>
             
              <td>${data1.Data[i].docname}</td>
              
              <td><span class="view-icon" onclick="test(${i})">&#128065;</span></td>  
            </tr>`;
        };
        document.getElementById("table").innerHTML = li;
        // x=(json[0]);
      }
      medical();
    // display()
    // function closeForm() {
    //   document.getElementById("myForm").style.display = "none";
    //   popup.classList.remove("open-popup");
    // }
// function viewdata(i){
//   document.getElementById("myForm").style.display = "block";
//   let view=data1.Data[i];
//   console.log(view);
//   document.getElementById('symtoms').innerText=view.symtoms;
//   document.getElementById('disease').innerText=view.disease;
//   document.getElementById('advice').innerText=view.advise;
//   document.getElementById('medicine').innerText=view.medicine;
//   document.getElementById('name').innerHTML=view.patname;
//   document.getElementById('doctor').innerText=view.docname;
// }

// function GeneratePdf() {
  
//   var element = document.getElementById('myForm');
//   console.log(element);
//   html2pdf(element);}
function test(i){
  window.location.href = 'download/htmltopdf/htmltopdf.html'
  localStorage.setItem('download',JSON.stringify(data1.Data[i]))
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