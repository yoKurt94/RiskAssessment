import { createContext } from "react";

type Explanation = {
  text: string;
  explanation: string;
};

export type ResultExplanations = {
  [key: string]: Explanation;
};

export enum Goal {
  RetainWealth = "RetainWealth",
  GrowWealth = "GrowWealth",
  Retirement = "Retirement",
}

export enum Age {
  Below36 = "Below36",
  Below56 = "Below56",
  Above55 = "Above55",
}

export enum Duration {
  Below5 = "Below5",
  Below15 = "Below15",
  Above15 = "Above15",
}

export enum Behaviour {
  SellAll = "SellAll",
  KeepCool = "KeepCool",
  InvestMore = "InvestMore",
}

export type QuestionaireQuestion = {
  key: string,
  section: string;
  question: string;
  options?: Record<string, string | undefined>;
  explanation: string[];
};

export type RiskRateAnswers = {
  goal: string;
  age: string;
  selfTest: number;
  duration: string;
  behaviour: string;
};

export type RiskRateResponse = {
  answers: RiskRateAnswers;
  calculatedRiskRate: number;
  riskValues: {
    yin: number;
    yang: number;
    return: number;
    volatility: number;
    safetyZone: number;
    lowerLimit: number;
  };
}

export type RiskRateResponseAndID = {
  userId: string;
  answers: RiskRateAnswers;
  calculatedRiskRate: number;
  riskValues: {
    yin: number;
    yang: number;
    return: number;
    volatility: number;
    safetyZone: number;
    lowerLimit: number;
  };
}

export type QueryKey = 
  | ['entries', string]
  | ['calculate-risk', number, RiskRateAnswers];

export const UserAnswerContext = createContext<{answerAndResponseState: RiskRateResponseAndID, setanswerAndResponseState: (updateFn: (prevState: RiskRateResponseAndID) => RiskRateResponseAndID) => void}>({
  answerAndResponseState: {
    userId: '',
    answers: {
      goal: '',
      age: '',
      selfTest: 5,
      duration: '',
      behaviour: ''
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
  },
  setanswerAndResponseState: () => {}
})
