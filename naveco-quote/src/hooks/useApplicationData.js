import { useState, useEffect } from "react";
import axios from 'axios';

export function useApplicationData() {
  const rate = 0.12;


  const [state, setState] = useState({
    monthlyAmount: 175,
    powerPerMonth: 1094,
    yearlyAmount: 175 * 12,
    powerPerYear: 1094 * 12,
    message: "This is fairly average. It is likely that we can offset this entirely. 😃",
    acMonthly:[],
    acAnnual:0
  });
  
  const handleChangeAmount = (event) => {
    const input = event.target.value.replace(/[^0-9]/gi, '')
    const monthlyAmount = input;
    const powerPerMonth = input / rate;
    const powerPerYear = (input / rate) * 12;
    const yearlyAmount = input * 12;
    let message = "This is fairly average. It is likely that we can offset this entirely. 😃";

    if (yearlyAmount > 3000) {
      message = "Above average. We'll do our best. 😅";
    } else if (yearlyAmount <= 1800) {
      message = "Not bad, shouldn't be hard to offset this entirely. 😀";
    }


    setState({
      ...state,
      monthlyAmount,
      powerPerMonth,
      powerPerYear,
      yearlyAmount,
      message
    });
  }

  const calculateMonthlyACPower = function(address, systemCapacity = 8.3, moduleType = 1, losses = 10.2, arrayType = 1, dataset = 'intl', invEff = 99, tilt=20, azimuth = 180){
    const apiKey = 'le83zKQd7t0wDgBD0cpTCwhsJZxPEjx9WmZsFbdg';
    address= "14446+Evangeline+Trail+Wilmot+NS";
  

      //const url = `https://developer.nrel.gov/api/pvwatts/v6.json?api_key=${apiKey}&addresss=${address}&system_capacity=${systemCapacity}&azimuth=${azimuth}&tilt=${tilt}&array_type=${arrayType}&module_type=${moduleType}&losses=${losses}&dataset=${dataset}&inv_eff=${invEff}`;
      //const url=' https://developer.nrel.gov/api/pvwatts/v6.json?api_key=DEMO_KEY&lat=40&lon=-105&system_capacity=4&azimuth=180&tilt=40&array_type=1&module_type=1&losses=10'
      //const url = 'https://developer.nrel.gov/api/pvwatts/v6.json?api_key=le83zKQd7t0wDgBD0cpTCwhsJZxPEjx9WmZsFbdg&address=14446+Evangeline+Trail+Wilmot+NS&system_capacity=4&azimuth=180&tilt=40&array_type=1&module_type=1&losses=10'
      const url = `https://developer.nrel.gov/api/pvwatts/v6.json?api_key=${apiKey}&address=${address}&system_capacity=${systemCapacity}&azimuth=${azimuth}&tilt=${tilt}&array_type=${arrayType}&module_type=${moduleType}&losses=${losses}&inv_eff=${invEff}`;
      axios.get(url)
      .then((res)=>{

        //setState(prev => ({ ...prev, acMonthly: res.data.outputs.ac_monthly, acAnnual: res.data.outputs.ac_annual}));

        setState({
          ...state,
          acMonthly:res.data.outputs.ac_monthly,
          acAnnual:res.data.outputs.ac_annual});
      
      })
      
      .catch((err)=> {
        console.log(err);
      })

   

    

  }

  const calculateSystemGrossCostAfterRebate = function(systemBaseCost) {
    const rebate = (systemBaseCost * (1 - 0.25)) < 6000 ? systemBaseCost * (1 - 0.25) : 6000;
    return systemBaseCost * (1 + 0.13) - rebate;
  }
  const calculateSystemNetCostAfterRebate = function(systemBaseCost) {
    const rebate = (systemBaseCost * (1 - 0.25)) < 6000 ? systemBaseCost * (1 - 0.25) : 6000;
    return systemBaseCost - rebate;
  }
  const calculateROI = function(profit, investment, projectLC = 25) {
    return profit / investment * 100 / projectLC;
  }

  const  calculatePayback = function(acAnnual, netCost, rate = 0.12, degradationRate = 0.005, escalationRate = 0.029) {
    let currentYear = new Date().getFullYear();
    const dataPerYear = {};
    let sum = 0;
    dataPerYear[currentYear] = {acAnnual, amount: (acAnnual * rate)};
    for (let i = 1; i < 25; i++) {
      // power of every year is calculated based on prevous year's power factoring degradation rate
      const newPower = dataPerYear[currentYear].acAnnual - (dataPerYear[currentYear].acAnnual * degradationRate);
      // Amount is calculated based on newly calculated power factoring escalation rate
      dataPerYear[currentYear + 1] = {acAnnual: newPower, amount: (newPower  * rate * ( 1 + escalationRate ))};
      currentYear++;
    }

    //the average value of power produced for the system's lifespan.
    for  (let year in dataPerYear) {
      sum += dataPerYear[year].amount;
    }
    const avg = sum / 25;
    return netCost / avg;
  };

  return {
    state,
    handleChangeAmount,
    calculateMonthlyACPower,
    calculatePayback,
    calculateSystemGrossCostAfterRebate,
    calculateSystemNetCostAfterRebate,
    calculateROI
  }; 

}