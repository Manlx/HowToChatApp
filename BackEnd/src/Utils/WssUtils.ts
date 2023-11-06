import { IMessageHandlerCollection, IMessageProtocal, IWssWrapper } from 'standards';
import { WebSocketServer, WebSocket } from 'ws';

export function broadCastToAll(Wss: WebSocketServer, Data: string): void{
  Wss.clients.forEach((ws)=>{
    ws.send(Data);
  });
}

export function broadCastToAllExpect(Wss: WebSocketServer, Data: string, Except: WebSocket[]): void{
  Wss.clients.forEach((ws)=>{

    if (Except.includes(ws)){

      return;
    }

    ws.send(Data);
  });
}

export function findChatRoomById(Chatrooms: IWssWrapper[], id: number): (IWssWrapper | undefined | null){
  for (let i = 0; i < Chatrooms.length; i++ ){

    if (Chatrooms[i].roomId == id)
      return Chatrooms[i];
  }

  return undefined;
}

export function handleIncoming(inMess: IMessageProtocal, HandlerCollection: IMessageHandlerCollection){

  const data:object = (typeof inMess.data == 'string' )?JSON.parse(inMess.data):inMess.data;

  HandlerCollection[inMess.protocal]!(data) ;
}