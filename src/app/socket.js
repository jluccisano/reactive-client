/**
 * Created by jls on 13/01/17.
 */
import React from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import ReactD3Basic from 'react-d3-basic';

class SocketClient extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      dht22: {temperature: 0, humidity: 0},
      LineChart: ReactD3Basic.LineChart,
      data: [
        {
          age: 39,
          index: 0
        },
        {
          age: 38,
          index: 1
        }
      ],
      chartSeries: [{
        field: 'age',
        name: 'Age',
        color: '#ff7f0e',
        style: {
          "stroke-width": 2,
          "stroke-opacity": 0.2,
          "fill-opacity": 0.2
        }
      }]
      x(d) {
        return d.index;
      }
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

    fetch("http://127.0.0.1:8084/api/v1/sensor/continuous", {
      method: 'get',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    });
  }

  render() {
    const dht22 = this.state.dht22;
    const chartSeries = this.state.chartSeries;
    const data = this.state.data;
    const LineChart = this.state.LineChart;
    const x = this.state.x;

    return (
      <div>
        <h2>Temperature: {dht22.temperature.toFixed(2)} °C</h2>
        <h2>Humidity: {dht22.humidity.toFixed(2)} %</h2>
        <LineChart width={600} height={300} data={data} chartSeries={chartSeries} x={x}/>
      </div>
    );
  }
}

export default SocketClient;
