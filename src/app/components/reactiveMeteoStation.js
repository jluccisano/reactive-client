/**
 * Created by jls on 13/01/17.
 */
import React from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Config from 'Config';
import {LineChart} from 'react-d3-basic';
import d3 from 'd3';
import Moment from 'react-moment';
import FontAwesome from 'react-fontawesome';

class ReactiveMeteoStation extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      dht22: {temperature: 0, humidity: 0},
      dataProvider: []
    };

    this.socket = new SockJS(Config.serverURL + Config.webSocketEndpoint);
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
    fetch(`${Config.serverURL}api/v1/sensor/dht22/fresh/${Config.gatewayId}`).then(response => {
      return response.json();
    }).then(json => {
      this.setState({dht22: json});
    });

    fetch(`${Config.serverURL}api/v1/sensor/dht22/continuous/${Config.gatewayId}?sample=1h&range=12h`).then(response => {
      return response.json();
    }).then(json => {
      this.setState({dataProvider: json.items});
    });

    fetch(`${Config.serverURL}api/v1/sensor/dht22/continuous/${Config.gatewayId}?sample=1d&range=7d`).then(response => {
      return response.json();
    }).then(json => {
      this.setState({dataProvider: json.items});
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
            <a key={i} href="#" className="list-group-item">
              <h4 className="list-group-item-heading">
                <Moment format="MMMM Do YYYY">{row.time}</Moment>
              </h4>
              <FontAwesome name="thermometer-half" size="2x"/>
              <p className="list-group-item-text">{row.min_temperature.toFixed(2)}°C/{row.max_temperature.toFixed(2)}°C</p>
              <p className="list-group-item-text">{row.min_humidity.toFixed(2)}%/{row.max_humidity.toFixed(2)}%</p>
              <p className="list-group-item-text">{row.mean_temperature.toFixed(2)}°C/{row.mean_humidity.toFixed(2)}%</p>
            </a>
          );
        });
        return (
          <div className="list-group">{rows}</div>
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
        <Rows data={lastWeekData}/>
        <h2>Temperature: {dht22.temperature.toFixed(2)} °C</h2>
        <h2>Humidity: {dht22.humidity.toFixed(2)} %</h2>
        <LineChart width={1900} height={300} data={dataProvider} chartSeries={chartSeries} x={x} xScale={"time"} yScale={"linear"}/>
      </div>
    );
  }
}

export default ReactiveMeteoStation;
