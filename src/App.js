import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DarkSkyApi from 'dark-sky-api';
import secret from "./secret.json"
import moment from 'moment';
import {AreaChart} from 'react-easy-chart';
moment().format();
DarkSkyApi.apiKey = secret.secret;

class App extends Component {

  constructor(props){
    super(props)
    this.request(5)
    this.state = {
    }
  }

  request(length){
    //console.log(this, "pressed", secret)
    let today = moment().day()
    let date;
    //for loop starts on today, and gets the weather for the past 14 days
    for (let i = today; i > today-length; i-- ){
      date = moment().day(i)
      console.log(date)
      DarkSkyApi.loadTime(date)
      .then(result => {
        console.log(result['hourly']['data'][0]['time'])
        var time = result['hourly']['data'][0]['time']
        this.setState({[time]:{x:moment.utc(time*1000).local().format("D-MMM-YY"), y:result['hourly']['data'][0]['temperature']}})

      });
    }
    
  }
  render() {
    var data=[]
    for(var i in this.state){
      data.push(this.state[i])
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <button onClick={this.request.bind(this,14)}>Last 2 weeks</button>
        <button onClick={this.request.bind(this,30)}>Last month(30 days)</button>
        <button onClick={this.request.bind(this,60)}>Last 2 months(60 days)</button>
        <h1>Temperature over time</h1>
        <AreaChart
        xTicks={data.length}
        xType={'time'}
        axes
        grid
        tickTimeDisplayFormat={'%m/%d'}
        dataPoints
        areaColors={['purple']}
        width={400}
        height={400}
          data={[
            data
          ]}
        />
      </div>
    );
  }
}

export default App;
