import { WebSocketServer } from 'ws';

export class WssWrapper{

  wss: (WebSocketServer|null) = null;
  port: number = 8080;  
  roomId: number = 0;
  roomDescription: string = '';

  constructor(port:number = 8080, roomId = 0, roomDescription = 'New Chatroom'){
    this.wss = new WebSocketServer({
      port: port,
      perMessageDeflate: {
        zlibDeflateOptions: {
          // See zlib defaults.
          chunkSize: 1024,
          memLevel: 7,
          level: 3
        },
        zlibInflateOptions: {
          chunkSize: 10 * 1024
        },
        // Other options settable:
        clientNoContextTakeover: true, // Defaults to negotiated value.
        serverNoContextTakeover: true, // Defaults to negotiated value.
        serverMaxWindowBits: 10, // Defaults to negotiated value.
        // Below options specified as default values.
        concurrencyLimit: 10, // Limits zlib concurrency for perf.
        threshold: 1024 // Size (in bytes) below which messages
        // should not be compressed if context takeover is disabled.
      }
    });

    this.port = port;

    this.roomDescription = roomDescription;
    this.roomId = roomId;

    this.wss.addListener('connection',(ws)=>{
      console.log(`User connected to: ${this.roomDescription}\nID: ${this.roomId}\nNow hosting: ${this.wss?.clients.size} ${(this.wss?.clients.size == 1)?'Client':'Clients'}\nOn Port: ${this.port}`);
    });
  }
}

export class ChatManager{

  chatrooms:WssWrapper[] = [];
  startingPort:number = 8081;

  constructor(){}

  createRoom(){

    this.chatrooms.push(new WssWrapper(this.startingPort + this.chatrooms.length));
    
    return this.chatrooms[this.chatrooms.length-1];
  }
}

export default ChatManager;