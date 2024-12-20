// code for managing all the client-server interactions

// handles IndexedDB storage, along with BroadcastChannel
class StateManager {

}

class WebsocketServer {
    websocket: WebSocket;
    
    constructor() {
        this.websocket = new WebSocket("ws://localhost:3301/websocket/");
        this.websocket.onmessage = this.onMessageRecieve;
    }

    // message recieved from server, most likely state update
    onMessageRecieve(this: WebSocket, ev: MessageEvent<any>) {
        
    }
}