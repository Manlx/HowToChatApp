import { WebSocketServer, WebSocket } from "ws";

export function broadCastToAll(Wss: WebSocketServer, Data: string): void{
  Wss.clients.forEach((ws)=>{
    ws.send(Data);
  })
}

export function broadCastToAllExpect(Wss: WebSocketServer, Data: string, Except: WebSocket[]): void{
  Wss.clients.forEach((ws)=>{

    if (Except.includes(ws)){

      return
    }

    ws.send(Data);
  })
}