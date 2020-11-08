import React, { Component } from 'react'
import Chart from "chart.js";
import '../CSS/chartweather.css'
import api from './api';
Chart.defaults.global.legend.display = true;
Chart.defaults.global.defaultFontFamily = "'Open Sans', sans-serif";
let chart;

export default class LineGraph extends Component {

    state={initFeatureY:"Pressure",initAxisX:"Time"};

    chartRef = React.createRef();

    async componentDidMount() {
        await this.initGraph(this.state.initFeatureY,this.state.initAxisX);
    }

    async initGraph(axisY,axisX)
    {
        
        const fileName=['Weather_Counterfactual','Weather_Naive_guide','Weather_Sample'];
        
        const dataX = await 
            api.getData(fileName[0],axisX);
        const dataYWeather_Counterfactual = await 
            api.getData(fileName[0], axisY);
        const dataYWeather_Naive_guide = await 
            api.getData(fileName[1], axisY);
        const dataYWeather_Sample = await 
            api.getData(fileName[2], axisY);

        const myChartRef = this.chartRef.current.getContext("2d");
        
        if (typeof chart !== "undefined") chart.destroy();
        
        chart= new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels:dataX ,
                datasets: [
                    {
                        label: fileName[0],
                        data: dataYWeather_Counterfactual,
                        backgroundColor: "#8f5cc0",
                        fill:false,
                        borderColor:"#111110"
                    },
                    {
                        label: fileName[1],
                        data: dataYWeather_Naive_guide,
                        backgroundColor: "#a52a2a",
                        fill:false,
                        borderColor:"#111110"
                    },
                    {
                        label: fileName[2],
                        data: dataYWeather_Sample,
                        backgroundColor: "#a3a52a",
                        fill:false,
                        borderColor:"#111110"
                    }
                ]
            },
            options: {
   
                title: {
                    display: true,
                    text: 'Daily Weather Prediction',
                    fontSize: 16
                  },
                responsive: true,
                maintainAspectRatio: false,
                

            }
        });
    }

    async componentDidUpdate() {

        this.initGraph(this.state.handleChange,this.state.initAxisX);
    }

    handleChange = (event) => {
        this.setState({ handleChange: event.target.value });
    }

    render() {
        return (
            <div className="chart-container">
                <select
                    onChange={this.handleChange}>
                    <option value="Pressure">Pressure</option>
                    <option value="Temperature">Temperature</option>
                    <option value="Relative Humidity">Relative Humidity</option>
                    <option value="Saturation vapor pressure">Saturation vapor pressure</option>
                    <option value="Vapor pressure deficit">Vapor pressure deficit</option>
                    <option value="Water vapor concentration">Water vapor concentration</option>
                    <option value="Airtight">Airtight</option>
                    <option value="Wind speed">Wind speed</option>
                    <option value="Wind direction in degrees">Wind direction in degrees</option>
                </select>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}