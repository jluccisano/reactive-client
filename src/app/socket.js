/**
 * Created by jls on 13/01/17.
 */
import React from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

class SocketClient extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.socket = new SockJS('http://localhost:8084/stomp');
    this.stompClient = Stomp.over(this.socket);

    this.stompClient.connect({}, function (frame) {
      console.log(`connected, ${frame}!`);
      this.stompClient.subscribe('/queue/DHT22', greeting => {
        console.log(JSON.parse(greeting.body).content);
      });
    });
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default SocketClient;
