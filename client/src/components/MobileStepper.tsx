import { Box, MobileStepper, Button, CircularProgress, } from "@mui/material";
import { riskAssessmentData } from "../constants";

interface PhoneStepperProps {
    activeStep: number,
    handleNext: () => void,
    handleBack: () => void,
    isLoading: boolean
}

const PhoneStepper = (props: PhoneStepperProps) => {
    return (
        <Box
            sx={{
                display: { xs: 'flex', sm: 'none' },
                flexDirection: 'column',
                flexGrow: 1,
                width: '100%',
            }}
        >
            <MobileStepper
                variant="dots"
                id='mobile-stepper'
                steps={riskAssessmentData.questions.length}
                activeStep={props.activeStep - 1}
                nextButton={
                    props.isLoading ? <CircularProgress/> :
                        <Button
                            onClick={props.handleNext}
                        >
                            {
                                props.activeStep === riskAssessmentData.questions.length ? 'Ergebnis anzeigen' : 'Weiter'
                            }
                        </Button>
                }
                backButton={
                    <Button
                        onClick={props.handleBack}
                    >
                        Zurück
                    </Button>
                }
            >

            </MobileStepper>
        </Box>
    )
}

export default PhoneStepper;