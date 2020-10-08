import React, { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import numeral  from "numeral";

const options = {
    legend:
     { display: false,
},

elements: {
    point: {
        radius:0,
    },
},

maintainAspectRatio: false,
tooltips: {
    mode:"index",
    intersect: false,
    callbacks: {
        label: function (tooltipItem, data) {
            return numeral(tooltipItem.value).format("+0,0");
        },
    },
},

scales: {
    xAxes: [
        {
        type: "time",
        time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
        },
    },
    ],

    yAxes: [
    {
        gridLines: {
            display: false,
        },
        ticks: {

            // include dollar sign in ticks

            callback: function (value, index, values) {
                return numeral(value).format("0a");
            },
        },
    },
],


},

};

const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
        if (lastDataPoint) {
           const newDataPoint = {
               x: date,
               y: data[casesType][date] - lastDataPoint
           };
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
};

function LineGraph ({ casesType }) {
 const [data, setData] = useState({});


// https://disease.sh/v3/covid-19/historical/all?lastdays=120
  
  useEffect(() => {
      const fetchData = async () => {
     await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
     .then((response) => { return response.json(); })
     .then((data) => {
        //some stuff here
        // const chartData = buildChartData(data);
        let chartData = buildChartData(data, casesType);
        //  console.log(chartData);
        setData(chartData);
        
});
      };

      fetchData();
 
     
  }, [casesType]);


   return (
        <div> 
            {data?.length  > 0 && (
              <Line  data = {{datasets: [{
                  backgroundColor:"rgba(51, 128, 255)",
                  borderColor:"#3342FF",
                  data: data,
  
               },]
          }}
          options={options}
          />
            )}
           
            
        </div>
    );
}

export default LineGraph;
