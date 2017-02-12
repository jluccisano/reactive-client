/**
 * Created by jls on 13/01/17.
 */
import React from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Request from 'es6-request';
import {LineChart} from 'react-d3-basic';
import d3 from 'd3';

class SocketClient extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      dht22: {temperature: 0, humidity: 0},
      dataProvider: []
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

  componentDidMount() {
    Request.get("http://localhost:8084/api/v1/sensor/dht22/fresh/raspberry_1")
      .then(response => {
        console.log(JSON.parse(response[0]));
        this.setState({dht22: JSON.parse(response[0])});
      });
    Request.get("http://localhost:8084/api/v1/sensor/dht22/continuous/raspberry_1?sample=1h&range=12h")
      .then(response => {
        this.setState({dataProvider: JSON.parse(response[0]).items});
      });
    Request.get("http://localhost:8084/api/v1/sensor/dht22/continuous/raspberry_1?sample=1d&range=7d")
      .then(response => {
        this.setState({lastWeekData: JSON.parse(response[0]).items});
      });
  }

  render() {
    const dht22 = this.state.dht22;
    const dataProvider = this.state.dataProvider;
    const lastWeekData = this.state.lastWeekData;

    const chartSeries = [
      {
        field: 'mean_temperature',
        name: 'Temperature',
        color: '#ff7f0e',
        style: {
          strokeWidth: 2,
          strokeOpacity: 0.2,
          fillOpacity: 0.2
        }
      },
      {
        field: 'mean_humidity',
        name: 'Humidity',
        color: '#65b2ff',
        style: {
          strokeWidth: 2,
          strokeOpacity: 0.2,
          fillOpacity: 0.2
        }
      }
    ];

    function Rows(lastWeekData) {
      if (lastWeekData.data) {
        const rows = lastWeekData.data.map((row, i) => {
          return (
            <tr key={i}>
              {Object.keys(row).map((col, j) => {
                return <td key={j}>{row[col]}</td>;
              })}
            </tr>
          );
        });
        return (
          <tbody>{rows}</tbody>
        );
      }
      return null;
    }

    const parseISODate = d3.time.format('%Y-%m-%dT%H:%M:%SZ').parse;

    const x = function (d) {
      return parseISODate(d.time);
    };
    return (
      <div>
        <h2>Temperature: {dht22.temperature.toFixed(2)} °C</h2>
        <h2>Humidity: {dht22.humidity.toFixed(2)} %</h2>
        <LineChart width={1900} height={300} data={dataProvider} chartSeries={chartSeries} x={x} xScale={"time"} yScale={"linear"}/>
        <table>
          <Rows data={lastWeekData}/>
        </table>
      </div>
    );
  }
}

export default SocketClient;
