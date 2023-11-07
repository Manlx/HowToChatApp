import { IChatManager, IMessageProtocal, IParticipant, IWssWrapper } from 'standards';
import { WebSocketServer } from 'ws';
import { findChatRoomById, handleIncoming } from '../Utils/WssUtils';

export class WssWrapper implements IWssWrapper{

  port = 8080;
  host = 'ws://localhost';
  roomId = 0;
  roomDescription = '';
  wss: WebSocketServer;
  particpants: IParticipant[];
  
  constructor(port:number = 8080, roomId = 0, roomDescription = 'New Chatroom'){
    this.particpants = [];

    this.wss = new WebSocketServer({
      port: port,
      // perMessageDeflate: {
      //   zlibDeflateOptions: {
      //     // See zlib defaults.
      //     chunkSize: 1024,
      //     memLevel: 7,
      //     level: 3
      //   },
      //   zlibInflateOptions: {
      //     chunkSize: 10 * 1024
      //   },
      //   // Other options settable:
      //   clientNoContextTakeover: true, // Defaults to negotiated value.
      //   serverNoContextTakeover: true, // Defaults to negotiated value.
      //   serverMaxWindowBits: 10, // Defaults to negotiated value.
      //   // Below options specified as default values.
      //   concurrencyLimit: 10, // Limits zlib concurrency for perf.
      //   threshold: 1024 // Size (in bytes) below which messages
      //   // should not be compressed if context takeover is disabled.
      // }
    });

    this.port = port;

    this.roomDescription = roomDescription;
    this.roomId = roomId;

    this.wss.addListener('connection',(ws)=>{
      console.log(`User connected to: ${this.roomDescription}\nID: ${this.roomId}\nNow hosting: ${this.wss?.clients.size} ${(this.wss?.clients.size == 1)?'Client':'Clients'}\nOn Port: ${this.port}`);

      ws.addListener('message',(data)=>{

        const structData:IMessageProtocal = JSON.parse(data.toString());
        
        handleIncoming(structData,{
          
          AllMessage: (Data)=>{
            
            console.log(Data);
          },
          DirectMessage: (Data) => {

            console.log(Data);
          },
          JoinUser: (Data) => {

            console.log(Data);
          }
        });
      });
    });
  }

  getChatURL(){
    return `${this.host}:${this.port}`;
  }
}

export class ChatManager implements IChatManager{

  startingPort:number = 8080;
  chatrooms: IWssWrapper[];

  constructor(){
    this.chatrooms = [];
  }

  closeChatRoom(){
    
  }
  
  renameChatRoom(id: number, name: string){

    const room = findChatRoomById(this.chatrooms,id);
    
    if (room)
    {
      room.roomDescription = name;
    }
  }

  getParticipants (id: number): IParticipant[]{

    const room = findChatRoomById(this.chatrooms,id);
    
    if (room)
    {
      return room.particpants;
    }
    
    return [];
  }

  createRoom(){

    this.chatrooms.push(new WssWrapper(this.startingPort + this.chatrooms.length));
    
    return this.chatrooms[this.chatrooms.length-1];
  }

  getChatRooms(){
    
    return this.chatrooms;
  }
}

export default ChatManager;