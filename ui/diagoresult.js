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

  

let result1=localStorage.getItem('result');
console.log(result1);
let result=JSON.parse(result1)
console.log(result.data.disease);
    document.getElementById("disease").innerText=result.data.disease;
document.getElementById("symtoms").innerText=result.data.symtoms;
document.getElementById("details").innerText=result.data.details;
document.getElementById("advice").innerText=result.data.advice;
document.getElementById("medicine").innerText=result.data.medicine;
document.getElementById("disease").innerText=result.data.disease;
