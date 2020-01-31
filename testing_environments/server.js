const WebSocket = require('ws');

let wss = new WebSocket.Server({port: 8181});

let users = {};

wss.on('connection', (connection) => {
    console.log('user connected');
    
    connection.on('message', (message) => {
        
        let data;
        
        // Parses incoming messages to JSON
        try{
            data = JSON.parse(message)
        } catch (e) {
            console.log('invalid message');
            data = {};
        }
        
        
        
        
    })
    
    connection.on('close', () => {
        if(connection.name) {
            delete users[connection.name]
        }
    })
    
    connection.send('connected')
})


// send helper
const sendTo = (connection, message) => {
    connection.send(JSON.stringify(message));
}