import { Box, MobileStepper, Button, } from "@mui/material";
import { riskAssessmentData } from "../constants";

interface PhoneStepperProps {
    activeStep: number,
    handleNext: () => void,
    handleBack: () => void
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
                <Button
                    onClick={props.handleNext}
                >
                    Weiter
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