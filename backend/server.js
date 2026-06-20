const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("frontend"));


app.post("/api/login",(req,res)=>{

let users =
JSON.parse(fs.readFileSync("./backend/users.json"));

let user =
users.find(x =>
x.username == req.body.username &&
x.password == req.body.password
);


if(user){

return res.json({
success:true,
username:user.username,
role:user.role
});

}


res.json({
success:false
});


});



app.get("/api/status",(req,res)=>{

res.json({

server:"online",
api:"active",
version:"v1"

});

});



app.get("/api/users",(req,res)=>{

let users =
JSON.parse(fs.readFileSync("./backend/users.json"));

res.json(users);

});



app.listen(3000,()=>{

console.log("KekeIntel Server 3000");

});
