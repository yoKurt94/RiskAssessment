import {
    useState,
} from "react";
import {
    Box,
    Stack,
    Typography,
    Chip,
    Button
} from "@mui/material";
// import ResultCard from './ResultCard';
import ResultCardAlternative from "./ResultCardAlternative";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import * as Types from '../../../common/types';

interface ResultProps {
    fetchResponse: Types.RiskRateResponseAndID | undefined,
    uniqeID: string,
    isSavedResult: boolean
}

const Result = (props: ResultProps) => {
    const [copyIcon, setCopyIcon] = useState(<ContentCopyIcon />);

    const copyToClipboard = (text: string | null) => {
        if (text) {
            navigator.clipboard.writeText(text).then(() => {
                setCopyIcon(<LibraryAddCheckIcon />);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            })
        }
    }

    const handleClick = () => {
        copyToClipboard(props.uniqeID);
    };

    return (
        <>
            <Stack
                useFlexGap
                sx={{
                    mb: 5
                }}
            >
                <Typography
                    variant='h3'
                    pb={4}
                >
                    Ergebnis
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        mb: 5
                    }}
                >
                    <ResultCardAlternative resultData={props.fetchResponse} />
                </Box>

                {/* Result Unique ID Box */}
                <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    gap={2}
                    mb={5}
                >
                    <Typography>Kopiere diese ID um dein Ergebnis immer wieder aufzurufen:</Typography>
                    <Chip
                        label={props.uniqeID}
                        onClick={handleClick}
                        onDelete={handleClick}
                        deleteIcon={copyIcon}
                        variant="outlined"
                    />
                </Box>
                <Button
                    variant="contained"
                    type="a"
                    href="/"
                    sx={{
                        width: { xs: '100%', sm: 'fit-content' }
                    }}
                >
                    Erneut berechnen
                </Button>
            </Stack>
        </>
    )
}

export default Result;