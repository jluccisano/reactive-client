/**
 * Created by jls on 13/01/17.
 */
import React from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Config from 'Config';
import {Table} from 'react-bootstrap';
import Moment from 'react-moment';

class ReactiveMeteoStation extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      dht22: {temperature: 0, humidity: 0},
      dataProvider: [],
      lastWeekData: []
    };

    this.socket = new SockJS(Config.serverURL + Config.webSocketEndpoint);
    this.stompClient = Stomp.over(this.socket);

    this.stompClient.connect({}, frame => {
      console.log(`connected, ${frame}!`);
      this.stompClient.subscribe('/queue/DHT22', data => {
        console.log(JSON.parse(data.body));
        this.setState({dht22: JSON.parse(data.body)});
      });
    });
  }

  componentDidMount() {
    fetch(`${Config.serverURL}/api/v1/sensor/dht22/fresh/${Config.gatewayId}`).then(response => {
      return response.json();
    }).then(json => {
      this.setState({dht22: json});
    });

    fetch(`${Config.serverURL}/api/v1/sensor/dht22/continuous/${Config.gatewayId}?sample=1h&range=12h`).then(response => {
      return response.json();
    }).then(json => {
      this.setState({dataProvider: json.items});
    });

    fetch(`${Config.serverURL}/api/v1/sensor/dht22/continuous/${Config.gatewayId}?sample=1d&range=7d`).then(response => {
      return response.json();
    }).then(json => {
      this.setState({lastWeekData: json.items});
    });
  }

  render() {
    const dht22 = this.state.dht22;
    const lastWeekData = this.state.lastWeekData;

    function LastWeekDataTable(lastWeekData) {
      if (lastWeekData.data) {
        const rows = lastWeekData.data.map((row, i) => {
          return (
            <tr key={i}>
              <td><Moment format="MMMM Do YYYY">{row.time}</Moment></td>
              <td>{row.min_temperature.toFixed(2)}°C/{row.max_temperature.toFixed(2)}°C</td>
              <td>{row.mean_temperature.toFixed(2)}°C</td>
              <td>{row.min_humidity.toFixed(2)}°C/{row.max_humidity.toFixed(2)}%</td>
              <td>{row.mean_humidity.toFixed(2)}°C</td>
            </tr>
          );
        });
        return (
          <Table responsive condensed>
            <thead>
              <tr>
                <th>day</th>
                <th>temperature min/max</th>
                <th>temperature mean</th>
                <th>humidity min/max</th>
                <th>humidity mean</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        );
      }
      return null;
    }
    return (
      <div>
        <h2>Temperature: {dht22.temperature.toFixed(2)} °C</h2>
        <h2>Humidity: {dht22.humidity.toFixed(2)} %</h2>
        <LastWeekDataTable data={lastWeekData}/>
      </div>
    );
  }
}

export default ReactiveMeteoStation;
