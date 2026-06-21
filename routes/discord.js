const express = require("express");
const router = express.Router();

router.get("/:id", async (req,res)=>{

try{
let r = await fetch("https://discordlookup.mesalytic.moe/v1/user/"+req.params.id);
let d = await r.json();
res.json(d);
}catch(e){
res.json({error:"DISCORD FAIL"});
}

});

module.exports = router;
