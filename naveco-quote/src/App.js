import React from 'react';
import './App.css';
import MonthlyForm from './components/MonthlyForm';
import { useApplicationData } from "./hooks/useApplicationData";
import Navigator from "./components/FrontPage/Navigator"
import Overview from './components/Overview'
import { useVisualMode } from './hooks/useVisualMode'
import FrontPage from "./components/FrontPage/FrontPage";
import StateContext from './StateContext';
import GoogleMaps from './components/Map';
import HowItWorks from './components/HowItWorks';

const BILLINFO = 'BILLINFO';
const ADDRESS = "ADDRESS";
const CALCULATION = 'CALCULATION'
const FRONTPAGE = 'FRONTPAGE'
const HOW = "HOW";

function App() {
  const { mode, transition, back } = useVisualMode(FRONTPAGE);
  const {
    state,
    handleChangeAmount,
    calculateMonthlyACPower,
    handleLoanChange,
    handleYearChange,
    handleInputs,
    UpdateAddress,
    enableNextButton,
    disableButton,
    handleRateInput,
    handleOffsetChange,
  } = useApplicationData();


  function onCalculate() {
    calculateMonthlyACPower();
    transition('CALCULATION');
  }

  function changeMode() {
    transition('BILLINFO')
    disableButton();
  }

  function frontPage() {
    transition('ADDRESS')
  }

  function goHome() {
    transition(FRONTPAGE);
  }

  function goHow() {
    transition(HOW);
  }

  function close() {
    back();
  }

  return (
    <main >
      {!(mode === CALCULATION) && <Navigator goHome={goHome} goHow={goHow} />}
      <StateContext.Provider value={state}>
        {mode === FRONTPAGE && <FrontPage frontPage={frontPage} goHow={goHow} />}
        <div className='userInput'>
          {mode === ADDRESS && <GoogleMaps
            UpdateAddress={UpdateAddress}
            changeMode={changeMode}
            enableNextButton={enableNextButton}
          />}
          {mode === BILLINFO && <MonthlyForm
            handleChangeAmount={handleChangeAmount}
            handleInputs={handleInputs}
            handleRateInput={handleRateInput}
            calculate={onCalculate}
            handleChange={handleOffsetChange}
            offset={state.offset}
          />}
          {state.acMonthly[0] && mode === CALCULATION && <Overview
            handleLoanChange={handleLoanChange}
            handleYearChange={handleYearChange}
            goHome={goHome}
            goHow={goHow}
          />}
          {mode === HOW && <HowItWorks close={close} />}

        </div>
      </StateContext.Provider>
    </main>
  );
}

export default App;