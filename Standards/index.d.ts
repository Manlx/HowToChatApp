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

export interface IMessageBody{
  Message: string;
}

export interface IAllMessage{
  Message: IMessageBody
}

export interface IJoinUser{
  NewParticipant: IParticipant
}

export interface IDirectMessage{
  From: IParticipant
  To: IParticipant
  Body: IMessageBody
}

export type IMessageDataType = (IJoinUser | IAllMessage | IDirectMessage)

export interface IMessageProtocal{
  protocal: Protocals;
  data: IMessageDataType;
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