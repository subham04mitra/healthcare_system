
   
    //     let data=localStorage.getItem('pathis')
    //     let data1=JSON.parse(data)
    //     console.log("data1",data1);
    //     // console.log( data1.Data[0].Email);
    //     // let token=data1.Token
    //     // // console.log(token);
    //     // await fetch("http://127.0.0.1:8111/med/medhistory", {
    //     //     headers: {
    //     //       "Content-type": "application/json",
    //     //       'Connection': "keep-alive",
    //     //       "Accept-Encoding": "gzip, deflate, br",
    //     //       'Accept': "*/*",
    //     //       "User-Agent": "PostmanRuntime/7.31.1",
    //     //     },
    //     //     method: "POST",
    //     //     body: JSON.stringify({
    //     //       Email: data1.Data[0].Email,
    //     //         time:"",
    //     //         token:token
    //     //     }),
    //     //   })
    //     //     .then((response) => response.json())
    //     //     .then((json) => {
    //     //         json.forEach((data) => {
  
    //     //             str.push(data);
    //     //         });
    //     //     });
    //     // console.log(str);

    // // console.log(str);
    // // function display() {
    // //     let userdata=localStorage.getItem('user');
    // //     let meddata=localStorage.getItem('medhis')
    // //     console.log(meddata);
    // var li = "<table>";

    //     li += "<thead>";

        
    
    //     li += "<th>" + "Date" + "</th>";
    //     li += "<th>" + "Symptoms" + "</th>";
    //     li += "<th>" + "Disease" + "</th>";
    //     li += "<th>" + "Medicine" + "</th>";
    //     li += "<th>" + "Advice" + "</th>";
    //     li += "<th>" + "Doctor Name" + "</th>";
    //     li += "<th>" + "Patient Name" + "</th>";
    //     li += "<th>" + "View" + "</th>";
        
    //     li += "</thead>";
    //     data1.Data.forEach((data) => {           
    //         li += `<tr>
             
    //           <td>${data.date} </td>
    //           <td>${data.symtoms}</td>
    //           <td>${data.disease}</td>
    //           <td>${data.medicine}</td>
    //           <td>${data.advise}</td>
    //           <td>${data.docname}</td>
    //           <td>${data.patname} </td>
    //           <td><span class="view-icon">&#xf5a1;</span></td>  
    //         </tr>`;
    //     });
    //     document.getElementById("table").innerHTML = li;
        // x=(json[0]);
    
    // display()
    
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
    async function searchpat(){
      let d=localStorage.getItem('user');
      let z=JSON.parse(d)
      let token=z.Token
      // console.log(token);
      let name=document.getElementById('name').value;
    console.log(name);
      await fetch(`http://127.0.0.1:8111/med/doctor/search/${name}`, {
        headers: {
          "Content-type": "application/json",
          'Connection': "keep-alive",
          "Accept-Encoding": "gzip, deflate, br",
          'Accept': "*/*",
          "User-Agent": "PostmanRuntime/7.31.1",
          "token":token
          
        },
        method: "GET",
        
      }).then((response)=>
      response.json()).then((json)=>{
let data1=json;
 var li = "<table>";

        li += "<thead>";

        
    
        li += "<th>" + "Date" + "</th>";
        li += "<th>" + "Symptoms" + "</th>";
        li += "<th>" + "Disease" + "</th>";
        li += "<th>" + "Medicine" + "</th>";
        li += "<th>" + "Advice" + "</th>";
        li += "<th>" + "Doctor Name" + "</th>";
        li += "<th>" + "Patient Name" + "</th>";
        // li += "<th>" + "View" + "</th>";
        
        li += "</thead>";
        data1.Data.forEach((data) => {           
            li += `<tr>
             
              <td>${data.date} </td>
              <td>${data.symtoms}</td>
              <td>${data.disease}</td>
              <td>${data.medicine}</td>
              <td>${data.advise}</td>
              <td>${data.docname}</td>
              <td>${data.patname} </td>
               
            </tr>`;
        });
        document.getElementById("table").innerHTML = li;
      //   data=JSON.stringify(json)
      //   localStorage.setItem('pathis',data)
      //   console.log(data);
      // location.assign('showpathis.html');
          
      })
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