import Express from 'express';
import ChatManager from './models/chatHolder';

const PORT = 8081;

const APIServer = Express();

const chatManagerObj = new ChatManager();

APIServer.get('/',(req,res)=>{
  res.send('Ello');
});

APIServer.post('/chatRoom',(req,res)=>{
  res.send(chatManagerObj.createRoom().getChatURL());
});

APIServer.get('/chatrooms',(req,res)=>{
  
});

APIServer.listen(PORT,()=>{
  console.log(`listening on http://localhost:${PORT}`);
});

console.log(
  chatManagerObj.createRoom().getChatURL()
);
