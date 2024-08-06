import express, { Request, Response } from 'express';
import cors from 'cors';
import { v4 } from 'uuid';
import { 
    RiskRateAnswers, 
    RiskRateResponse,
    RiskRateResponseAndID 
} from '../common/types'
import axios from 'axios';

const pool = require('./db');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/calculate-risk', async (req: Request, res: Response) => {
    try {
        const userAnswers = req.body as RiskRateAnswers | null;
        const response = await axios.post<RiskRateResponse>(
            'https://sandbox.onboarding-api.evergreen.de/risk-rate/calculate',
            userAnswers
        );
        const riskRate = response.data;
        const { answers, calculatedRiskRate, riskValues } = riskRate;
        const userId = v4();
        const newEntry = await pool.query(
            `INSERT INTO riskAssessment(user_id, goal, age, selfTest, duration, behaviour, calculatedRiskRate, yin, yang, returnRate, volatility, safetyZone, lowerLimit)
             SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
             WHERE NOT EXISTS (
                 SELECT 1 FROM riskAssessment WHERE user_id = $1
             )
             RETURNING *`,
            [userId, answers.goal, answers.age, answers.selfTest, answers.duration, answers.behaviour, calculatedRiskRate, riskValues.yin, riskValues.yang, riskValues.return, riskValues.volatility, riskValues.safetyZone, riskValues.lowerLimit]
        );
        const serverResponse: RiskRateResponseAndID = { userId: userId, ...riskRate };
        res.json(serverResponse);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

app.get('/entries/:id', async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const answerAndResponse = await pool.query('SELECT * FROM riskAssessment WHERE user_id = $1', [id]);
        const rawData = answerAndResponse.rows[0];
        if (answerAndResponse.rows.length > 0) {
            const transformedData: RiskRateResponseAndID = {
                userId: rawData.user_id,
                answers: {
                  goal: rawData.goal,
                  age: rawData.age,
                  selfTest: rawData.selftest,
                  duration: rawData.duration,
                  behaviour: rawData.behaviour,
                },
                calculatedRiskRate: rawData.calculatedriskrate,
                riskValues: {
                  yin: rawData.yin,
                  yang: rawData.yang,
                  return: rawData.returnrate,
                  volatility: rawData.volatility,
                  safetyZone: rawData.safetyzone,
                  lowerLimit: rawData.lowerlimit,
                },
            }
            res.json(transformedData); 
        } else {
            res.status(404).send("Entry not found"); 
        }
    } catch (err) {
        res.status(500).send("Server error");
    }
});

app.listen((5001), () => {
    console.log("Server has started on port 5001");
});