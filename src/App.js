import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Weather from './components/weather';
import Form from './components/form';
import Title from './components/title';
import Chart from './components/charts';


const key="6e836498dfea418a933114544192003";

class App extends React.Component {

    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        error: undefined,
        desc:undefined,
        desc2:undefined,
        forecast_date:[],
        forecast_temp:[],
        forecast_humidity:[],
        chartDataTemperature:{},
        chartDataHumidity:{}
    }

  getWeather= async(e)=>{

    const city=e.target.elements.city.value;
    const country=e.target.elements.country.value;

    e.preventDefault();

      // const api_call = await fetch(`http://api.apixu.com/v1/current.json?key=${key}&q=${city}`);
      // const response = await api_call.json();
      // console.log(response);

      const forecast_api_call= await fetch(`http://api.apixu.com/v1/forecast.json?key=${key}&q=${city}&days=4`);
      const forecast_response=await forecast_api_call.json();

      let forecast_date=[];
      let forecast_temp=[];
      let forecast_humidity=[];
      let counter=1;
      while(counter<=3){
          forecast_date.push(forecast_response.forecast.forecastday[counter].date);
          forecast_temp.push(forecast_response.forecast.forecastday[counter].day.avgtemp_c);
          forecast_humidity.push(forecast_response.forecast.forecastday[counter].day.avghumidity);
          counter++;
      }
      // console.log(forecast_date);


      let days=7;
      let temp=[];
      let humidity=[];
      let date_record=[];
      while(days){
          let date = new Date();
          let last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
          let day =last.getDate();
          let month=last.getMonth()+1;
          let year=last.getFullYear();
          let back_date=year+'-'+month+'-'+day;

          date_record.push(back_date);
          let new_api=await fetch(`http://api.apixu.com/v1/history.json?key=${key}&q=${city}&dt=${back_date}`)
          let result=await new_api.json();


          // console.log(result);
          temp.push(result.forecast.forecastday[0].day.avgtemp_c);
          humidity.push(result.forecast.forecastday[0].day.avghumidity)
          days--;
      }

      console.log(temp);

      if(city && country){
          this.setState({
              temperature: forecast_response.current.temp_c,
              city: forecast_response.location.name,
              country: forecast_response.location.country,
              humidity: forecast_response.current.humidity,
              error: "",
              desc:"Today's weather report",
              desc2:"Weather Forecast for next 3 days",
              forecast_date:forecast_date,
              forecast_temp:forecast_temp,
              forecast_humidity:forecast_humidity,
              chartDataTemperature:{
                  labels:date_record,
                  datasets:[
                      {
                          label:'Temperature (in celsius)',
                          data:temp,
                          backgroundColor:[
                              'rgba(255, 99, 132, 0.6)',
                              'rgba(54, 162, 235, 0.6)',
                              'rgba(255, 206, 86, 0.6)',
                              'rgba(75, 192, 192, 0.6)',
                              'rgba(153, 102, 255, 0.6)',
                              'rgba(255, 159, 64, 0.6)',
                              'rgba(255, 99, 132, 0.6)'
                          ]
                      }
                  ]
              },
              chartDataHumidity:{
                  labels:date_record,
                  datasets:[
                      {
                          label:'Humidity',
                          data:humidity,
                          backgroundColor:[
                              'rgba(255, 99, 132, 0.6)',
                              'rgba(54, 162, 235, 0.6)',
                              'rgba(255, 206, 86, 0.6)',
                              'rgba(75, 192, 192, 0.6)',
                              'rgba(153, 102, 255, 0.6)',
                              'rgba(255, 159, 64, 0.6)',
                              'rgba(255, 99, 132, 0.6)'
                          ]
                      }
                  ]
              }
          })
      }else{
          this.setState({
              error: "Please input search values..."
          })
      }
  }



  render() {
    return (
      <div>
        <Title />
        <Form loadWeather={this.getWeather}/>
        <Weather
            desc={this.state.desc}
            temperature={this.state.temperature}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            error={this.state.error}
            desc2={this.state.desc2}
            forecast_date={this.state.forecast_date}
            forecast_temp={this.state.forecast_temp}
            forecast_humidity={this.state.forecast_humidity}/>

          <Chart
              chartDataTemperature={this.state.chartDataTemperature}
              chartDataHumidity={this.state.chartDataHumidity}
          />

      </div>
    );
  }
}

export default App;
