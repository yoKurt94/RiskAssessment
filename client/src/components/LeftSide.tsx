import { useContext } from "react";
import {
    Box,
    Button,
} from "@mui/material";
import Info from "./Info";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { leftSideStartTexts, riskAssessmentData, getInvestmentMessage } from "../constants";
import { UserAnswerContext } from "../types";

interface LeftCheckoutSide {
    currentQuestion: number
}

const LeftSide = (props: LeftCheckoutSide) => {
    const { answerAndResponseState } = useContext(UserAnswerContext);

    const logoStyle = {
        width: '140px',
        height: '140px',
        marginLeft: '10px',
        marginRight: '10px'
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    width: '100%',
                }}
            >
                <Box
                sx={{
                    pb: 4
                }}
                >
                    <Button
                        startIcon={<ArrowBackRoundedIcon />}
                        component="a"
                        href="https://www.evergreen.de"
                        sx={{
                            ml: '-8px'
                        }}
                    >
                        Zurück zu
                        <img
                            src="/Logo_Evergreen.png"
                            style={logoStyle}
                        >
                        </img>
                    </Button>
                </Box>
                {
                    props.currentQuestion === 0 ? <Info subheader={leftSideStartTexts.subheader} paragraphs={leftSideStartTexts.paragraphs} /> : (props.currentQuestion >= 1 && props.currentQuestion <= 5) ?
                    <Info subheader={riskAssessmentData.questions[props.currentQuestion - 1].section} paragraphs={riskAssessmentData.questions[props.currentQuestion - 1].explanation} /> :
                    <Info subheader="Analyse deines Ergebnisses" paragraphs={getInvestmentMessage(answerAndResponseState).filter((message): message is string => message !== undefined) as string[]}/>
                }
            </Box>
        </>
    )
}

export default LeftSide;