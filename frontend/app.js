async function login(){


let res =
await fetch("/api/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

username:
document.getElementById("user").value,


password:
document.getElementById("pass").value


})

});


let data =
await res.json();



if(data.success){


localStorage.setItem(
"role",
data.role
);


location.href="dashboard.html";


}else{


alert("Hatalı giriş");

}



}




function page(x){

document.getElementById("title").innerHTML=x;


if(x=="API Status"){

fetch("/api/status")

.then(x=>x.json())

.then(data=>{

document.getElementById("content").innerHTML=

JSON.stringify(data);


});


}


if(x=="Users"){


if(localStorage.role!="admin"){

alert("Admin yetkisi gerekli");
return;

}


fetch("/api/users")

.then(x=>x.json())

.then(data=>{


document.getElementById("content").innerHTML=

JSON.stringify(data);



});


}


}
