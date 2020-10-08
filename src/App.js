import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import './App.css';
import DetailsInfo from './DetailsInfo';

function App() {

  const [countries, setCountries] = useState([]);
   const [country, setCountry] = useState('worldwide');
   const [countryInfo, setCountryInfo] = useState({});
   const [tableData, setTableData] = useState([]);
   const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
   const [mapZoom, setMapZoom] = useState([3]);
   const [mapCountries, setMapCountries] = useState([]);
   const [casesType, setCasesType] = useState("cases");

  //  use for all the data  show in the box when page load

   useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all").then(response => response.json()).then(data => {
      setCountryInfo(data);
  
    })
  
   }, []);

    //  use for all the data  show in the box when page load

  //how to write a variable in react

 // https://disease.sh/v3/covid-19/countries              api for covid 19 update fetch


 // useeffect = runs  a piece  of code based on a given condition


  useEffect(() => {
      // the code inside here  will run once ,when the component loads and not again
      //async -->  send a request ,wait for it, do something with 

     const getCountriesData = async () => {
       await fetch ("https://disease.sh/v3/covid-19/countries").then ((responce) => responce.json())
       .then((data) => {
        //  [item1, item2, item3]
        // item 1 --> returning object in shape
         // item 2 --> returning object in shape
         // item 3 --> returning object in shape
       const countries = data.map((country) => (
        {
          name: country.country, //India ,united state, united kingdom
          value: country.countryInfo.iso2,  //  IND, UK, UN, FR
        }
       ));

       const sortedData = sortData(data);
       setTableData(sortedData);
       setCountries(countries);
       setMapCountries(data);

       });
       
      };

      getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
     // console.log ('here it was', countryCode);
     setCountry(countryCode);

      const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

      await fetch(url).then(response => response.json()).then(data => {
       setCountry(countryCode);

        //All the data from the country response
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
         setMapZoom(4);

      });

     // https://disease.sh/v3/covid-19/all
     // https://disease.sh/v3/covid-19/countries/[COUNTRY-CODE]
  };

  console.log('COUNTRY INFO >>>', countryInfo);


  return (
    <div className="app">
      <div className="app-left">
      <div class="header">
  <a href="#default" class="logo"><span>🦠</span>Covid-19 Tracker</a>
  <div class="header-right">
  <a href="https://ko-fi.com/adarshtripathi123">
    <button class="button"><span>☕ </span>Buy me a coffee</button></a>
  </div>
</div>
           <div className="app-header">
            <h1> Covid-19 tracker Quick Facts </h1>
              {/* Title + Select input dropdown field */}
            <FormControl className="app-dropdown">
            <Select variant ="outlined"  onChange={onCountryChange} value={country} >
                    {/* countries name in dropdown options */}
                    <MenuItem value="worldwide">Worldwide</MenuItem>
                    {countries.map((country) => (
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                    ))}
                    {/* <MenuItem value="worldwide">Worldwide</MenuItem>
                    <MenuItem value="worldwide">option two</MenuItem>
                    */}
             </Select>
             </FormControl>
            </div>

            <div className="app-state-box">
                <InfoBox isRed 
                active={casesType==="cases"}  onClick={(e) => setCasesType("cases")} title="coronavirus cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} />
                <InfoBox  active={casesType==="recovered"}  onClick={(e) => setCasesType("recovered")} title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)}  total={prettyPrintStat(countryInfo.recovered)} />
                <InfoBox 
              isRed active={casesType==="deaths"} onClick={(e) => setCasesType("deaths")} title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)}  total={prettyPrintStat(countryInfo.deaths)} />
                  <InfoBox 
                  active={casesType==="active"}  title="Active" cases={prettyPrintStat(countryInfo.active)}  total={prettyPrintStat(countryInfo.active)} />

            </div>

             <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
             <h3 className="detailsh3">World COVID-19 Stats Details View </h3>
             <DetailsInfo countries={tableData} />
     
  </div>
     
    <Card className="app-right">
      <CardContent>
      <h3>Live cases by country</h3>
      {/* table */}
       <Table countries={tableData}/>
        <h3 className="linegraphtitle">Worldwide New {casesType}</h3>
       {/* Graph */}
        <LineGraph casesType={casesType} />
        <h4 className="footertitle">To protect yourself and others against COVID-19, clean your hands frequently and thoroughly. Use alcohol-based hand sanitizer or wash your hands with soap and water. If you use an alcohol-based hand sanitizer, make sure you use and store it carefully.
        Keep alcohol-based hand sanitizers out of children’s reach. Teach them how to apply the sanitizer and monitor its use. Apply a coin-sized amount on your hands. There is no need to use a large amount of the product.
        Remember that washing your hands with soap and water is also effective against COVID-19.
</h4>
      
        <h3 className="developertitle">Design and Developed by <span>❤️</span> Adarsh Tripathi</h3>
        <h3 className="developertitle">Contact No <span>📱 </span><a href="tel:+918595432208">+918595432208</a></h3>
      </CardContent>
    
    </Card>

    </div>
  );
}

export default App;
