import * as Types from "./types";

export const leftSideStartTexts = {
  subheader: "Was ist eine Risikokennzahl?",
  paragraphs: [
    "Die Risikokennzahl ist ein Wert, der das individuelle Risiko-Profil eines Anlegers beschreibt. Sie liegt auf einer Skala von 1 bis 10, wobei 1 für ein sehr geringes Risiko und 10 für ein sehr hohes Risiko steht. Diese Kennzahl hilft dabei, das persönliche Anlageverhalten und die Risikobereitschaft besser zu verstehen.",
    "Ein geringes Risiko (niedrige Risikokennzahl) deutet darauf hin, dass der Anleger sicherheitsorientiert ist und eine hohe Verlustaversion hat. Solche Anleger bevorzugen in der Regel konservative Investitionen, die weniger Schwankungen unterliegen, auch wenn die Renditeaussichten geringer sind.",
  ],
};

export const riskAssessmentData = {
  questions: [
    {
      key: "goal",
      section: "Anlageziel",
      question: "Was ist Dein Anlageziel?",
      options: {
        RetainWealth: "Kapitalerhalt",
        GrowWealth: "Vermögensaufbau",
        Retirement: "Altersvorsorge",
      },
      explanation: [
        "Das Anlageziel gibt Aufschluss darüber, ob der Anleger konservativ, wachstumsorientiert oder auf langfristige Sicherheit bedacht ist. Es hilft zu bestimmen, welche Art von Anlagen am besten geeignet sind.",
      ],
    },
    {
      key: "age",
      section: "Alter",
      question: "Wie alt bist Du?",
      options: {
        Below36: "unter 36 Jahren",
        Below56: "36 - 55 Jahre",
        Above55: "über 55 Jahre",
      },
      explanation: [
        "Das Alter eines Anlegers kann seine Risikobereitschaft beeinflussen. Jüngere Anleger haben in der Regel einen längeren Anlagehorizont und können daher risikoreichere Investitionen besser verkraften.",
      ],
    },
    {
      key: "duration",
      section: "Anlagezeit",
      question: "Wie lange planst Du Dein Geld anzulegen?",
      options: {
        Below5: "weniger als 5 Jahre",
        Below15: "5 - 15 Jahre",
        Above15: "mehr als 15 Jahre",
      },
      explanation: [
        "Die geplante Anlagedauer ist entscheidend für die Risikobereitschaft. Längere Anlagehorizonte erlauben es, Marktschwankungen besser auszusitzen und von langfristigen Wachstumschancen zu profitieren.",
      ],
    },
    {
      key: "behaviour",
      section: "Verlust",
      question:
        "Angenommen Deine Anlage verliert 10 % an Wert. Wie reagierst Du?",
      options: {
        SellAll: "Alles verkaufen",
        KeepCool: "Cool bleiben",
        InvestMore: "Mehr investieren",
      },
      explanation: [
        "Die Reaktion auf Verluste zeigt die emotionale Stabilität und Risikobereitschaft eines Anlegers. Es hilft zu verstehen, ob der Anleger in Krisenzeiten ruhig bleibt oder zu Panikverkäufen neigt.",
      ],
    },
    {
      key: "selfTest",
      section: "Risikobereitschaft",
      question: "Wie schätzt Du Deine Risikobereitschaft selbst ein?",
      options: {},
      explanation: [
        "Die Selbsteinschätzung der Risikobereitschaft gibt einen ersten Hinweis darauf, wie viel Risiko der Anleger bereit ist einzugehen. Es ist eine subjektive Einschätzung, die durch die anderen Fragen ergänzt wird.",
      ],
    },
  ],
};

