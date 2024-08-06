import {
    useState,
    useEffect,
    useContext,
    useRef
} from "react";
import {
    Box,
    Alert,
    Collapse,
    IconButton,
    LinearProgress
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Question from "./Question";
import { riskAssessmentData } from "../constants";
import Result from "./Result";
import Start from "./Start";
import DesktopStepper from "./DesktopStepper";
import PhoneStepper from "./MobileStepper";
import PreviousAndNextButton from "./PreviousAndNextButton";
import { UserAnswerContext, QueryKey, RiskRateResponseAndID } from "../../../common/types";
import { QueryFunctionContext } from '@tanstack/react-query';
import { useQuery } from "@tanstack/react-query";


interface RightSideProps {
    didChangeQuestion: ((questionNumber: number) => void)
}

const RightSide = (props: RightSideProps) => {
    const uniqueIdRef = useRef<string | null>(null);
    const [activeStep, setActiveStep] = useState<number>(0);
    const [didClickBack, setDidClickBack] = useState<boolean>(false);
    const [previousResultId, setPreviousResultId] = useState<string>('');
    const { answerAndResponseState, setanswerAndResponseState } = useContext(UserAnswerContext);
    const [open, setOpen] = useState<boolean>(false);
    const [formError, setFormError] = useState<string | null>(null);

    const fetchResponse = async ({ queryKey }: QueryFunctionContext<QueryKey>) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [endpoint, _idOrStep, answers] = queryKey;

        if (endpoint === 'entries') {
            const response = await fetch(`http://localhost:5001/entries/${previousResultId}`);
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            const data: RiskRateResponseAndID = await response.json();
            return data;
        } else if (endpoint === 'calculate-risk') {
            const response = await fetch('http://localhost:5001/calculate-risk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(answers)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: RiskRateResponseAndID = await response.json();
            return data;
        }
    };

    const queryKey: QueryKey = previousResultId !== ''
        ? ['entries', previousResultId]
        : ['calculate-risk', activeStep, answerAndResponseState.answers];

    const enabled = previousResultId !== '' || activeStep === riskAssessmentData.questions.length + 1;

    const { data: fetchResponseData, isLoading, error: fetchError } = useQuery(
        {
            queryKey: queryKey,
            queryFn: fetchResponse,
            enabled: enabled,
        }
    );

    useEffect(() => {
        if (fetchResponseData) {
            setActiveStep(riskAssessmentData.questions.length + 1)
        } else if (fetchError) {
            setActiveStep(0);
            setFormError(fetchError.message);
            setPreviousResultId('');
        }
    }, [fetchResponseData, fetchError])

    useEffect(() => {
        setOpen(formError != null);
    }, [formError])

    useEffect(() => {
        if (fetchResponseData && !previousResultId) {
            if (!uniqueIdRef.current) {
                uniqueIdRef.current = fetchResponseData.userId;
            }
            setanswerAndResponseState((prevState) => ({
                ...prevState,
                calculatedRiskRate: fetchResponseData.calculatedRiskRate,
                riskValues: fetchResponseData.riskValues,
                userId: uniqueIdRef.current!
            }))
        }
    }, [fetchResponseData, previousResultId, setanswerAndResponseState]);

    useEffect(() => {
        props.didChangeQuestion(activeStep);
    }, [activeStep, props]);

    const handleBack = () => {
        setDidClickBack(true);
        setActiveStep(activeStep - 1);
    }

    const handleNext = () => {
        setDidClickBack(false);
        setActiveStep(activeStep + 1);
    }

    const renderContent = () => {

        if (activeStep === 0 || formError) {
            return (
                <>
                    <Start didClickStart={() => {
                        setActiveStep(1);
                        setFormError(null);
                    }}
                        didclickResultSearch={(id) => {
                            setPreviousResultId(id);
                        }}
                    />
                    {
                        isLoading ? <LinearProgress color="success" /> : null
                    }
                    {
                        formError && (
                            <Box sx={{ width: '100%', mt: 2 }}>
                                <Collapse in={open}>
                                    <Alert severity="error" action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setOpen(false);
                                                setFormError(null);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }>
                                        {formError}
                                    </Alert>
                                </Collapse>
                            </Box>
                        )}
                </>
            )
        }
        else if (activeStep === riskAssessmentData.questions.length + 1 && !isLoading && !fetchError) {
            return (
                previousResultId !== '' ? (
                    <Result isSavedResult={true} fetchResponse={fetchResponseData} uniqeID={previousResultId} />
                ) : (
                    <Result isSavedResult={false} fetchResponse={fetchResponseData} uniqeID={uniqueIdRef.current ? uniqueIdRef.current : ""} />
                )
            )
        } else if (activeStep !== 0 || (activeStep !== riskAssessmentData.questions.length + 1 && isLoading)) {
            return (
                <>
                    <Box
                        sx={{
                            height: { sm: 200 },
                            maxHeight: { sm: 200 },
                        }}
                    >
                        <Question
                            didClickBack={didClickBack}
                            questionNo={activeStep - 1}
                        />
                    </Box>
                    <PreviousAndNextButton 
                    activeStep={activeStep} 
                    handleBack={handleBack} 
                    handleNext={handleNext} 
                    isLoading={isLoading}
                    />
                </>
            )
        }
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    pb: 10
                }}
            >
                {
                    activeStep !== riskAssessmentData.questions.length + 1 || isLoading ? (
                        <>
                            <DesktopStepper activeStep={activeStep} />
                            {
                                activeStep !== 0 ? (
                                    <PhoneStepper 
                                    isLoading={isLoading}
                                    activeStep={activeStep} 
                                    handleBack={handleBack} 
                                    handleNext={handleNext} />
                                ) : (null)
                            }
                        </>
                    ) : null
                }
                {renderContent()}
            </Box>
        </>
    );
}

export default RightSide;