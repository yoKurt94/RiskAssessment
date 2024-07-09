import { useEffect, useState } from "react";
import {
    Box,
    Typography,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { lilac, grey } from "../CustomTheme";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import * as Types from '../types'
import { getRiskEmoji } from "../constants";

interface ResultCardProps {
    resultData: Types.RiskRateResponse
}

const ResultCard = (props: ResultCardProps) => {
    const [chartSize, setChartSize] = useState({ width: 200, height: 100 });
    
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 600) {
                setChartSize({ width: 150, height: 75 });
            } else {
                setChartSize({ width: 200, height: 100 });
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const CardContainer = styled('div')(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: 375,
        padding: theme.spacing(3),
        borderRadius: '20px',
        border: '1px solid',
        borderColor: theme.palette.divider,
        background: `linear-gradient(to bottom right, ${lilac[25]} 55%, ${grey[50]} 100%)`,
        boxShadow: '0px 4px 8px hsla(210, 0%, 0%, 0.05)',
        [theme.breakpoints.up('xs')]: {
            height: 300,
        },
        [theme.breakpoints.up('sm')]: {
            height: 350,
        },
    }))

    const yinYangData = [
        { id: 0, value: props.resultData.riskValues.yin, label: 'Yin', color: 'white' },
        { id: 1, value: props.resultData.riskValues.yang, label: 'Yang', color: 'black' },
    ]

    return (
        <CardContainer>

            {/* Top Box */}
            <Box
                display='flex'
                flexGrow={1}
                gap={2}
            >

                {/* Risk Box*/}
                <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    width='50%'
                    gap={4}
                >
                    <Typography
                        alignSelf='center'
                        sx={{
                            typography: {
                                xs: 'body1',
                                sm: 'h4'
                            },
                            width: '100%',
                            wordWrap: 'break-word'
                        }}

                    >
                        Risikokennzahl
                    </Typography>
                    <Box
                        display='flex'
                    >
                        <Typography
                            fontSize={80}
                            sx={{
                                typography: {
                                    xs: {
                                        fontSize: 50
                                    },
                                    sm: {
                                        fontSize: 80
                                    }
                                },
                            }}
                        >
                            { props.resultData.calculatedRiskRate }
                        </Typography>
                        <Typography
                            sx={{
                                typography: {
                                    xs: {
                                        fontSize: 50
                                    },
                                    sm: {
                                        fontSize: 80
                                    }
                                },
                            }}
                        >
                            { getRiskEmoji(props.resultData.calculatedRiskRate) }
                        </Typography>
                    </Box>
                </Box>

                {/* Yin & Yang Box */}
                <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    width='50%'
                    gap={4}
                >
                    <Typography
                        alignSelf='start'
                        sx={{
                            typography: {
                                xs: 'body1',
                                sm: 'h4'
                            }
                        }}
                    >
                        Yin & Yang
                    </Typography>
                    <Box
                        display='flex'
                    >
                        <PieChart
                            series={[{
                                arcLabel: (item) => `${item.value}`,
                                data: yinYangData,
                            }]}
                            width={chartSize.width}
                            height={chartSize.height}
                            sx={{
                                [`& .${pieArcLabelClasses.root}`]: {
                                    fill: 'gray',
                                    fontWeight: 'bold',
                                  },
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            {/* Bottom Box */}
            <Box
                display='flex'
                flexGrow={0.6}
                gap={2}
            >

                {/* Growth Box */}
                <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='space-between'
                    width='50%'
                    sx={{
                        gap: { sm: 4 }
                    }}
                >
                    <Typography
                        alignSelf='start'
                        sx={{
                            typography: {
                                xs: 'body1',
                                sm: 'h4'
                            },
                            width: '100%',
                            wordWrap: 'break-word'
                        }}

                    >
                        Wachstumsprognose
                    </Typography>
                    <Box
                        display='flex'

                    >
                        <Typography
                            fontSize={30}
                            fontWeight='bold'
                        >
                            { `${props.resultData.riskValues.return }%` }
                        </Typography>
                    </Box>
                </Box>

                {/* Volatility Box */}
                <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='space-between'
                    width='50%'
                    sx={{
                        gap: { sm: 4 }
                    }}
                >
                    <Typography
                        alignSelf='start'
                        sx={{
                            typography: {
                                xs: 'body1',
                                sm: 'h4'
                            }
                        }}
                    >
                        Volatiliät
                    </Typography>
                    <Box
                        display='flex'
                    >
                        <Typography
                            fontSize={30}
                            fontWeight='bold'
                        >
                            { `${props.resultData.riskValues.volatility }%` }
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </CardContainer>
    )
}

export default ResultCard;