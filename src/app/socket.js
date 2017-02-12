/**
 * Created by jls on 13/01/17.
 */
import React from 'react';
import SockJS from 'sockjs-client';

class SocketClient extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      comments: [],
      people: []
    };
    this.setState = this.setState.bind(this);
    const sockjsUrl = 'http://localhost:8080/stomp';
    this.sockjs = new SockJS(sockjsUrl);
    this.sockjs.onopen = this._initialize.bind(this);
    this.sockjs.onmessage = this._onMessage.bind(this);
    this.sockjs.onclose = this._onClose.bind(this);
  }

  _initialize() {
    console.log("connected");
  }

  _onMessage(e) {
    console.log(JSON.parse(e.data));
  }

  _onClose() {
    console.log("disconnected");
  }

  render() {
    return (
      <div id="first" className="box">
      </div>
    );
  }
}

export default SocketClient;
