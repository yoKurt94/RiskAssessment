import {
    Box,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@mui/material";
import * as Types from '../types'
import { resultExplanations } from "../constants";

interface ResultCardAlternativeProps {
    resultData: Types.RiskRateResponse
}

const ResultCardAlternative = (props: ResultCardAlternativeProps) => {
    const flattenRiskRateResponse = (resultData: Types.RiskRateResponse) => {
        const flattenedData = [];

        flattenedData.push({ label: 'calculatedRiskRate', value: resultData.calculatedRiskRate ***REMOVED***
        Object.entries(resultData.riskValues).forEach(([key, value]) => {
            if (key !== "safetyZone" && key !== "lowerLimit") {
                if (key !== "calculatedRiskRate") {
                    flattenedData.push({ label: key, value: `${value}%` ***REMOVED***
                } else {
                    flattenedData.push({ label: key, value ***REMOVED***
                }
            }
        ***REMOVED***
        return flattenedData;
    };

    const flattenedData = flattenRiskRateResponse(props.resultData);
    
    return (
        <Box
            width='100%'
        >
            <List>
                {
                    flattenedData.map(({ label, value }) => (
                        <ListItem
                            key={label}
                            sx={{
                                py: 0,
                                px: 0,
                            }}>
                            <ListItemText
                                sx={{
                                    mr: 6
                                }}
                                primary={resultExplanations[label].text}
                                secondary={resultExplanations[label].explanation}
                            />
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                {value}
                            </Typography>
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    )
}

export default ResultCardAlternative;