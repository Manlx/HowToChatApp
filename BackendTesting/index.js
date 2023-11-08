import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:8080');

const data = {
  data: {
    name: 'Manuel.exe'
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