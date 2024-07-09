CREATE DATABASE pernonboarding;

CREATE TABLE riskAssessment(
    user_id TEXT,
    goal TEXT,
    age TEXT,
    selfTest INT,
    duration TEXT,
    behaviour TEXT,
    calculatedRiskRate INT,
    yin INT,
    yang INT,
    returnRate FLOAT, 
    volatility FLOAT,
    safetyZone FLOAT,
    lowerLimit FLOAT
);