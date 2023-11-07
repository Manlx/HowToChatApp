import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:8080');

const data = {
  data: {
    message: 'Hi this is the message'
  },
  protocal: 'JoinUser'
};

ws.on('error', console.error);

ws.on('open', function open() {
  ws.send(JSON.stringify(data));
});

ws.on('message', function message(data) {
  console.log('received: %s', data);
});