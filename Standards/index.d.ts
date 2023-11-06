import { WebSocketServer } from 'ws';

export interface IWssWrapper{
  wss: WebSocketServer;
  port: number;
  host: string;
  roomId: number;
  roomDescription: string;

  particpants: IParticipant[];

  getChatURL: ()=>string;
}

export interface IParticipant{
  name: string;
}

export enum Protocals{
  JoinUser = 'JoinUser',
  AllMessage = 'AllMessage',
  DirectMessage = 'DirectMessage'
}

export type MessageHandler = (Data: object) => void;

export interface IMessageHandlerCollection{
  [Protocals.JoinUser]?: MessageHandler
  [Protocals.AllMessage]?: MessageHandler
  [Protocals.DirectMessage]?: MessageHandler

}

export interface IMessageProtocal{
  protocal: Protocals;
  data: string|object;
}

export interface IChatManager{
  chatrooms: IWssWrapper[];
  startingPort: number;

  createRoom: () => IWssWrapper;
  getChatRooms: () => IWssWrapper[];
  closeChatRoom: (id: number) => void;
  renameChatRoom: (id: number, name: string) => void;
  getParticipants: (id: number) => IParticipant[];
}