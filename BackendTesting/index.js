import WebSocket from 'ws';
import { Protocals } from 'standards';

const mySocket = new WebSocket('ws://localhost:8081');

const data = {
  data: {
    message: 'Hi this is the message'
  },
  protocal: Protocals.AllMessage
};

mySocket.send(JSON.stringify(data));