async function patreg() {
    let user = document.getElementById("name").value;
    let mobile= document.getElementById("mobile").value;
    let email= document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    console.log(user,pass,mobile,email);
    let data1;
    let data;
     await fetch("http://127.0.0.1:8111/med/user/registration", {
      headers: {
        "Content-type": "application/json",
        'Connection': "keep-alive",
        "Accept-Encoding": "gzip, deflate, br",
        'Accept': "*/*",
        "User-Agent": "PostmanRuntime/7.31.1",
      },
      method: "POST",
      body: JSON.stringify({
        Name: user,
        Mobile:mobile,
        Email:email,
        Password: pass,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
      //   data = JSON.parse(json);
      data=JSON.stringify(json);
      data1=JSON.parse(data);
        // console.log(data1[0].Success);
      });
      if(data1.Sccess==true){
    //   localStorage.setItem("user",(data));
  //   document.write("logged in");
        alert("Registration Successfull,Login To Continue")
    location.assign('welcome.html')}
    else{
      alert("error")
    }
  }