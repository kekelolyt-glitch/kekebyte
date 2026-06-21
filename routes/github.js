const express = require("express");
const router = express.Router();

router.get("/:user", async (req,res)=>{

try{
let r = await fetch("https://api.github.com/users/"+req.params.user);
let d = await r.json();
res.json(d);
}catch(e){
res.json({error:"GITHUB FAIL"});
}

});

module.exports = router;
