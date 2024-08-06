import { useState } from 'react';
import RiskAssessment from './RiskAssessment';
import * as Types from '../../../common/types';
import { UserAnswerContext } from '../../../common/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
  });

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <UserAnswerContext.Provider
        value={{
          answerAndResponseState,
          setanswerAndResponseState
        }}
      >
        <RiskAssessment />
      </UserAnswerContext.Provider>
    </QueryClientProvider>

  )
}

export default App
