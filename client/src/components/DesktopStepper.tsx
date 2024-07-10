import { Box, Stepper, Step, StepLabel } from "@mui/material";
import { riskAssessmentData } from "../constants";

interface DesktopStepperProps {
    activeStep: number
}

const DesktopStepper = (props: DesktopStepperProps) => {
    return (
        <Box
        sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexGrow: 1,
            height: 150
        }}
    >
        <Stepper
            id='desktop-stepper'
            activeStep={props.activeStep - 1}
            sx={{
                width: '100%',
                height: 40
            }}
        >
            {
                riskAssessmentData.questions.map((item) => (
                    <Step
                        sx={{
                            ':first-of-type': { pl: 0 },
                            ':last-child': { pr: 0 }
                        }}
                        key={item.section}
                    >
                        <StepLabel
                        >
                            {item.section}
                        </StepLabel>
                    </Step>
                ))
            }
        </Stepper>
    </Box>
    )
}

export default DesktopStepper;