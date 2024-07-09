const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

app.post('/add_entry', async (req, res) => {
    try {
        const { answers, riskValues, userId, calculatedRiskRate } = req.body; 

        const newEntry = await pool.query(
            `INSERT INTO riskAssessment(user_id, goal, age, selfTest, duration, behaviour, calculatedRiskRate, yin, yang, returnRate, volatility, safetyZone, lowerLimit)
             SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
             WHERE NOT EXISTS (
                 SELECT 1 FROM riskAssessment WHERE user_id = $1
             )
             RETURNING *`,
            [userId, answers.goal, answers.age, answers.selfTest, answers.duration, answers.behaviour, calculatedRiskRate, riskValues.yin, riskValues.yang, riskValues.return, riskValues.volatility, riskValues.safetyZone, riskValues.lowerLimit]
        );

        if (newEntry.rows.length > 0) {
            res.json(newEntry.rows[0]);
        } else {
            console.log("Entry already exists or no new entry created.");
            res.status(409).send("Entry already exists or no new entry created.");
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


app.get('/entries/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const answerAndResponse = await pool.query('SELECT * FROM riskAssessment WHERE user_id = $1', [id]);
        const rawData = answerAndResponse.rows[0];
        if (answerAndResponse.rows.length > 0) {
            const transformedData = {
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
        console.log(err.message);
        res.status(500).send("Server error");
    }
});

app.listen((5001), () => {
    console.log("Server has started on port 5001");
});