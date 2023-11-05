import Express from "express";

const PORT = 8080;

const APIServer = Express();

APIServer.get("/",(req,res)=>{
  res.send("Ello")
})

APIServer.listen(PORT,()=>{
  console.log(`listening on http://localhost:${PORT}`)
})