import { Box, Button } from "@mui/material";
import { riskAssessmentData } from "../constants";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

interface PreviousAndNextButtonProps {
    activeStep: number,
    handleBack: () => void,
    handleNext: () => void,
}

const PreviousAndNextButton = (props: PreviousAndNextButtonProps) => {
    return (
        <Box
        sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            justifyContent: props.activeStep !== 0 ? 'space-between' : 'flex-end',
            alignItems: 'end',
            flexGrow: 1,
            gap: 1,
            pb: { xs: 2, sm: 0 },
            mt: { xs: 2, sm: 0 },
            mb: '60px'
        }}
    >
        {
            props.activeStep !== 0 && (
                <Button
                    startIcon={<ChevronLeftRoundedIcon />}
                    onClick={props.handleBack}
                    variant="text"
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        width: { xs: '100%', sm: 'fit-content' }
                    }}
                >
                    Zurück
                </Button>
            )
        }
        <Button
            variant="contained"
            endIcon={<ChevronRightRoundedIcon />}
            onClick={props.handleNext}
            sx={{
                display: { xs: 'none', sm: 'flex' },
                width: { xs: '100%', sm: 'fit-content' }
            }}
        >
            {
                props.activeStep === riskAssessmentData.questions.length ? 'Ergebnis anzeigen' : 'Weiter'
            }
        </Button>
    </Box>
    )
}

export default PreviousAndNextButton;