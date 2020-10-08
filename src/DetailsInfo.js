import React from 'react';
import numeral from "numeral";
import "./DetailsInfo.css";

function DetailsInfo( {countries}) {
    return (
        // <div className="detailsInfocontainer">
        //     <table id="customers">
        //         <tr>
        //         <th>Country</th>
        //         <th>TodayCases</th>
        //         <th>Today Deaths</th>
        //         <th>Today Recovered</th>
        //         <th>Active</th>
        //         <th>Critical</th>
        //         <th>CasesPerOneMillion</th>
        //     </tr>
        //     </table>
        // </div>
        <div className="tabledetailsInfo">
          <table>
          <thead>
          <div className="tdmargin">
              <tr>
    <th>Country</th>
    <th>Total Cases</th>
    <th>Today Cases</th>
    <th>Total Deaths</th>
    <th>Today Deaths</th>
    <th>Total Recovered</th>
    <th>Today Recovered</th>
    <th>Active Cases</th>
    <th>critical Cases</th>
    <th>Cases Per One Million</th>
    <th>deaths Per One Million</th>
    <th>Population</th>
    <th>Tests</th>
 </tr>
 </div>
 </thead>
          </table>
 
            {countries.map(({country, cases, todayCases, deaths, todayDeaths, recovered, todayRecovered, active, critical, casesPerOneMillion, deathsPerOneMillion, population, tests}) => (
            <table>
                <tbody>
              
              <tr>
                <td><span>★ </span>{country} </td>
                <td ><strong className="tabletext-green">{numeral(cases).format("0,0")}</strong> </td>
                <td ><strong className="tabletext-green">{numeral(todayCases).format("0,0")}</strong> </td>
                <td ><strong className="tabletext-red">{numeral(deaths).format("0,0")}</strong> </td>
                <td ><strong className="tabletext-red">{numeral(todayDeaths).format("0,0")}</strong></td>
                <td ><strong className="tabletext-blue">{numeral(recovered).format("0,0")}</strong></td>
                <td ><strong className="tabletext-blue">{numeral(todayRecovered).format("0,0")}</strong></td>
                <td ><strong className="tabletext-yellow">{numeral(active).format("0,0")}</strong></td>
                <td ><strong className="tabletext-orange">{numeral(critical).format("0,0")}</strong></td>
                <td ><strong className="tabletext-cyangreen">{numeral(casesPerOneMillion).format("0,0")}</strong></td>
                <td ><strong className="tabletext-cyanred">{numeral(deathsPerOneMillion).format("0,0")}</strong></td>
                <td ><strong className="tabletext-cyan">{numeral(population).format("0,0")}</strong></td>
                <td ><strong className="tabletext-amber">{numeral(tests).format("0,0")}</strong></td>
              
            </tr>
        
            </tbody>
           
            </table>
         
            
            

    ))}
    </div>
    
    )
}

export default DetailsInfo
