/**
 * Created by jls on 13/01/17.
 */
import React from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

class SocketClient extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      dht22: {temperature: 0, humidity: 0}
    };

    this.socket = new SockJS('http://nextrun.fr:8084/stomp');
    this.stompClient = Stomp.over(this.socket);

    this.stompClient.connect({}, frame => {
      console.log(`connected, ${frame}!`);
      this.stompClient.subscribe('/queue/DHT22', data => {
        console.log(JSON.parse(data.body).data);
        this.setState({dht22: JSON.parse(data.body).data});
      });
    });
  }

  render() {
    const dht22 = this.state.dht22;
    return (
      <div>
        <h2>Temperature: {dht22.temperature.toFixed(2)} °C</h2>
        <h2>Humidity: {dht22.humidity.toFixed(2)} %</h2>
      </div>
    );
  }
}

export default SocketClient;
