import { 
    useState,
    useContext,
} from "react";
import {
    Box,
    Stack,
    Typography,
    Chip,
    Skeleton,
    Button
} from "@mui/material";
// import ResultCard from './ResultCard';
import ResultCardAlternative from "./ResultCardAlternative";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import * as Types from '../types';
import useFetch from "../hooks/useFetch";

interface ResultProps {
    fetchResponse: Types.FetchResponse,
    uniqeID: string,
    isSavedResult: boolean
}

const Result = (props: ResultProps) => {
    const [copyIcon, setCopyIcon] = useState(<ContentCopyIcon />);
    const { answerAndResponseState } = useContext(Types.UserAnswerContext);
    useFetch(
        "http://localhost:5001/add_entry",
        [answerAndResponseState],
        answerAndResponseState.calculatedRiskRate !== 0 && !props.isSavedResult,
        "POST", 
        answerAndResponseState
    );

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
            {
                props.fetchResponse.loading ? (
                    <Skeleton variant="rounded" sx={{
                        width: '100%',
                        height: 350
                    }} />
                ) : (
                    props.fetchResponse.data ? (

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
                                <ResultCardAlternative resultData={props.fetchResponse.data} />
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
                    ) : (null)
                )
            }
        </>
    )
}

export default Result;