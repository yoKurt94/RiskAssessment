import { useState } from 'react';
import RiskAssessment from './RiskAssessment';
import * as Types from '../types';
import { UserAnswerContext } from '../types';

function App() {
  const [answerAndResponseState, setanswerAndResponseState] = useState<Types.RiskRateResponseAndID>({
    userId: '',
    answers: {
      goal: 'RetainWealth',
      age: 'Below36',
      selfTest: 5,
      duration: 'Below5',
      behaviour: 'SellAll'
    },
    calculatedRiskRate: 0,
    riskValues: {
      yin: 0,
      yang: 0,
      return: 0,
      volatility: 0,
      safetyZone: 0,
      lowerLimit: 0,
    }
  ***REMOVED***

  return (
    <UserAnswerContext.Provider
      value={{
        answerAndResponseState,
        setanswerAndResponseState
      }}
    >
      <RiskAssessment />
    </UserAnswerContext.Provider>
  )
}

export default App
