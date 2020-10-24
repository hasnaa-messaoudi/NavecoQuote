import React, { useEffect } from 'react';
import './App.css';
import Offset from './components/Offset';
import MonthlyForm from './components/MonthlyForm';
import {useApplicationData} from "./hooks/useApplicationData";
import Header from './components/Header';
import SavingTable from './components/SavingTable';
<<<<<<< HEAD
import OffsetBill from './components/OffsetBill';
=======
import PaybackCard from './components/PaybackCard';
import PriceCard from './components/PriceCard';
>>>>>>> 0e8f3d5fc9d6a352b2eda4097d7c0e3a0f38c9de

import {Switch, BrowserRouter as Router, Route, Link} from 'react-router-dom';

function App() {
  const {
    state,
    handleChangeAmount,
    calculateMonthlyACPower,
    calculatePayback,
    calculateSystemGrossCostAfterRebate,
    calculateSystemNetCostAfterRebate,
    calculateROI
  } = useApplicationData();


  function onCalculate () {
    calculateMonthlyACPower();
  }

  const systemBaseCost = 16520;
  const profit = 10000;
  
  return (
    <main >
      <Router>
        <Header/>
        <Switch>
          <Route exact path = '/'>
            <div className='userInput'>
              {!state.acMonthly[0]  && <MonthlyForm
                handleChangeAmount={handleChangeAmount}
                state={state}
                calculate={onCalculate}
              />}
              {state.acMonthly[0] && <PriceCard
                cost = {calculateSystemGrossCostAfterRebate(systemBaseCost)}
              />}
              {state.acMonthly[0] && <PaybackCard 
                paybackPeriod = {
                  calculatePayback(
                    state.acAnnual,
                    calculateSystemNetCostAfterRebate(systemBaseCost)
                    )
                  }
                roi = {
                  calculateROI(
                    profit,
                    calculateSystemNetCostAfterRebate(systemBaseCost)
                  )
                }
              />}
              {state.acMonthly[0] && <SavingTable acMontly = {state.acMonthly} monthlyAmount = {state.monthlyAmount}/>}
<<<<<<< HEAD
              <OffsetBill></OffsetBill>
=======
              
>>>>>>> 0e8f3d5fc9d6a352b2eda4097d7c0e3a0f38c9de
            </div>
          </Route>
          <Route path='/how'>
            <p>How it works explanation</p>
          </Route>
          
        </Switch>
      </Router>
    </main>
  );
}

export default App;
