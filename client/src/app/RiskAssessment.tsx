
import { useState } from 'react';
import {
  CssBaseline,
  Grid,
  ThemeProvider,
} from '@mui/material';
import RightSide from '../components/RightSide';
import LeftSide from '../components/LeftSide';
import theme from '../CustomTheme';

const RiskAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Grid
          container
          sx={{
            height: '100vh',
          }}
        >
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              borderRight: { sm: 'none', md: '1px solid' },
              borderColor: { sm: 'none', md: 'divider' },
              backgroundColor: theme.palette.background.default,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              pt: 10,
              px: { xs: 3, sm: 10, md: 4, lg: 10},
              gap: 4
            }}
          >
            <LeftSide currentQuestion={currentQuestion}/>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              pt: 10,
              px: { xs: 3, sm: 10, md: 4, lg: 10},
              maxWidth: { md: 700 }
            }}
          >
            <RightSide didChangeQuestion={(questionNo) => {
              setCurrentQuestion(questionNo)
            }}/>  
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default RiskAssessment;