export const getInvestmentMessage = (response: Types.RiskRateResponse) => {
  const { calculatedRiskRate, riskValues } = response;
  const { yin, yang, volatility, return: expectedReturn } = riskValues;

  let riskMessage;
  let volatilityMessage;
  let fundMessage;
  let returnMessage;

  // Risk message
  if (calculatedRiskRate >= 1 && calculatedRiskRate <= 2) {
    riskMessage =
      "Deine Risikotoleranz ist sehr gering. Ein konservativer Investitionsansatz wird empfohlen.";
  } else if (calculatedRiskRate >= 3 && calculatedRiskRate <= 5) {
    riskMessage =
      "Deine Risikotoleranz ist moderat. Eine ausgewogene Anlagestrategie wäre für dich geeignet.";
  } else if (calculatedRiskRate >= 6 && calculatedRiskRate <= 8) {
    riskMessage =
      "Du hast eine hohe Risikotoleranz. Ein aggressiver Investitionsansatz könnte höhere Renditen erzielen.";
  } else if (calculatedRiskRate >= 9 && calculatedRiskRate <= 10) {
    riskMessage =
      "Du bist sehr risikofreudig. Eine sehr aggressive Anlagestrategie ist für dich geeignet.";
  }

  // Volatility message
  if (volatility <= 2) {
    volatilityMessage =
      "Die erwartete Volatilität ist sehr gering. Dies deutet auf ein stabiles Anlageumfeld hin.";
  } else if (volatility > 2 && volatility <= 5) {
    volatilityMessage =
      "Die erwartete Volatilität ist moderat. Bereite dich auf einige Schwankungen deiner Investition vor.";
  } else if (volatility > 5 && volatility <= 7) {
    volatilityMessage =
      "Die erwartete Volatilität ist hoch. Deine Investition könnte erhebliche Schwankungen erfahren.";
  } else if (volatility > 7) {
    volatilityMessage =
      "Die erwartete Volatilität ist sehr hoch. Bereite dich auf große Schwankungen deiner Investition vor.";
  }

  // Funds message
  if (yin > yang) {
    fundMessage = `Dein Portfolio tendiert zum Yin-Fonds mit einer Allokation von ${yin}%. Dies weist auf eine konservativere Anlagestrategie hin.`;
  } else if (yang > yin) {
    fundMessage = `Dein Portfolio tendiert zum Yang-Fonds mit einer Allokation von ${yang}%. Dies weist auf eine aggressivere Anlagestrategie hin.`;
  } else {
    fundMessage =
      "Dein Portfolio ist gleichmäßig zwischen dem Yin- und Yang-Fonds aufgeteilt, was auf eine ausgewogene Anlagestrategie hinweist.";
  }

  // Return message
  if (expectedReturn <= 2) {
    returnMessage =
      "Die erwartete Rendite ist sehr gering. Deine Investition könnte stabile, aber niedrige Erträge erzielen.";
  } else if (expectedReturn > 2 && expectedReturn <= 4) {
    returnMessage =
      "Die erwartete Rendite ist moderat. Deine Investition könnte vernünftige Erträge erzielen.";
  } else if (expectedReturn > 4 && expectedReturn <= 6) {
    returnMessage =
      "Die erwartete Rendite ist gut. Deine Investition könnte hohe Erträge erzielen.";
  } else if (expectedReturn > 6) {
    returnMessage =
      "Die erwartete Rendite ist sehr hoch. Deine Investition könnte außergewöhnlich hohe Erträge erzielen.";
  }

  return [ riskMessage, fundMessage, returnMessage, volatilityMessage ]
  ;
};

export const getRiskEmoji = (calculatedRiskRate: number) => {
  let emoji;

  if (calculatedRiskRate >= 1 && calculatedRiskRate <= 2) {
    emoji = "😌";
  } else if (calculatedRiskRate >= 3 && calculatedRiskRate <= 5) {
    emoji = "🙂";
  } else if (calculatedRiskRate >= 6 && calculatedRiskRate <= 8) {
    emoji = "😃";
  } else if (calculatedRiskRate >= 9 && calculatedRiskRate <= 10) {
    emoji = "😎";
  }

  return emoji;
};

export const resultExplanations: Types.ResultExplanations = {
  calculatedRiskRate: {
      text: 'Berechnete Risikobewertung',
      explanation: 'Dieser Wert repräsentiert das berechnete Risiko für Ihre Investition auf einer Skala von 1 bis 10.'
  },
  yin: {
      text: 'Evergreen Yin Fonds',
      explanation: 'Der Evergreen PDI Yin ist ein defensiver Mischfonds, der stabile Renditen anstrebt durch globales Investment in Aktien und Renten.'
  },
  yang: {
      text: 'Evergreen Yang Fonds',
      explanation: 'Der Evergreen PDI Yang ist ein offensiver Mischfonds, der dynamische Renditen anstrebt durch globales Investment in Aktien und Renten.'
  },
  return: {
      text: 'Erwartete Rendite',
      explanation: 'Dies ist die erwartete jährliche Rendite Ihrer Investition basierend auf aktuellen Marktdaten.'
  },
  volatility: {
      text: 'Volatilität',
      explanation: 'Dieser Wert misst die Schwankungsbreite Ihrer Investition und gibt Aufschluss über das Risiko.'
  }
};
