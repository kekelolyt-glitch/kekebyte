const express = require("express");
const fetch = require("node-fetch");
const app = express();

const TOKEN = "BOT_TOKEN_BURAYA";

app.get("/", (req, res) => {
res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Discord ID Panel</title>
<style>
body{margin:0;background:#0d0f14;color:#fff;font-family:Arial}
.box{max-width:500px;margin:80px auto;background:#151a26;padding:20px;border-radius:10px}
input{width:100%;padding:10px;margin-top:10px;background:#0f1320;border:0;color:#fff}
button{width:100%;padding:10px;margin-top:10px;background:#00ff88;border:0;cursor:pointer}
pre{background:#0f1320;padding:10px;margin-top:10px;overflow:auto}
</style>
</head>
<body>

<div class="box">
<h2>Discord ID Lookup</h2>

<input id="id" placeholder="Discord ID">
<button onclick="go()">SORGULA</button>

<pre id="out">bekleniyor...</pre>
</div>

<script>
async function go(){
let id = document.getElementById("id").value;

let res = await fetch("/api/discord?id=" + id);
let data = await res.json();

document.getElementById("out").innerText =
JSON.stringify(data,null,2);
}
</script>

</body>
</html>
`);
});

app.get("/api/discord", async (req,res)=>{
const id = req.query.id;

if(!id) return res.json({error:"no id"});

try{
const r = await fetch("https://discord.com/api/v10/users/"+id,{
headers:{
Authorization: "Bot "+TOKEN
}
});

if(!r.ok) return res.json({error:"not found / no access"});

const d = await r.json();

res.json({
id: d.id,
username: d.username,
tag: d.discriminator,
avatar: d.avatar
? `https://cdn.discordapp.com/avatars/${d.id}/${d.avatar}.png`
: null
});

}catch(e){
res.json({error:"api error"});
}
});

app.listen(3000, ()=>console.log("http://localhost:3000"));
