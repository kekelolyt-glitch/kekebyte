const express = require("express");
const router = express.Router();

router.get("/:domain", async (req,res)=>{

try{
let r = await fetch("https://rdap.org/domain/"+req.params.domain);
let d = await r.json();
res.json(d);
}catch(e){
res.json({error:"WHOIS FAIL"});
}

});

module.exports = router;
