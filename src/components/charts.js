/**
 * Created by LENOVO on 20-03-2019.
 */
import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
//importing required files
//chart functional component
const Chart=(props)=>{
    return(
        <div className="chart">
            <Bar
                data={props.chartDataTemperature}
                options={{title:{
                    display:true,
                    text:'Temperature variation in last 7 days',
                    fontSize:20
                },
                    legend:{
                        display:true,
                    }}}
            />

            <Bar
                data={props.chartDataHumidity}
                options={{title:{
                    display:true,
                    text:'Humidity variation in last 7 days',
                    fontSize:20
                },
                    legend:{
                        display:true,
                    }}}
            />
        </div>
    )
}

//exporting the chart module
export default Chart;