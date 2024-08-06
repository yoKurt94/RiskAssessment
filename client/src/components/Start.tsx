import { useState } from "react";
import { 
    Box,
    Button,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Typography
} from "@mui/material";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import SearchIcon from '@mui/icons-material/Search'; 

interface StartProps {
    didClickStart: (() => void),
    didclickResultSearch: ((id: string) => void)
}

const Start = (props: StartProps) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSearchClick = () => {
        if (inputValue !== '') {
            props.didclickResultSearch(inputValue);
        }
    };

    return (
            <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            gap={7}
            sx={{
                height: { md: 300 },
                pb: { xs: 5, md: 0 }
            }}
            >
                <Button
                variant="contained"
                endIcon={<ChevronRightRoundedIcon/>}
                onClick={props.didClickStart}
                sx={{
                    minWidth: 120
                }}
                >
                    Start
                </Button>
                <Box>
                <Typography
                variant="body2"
                >
                    oder trage deine ID ein wenn du den Test schon einmal gemacht hast um dein vorheriges Ergebnis anzuzeigen:
                </Typography>
                <OutlinedInput
                placeholder="ID"
                value={inputValue}
                onChange={handleInputChange}
                sx={{
                    width: '100%'
                }}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="search"
                        edge="end"
                        onClick={handleSearchClick}
                        >
                            <SearchIcon/>
                        </IconButton>
                    </InputAdornment>
                }
                ></OutlinedInput>
                
                </Box>
            </Box>
    )
}

export default Start;