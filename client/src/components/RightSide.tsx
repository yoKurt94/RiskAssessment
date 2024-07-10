import {
    useState,
    useEffect,
    useContext,
    useRef
} from "react";
import {
    Box,
    Button,
    Alert
} from "@mui/material";
import Question from "./Question";
import { riskAssessmentData } from "../constants";
import Result from "./Result";
import Start from "./Start";
import DesktopStepper from "./DesktopStepper";
import PhoneStepper from "./MobileStepper";
import PreviousAndNextButton from "./PreviousAndNextButton";
import useFetch from "../hooks/useFetch";
import { UserAnswerContext } from "../types";
import { v4 } from 'uuid';

interface RightSideProps {
    didChangeQuestion: ((questionNumber: number) => void)
}

const RightSide = (props: RightSideProps) => {
    const uniqueIdRef = useRef<string | null>(null);
    const [activeStep, setActiveStep] = useState<number>(0);
    const [didClickBack, setDidClickBack] = useState<boolean>(false);
    const [previousResultId, setPreviousResultId] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const { answerAndResponseState, setanswerAndResponseState } = useContext(UserAnswerContext);
    const calculationResponse = useFetch(
        'https://sandbox.onboarding-api.evergreen.de/risk-rate/calculate',
        [activeStep],
        activeStep === riskAssessmentData.questions.length + 1,
        'POST',
        answerAndResponseState.answers
    );
    const resultSearchResponse = useFetch(
        `http://localhost:5001/entries/${previousResultId}`,
        [previousResultId],
        previousResultId !== '',
        'GET'
    );

    useEffect(() => {
        if (calculationResponse.error && !resultSearchResponse.data) {
            setActiveStep(0);
            setError(calculationResponse.error);
        } else if (resultSearchResponse.error && !calculationResponse.data) {
            setPreviousResultId('');
            setActiveStep(0);
            setError(resultSearchResponse.error);
        }
    }, [resultSearchResponse]);

    useEffect(() => {
        if (calculationResponse.data) {
            if (uniqueIdRef.current === null) {
                uniqueIdRef.current = v4();
            }
            setanswerAndResponseState((prevState) => ({
                ...prevState,
                calculatedRiskRate: calculationResponse.data!.calculatedRiskRate,
                riskValues: calculationResponse.data!.riskValues,
                userId: uniqueIdRef.current!
            }))
        }
    }, [calculationResponse]);

    useEffect(() => {
        props.didChangeQuestion(activeStep);
    }, [activeStep]);

    const handleBack = () => {
        setDidClickBack(true);
        setActiveStep(activeStep - 1);
    }

    const handleNext = () => {
        setDidClickBack(false);
        setActiveStep(activeStep + 1);
    }

    const handleSubmit = (event: React.FormEvent, isValid: boolean) => {
        event.preventDefault();
        if (isValid) {
            setActiveStep(activeStep + 1);
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {
                    activeStep !== riskAssessmentData.questions.length + 1 ? (
                        <>
                        <DesktopStepper activeStep={activeStep}/>
                            {
                                activeStep !== 0 ? (
                                    <PhoneStepper activeStep={activeStep} handleBack={handleBack} handleNext={handleNext}/>
                                ) : (null)
                            }
                        </>
                    ) : null
                }
                {
                    activeStep === 0 || error ? (
                        <>
                            <Start didClickStart={() => {
                                setError(null);
                                setActiveStep(1)
                            }}
                                didclickResultSearch={(id) => {
                                    setError(null);
                                    setPreviousResultId(id);
                                    setActiveStep(riskAssessmentData.questions.length + 1)
                                }}
                            />
                            {error && (
                                <Box sx={{ width: '100%', mt: 2 }}>
                                    <Alert severity="error" action={
                                        <Button color="inherit" size="small" onClick={() => window.location.href = '/'}>
                                            Zurück zum Start
                                        </Button>
                                    }>
                                        {error}
                                    </Alert>
                                </Box>
                            )}
                        </>
                    ) :
                        activeStep === riskAssessmentData.questions.length + 1 ? (
                            previousResultId !== '' ? (
                                <Result isSavedResult={true} fetchResponse={resultSearchResponse} uniqeID={previousResultId} />
                            ) : (
                                <Result isSavedResult={false} fetchResponse={calculationResponse} uniqeID={uniqueIdRef.current ? uniqueIdRef.current : ""} />
                            )
                        ) : (
                            <>
                                <Box
                                    sx={{
                                        height: { sm: 200 },
                                        maxHeight: { sm: 200 },
                                    }}
                                >
                                    <Question
                                        didClickBack={didClickBack}
                                        question={riskAssessmentData.questions[activeStep - 1]}
                                        handleSubmit={handleSubmit}
                                    />
                                </Box>
                                <PreviousAndNextButton activeStep={activeStep} handleBack={handleBack} handleNext={handleNext}/>
                            </>
                        )
                }
            </Box>
        </>
    )
}

export default RightSide;