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
    this.request()
    this.state = {
    }
  }

  request(){
    //console.log(this, "pressed", secret)
    let today = moment().day()
    let date;
    //for loop starts on today, and gets the weather for the past 7 days
    for (let i = today; i > today-7; i-- ){
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
      
      console.log(moment.utc(data[0]['x']*1000).local().format("D-MMM-YY"))
    }
    console.log(data)

    return (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.request.bind(this)}>press me</button>
        <AreaChart
        xType={'time'}
        axes
        grid
        tickTimeDisplayFormat={'%d %m'}
        dataPoints
        areaColors={['purple']}
        width={550}
        height={550}
          data={[
            data
          ]}
        />
      </div>
    );
  }
}

export default App;
