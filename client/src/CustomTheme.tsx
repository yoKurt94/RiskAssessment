import { alpha, createTheme } from "@mui/material";

export const green = {
    50: 'hsl(163, 44%, 95%)',
    100: 'hsl(163, 44%, 85%)',
    200: 'hsl(163, 44%, 75%)',
    300: 'hsl(163, 44%, 65%)',
    400: 'hsl(163, 44%, 55%)',
    500: 'hsl(163, 44%, 50%)',
    600: 'hsl(163, 44%, 45%)',
    700: 'hsl(163, 44%, 40%)',
    800: 'hsl(163, 44%, 35%)',
    900: 'hsl(163, 44%, 30%)',
};

export const lilac = {
  25: 'hsl(276, 71%, 97%)',
    50: 'hsl(276, 71%, 95%)',
    100: 'hsl(276, 71%, 85%)',
    200: 'hsl(276, 71%, 75%)',
    300: 'hsl(276, 71%, 65%)',
    400: 'hsl(276, 71%, 55%)',
    500: 'hsl(276, 71%, 50%)',
    600: 'hsl(276, 71%, 45%)',
    700: 'hsl(276, 71%, 40%)',
    800: 'hsl(276, 71%, 35%)',
    900: 'hsl(276, 71%, 30%)',
};

export const grey = {
    50: 'hsl(252, 11%, 98%)',
    100: 'hsl(252, 11%, 90%)',
    200: 'hsl(252, 11%, 80%)',
    300: 'hsl(252, 11%, 70%)',
    400: 'hsl(252, 11%, 60%)',
    500: 'hsl(252, 11%, 50%)',
    600: 'hsl(252, 11%, 40%)',
    700: 'hsl(252, 11%, 30%)',
    800: 'hsl(252, 11%, 20%)',
    900: 'hsl(252, 11%, 10%)',
};

const theme = createTheme({
    palette: {
        primary: {
            light: green[200],
            main: green[500],
            dark: green[800],
        },
        secondary: {
            main: lilac[600],
            light: lilac[400],
        },
        grey: {
            ...grey
        },
        divider: alpha(grey[300], 0.5),
        background: {
            default: green[50],
            paper: grey[100]
        },
        text: {
            primary: grey[800],
            secondary: grey[600],
        },
        action: {
            selected: `${alpha(green[200], 0.2)}`
        },
        success: {
            main: green[500]
        }
    },
    shape: {
        borderRadius: 12
    },
    typography: {
        fontFamily: ['"Lato", "sans-serif"'].join(','),
        h1: {
            fontFamily: "Playfair Display",
            fontSize: 50,
            fontWeight: 800,
        },
        h2: {
            fontFamily: "Playfair Display",
            fontSize: 26,
            fontWeight: 600,
        },
        h3: {
            fontSize: 22,
        },
        h4: {
            fontSize: 20,
        },
        subtitle1: {
            fontSize: 18,
        },
        subtitle2: {
            fontSize: 16,
        },
        body1: {
            textAlign: 'justify',
            fontSize: 15,
            fontWeight: 400,
        },
        body2: {
            fontSize: 14,
            fontWeight: 400,
        },
        caption: {
            fontSize: 12,
            fontWeight: 400,
        },
    },
    components: {
        MuiStepConnector: {
            styleOverrides: {
                line: () => ({
                    borderTop: '1px solid',
                    borderColor: theme.palette.divider,
                    flex: 1,
                    borderRadius: 99
                })
            }
        },
        MuiStepIcon: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: 'transparent',
                    border: `1px solid ${grey[400]}`,
                    width: 11,
                    height: 11,
                    borderRadius: '50%',
                    '& text': {
                        display: 'none'
                    },
                    '&.Mui-active': {
                        border: 'none',
                        color: theme.palette.secondary.light
                    },
                    '&.Mui-completed': {
                        border: 'none',
                        color: theme.palette.success.main
                    }
                }),
            },
            variants: [
                {
                    props: { completed: true },
                    style: {
                        width: 12,
                        height: 12,
                    },
                },
            ],
        },
        MuiStepLabel: {
            styleOverrides: {
                label: ({ theme }) => ({
                    '&.Mui-completed': {
                        opacity: 0.6
                    },
                    fontSize: theme.typography.caption.fontSize
                })
            }
        },
        MuiStack: {
            defaultProps: {
                useFlexGap: true,
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    border: 'none'
                },
                input: {
                    paddingLeft: 10
                },
                root: ({ theme }) => ({
                    'input:-webkit-autofill': {
                        WebKitBoxShadow: `0 0 0 1000px ${green[100]} inset, 0 0 0 1px ${green[200]}`,
                        maxHeight: '4px',
                        borderRadius: '8px',
                    },
                    '& .MuiInputBase-input': {
                        fontSize: '1rem',
                        '&::placeholder': {
                            opacity: 0.7,
                            color: grey[500],
                        },
                    },
                    boxSizing: 'border-box',
                    flexGrow: 1,
                    height: '40px',
                    borderRadius: theme.shape.borderRadius,
                    border: '1px solid',
                    borderColor: alpha(grey[100], 0.8),
                    boxShadow: '0 0 0 1.5px hsla(210, 0%, 0%, 0.02) inset',
                    transition: 'border-color 120ms ease-in',
                    backgroundColor: alpha(grey[50], 0.4),
                    '&:hover': {
                        borderColor: green[300],
                    },
                    '&.Mui-focused': {
                        outline: `3px solid ${alpha(green[500], 0.5)}`,
                        outlineOffset: '0px',
                        borderColor: green[400],
                    },
                })
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: ({ theme }) => ({
                    typography: theme.typography.caption,
                    marginBottom: 8,
                }),
            },
        },
        MuiButton: {
            styleOverrides: {
                root: ({theme}) => ({
                    boxShadow: 'none',
                    borderRadius: theme.shape.borderRadius,
                    textTransform: 'none',
                    variants: [
                        {
                          props: {
                            size: 'small',
                          },
                          style: {
                            height: '2rem', 
                            padding: '0 0.5rem',
                          },
                        },
                        {
                          props: {
                            size: 'medium',
                          },
                          style: {
                            height: '2.5rem', 
                          },
                        },
                        {
                          props: {
                            color: 'primary',
                            variant: 'contained',
                          },
                          style: {
                            color: 'white',
                            backgroundColor: green[300],
                            backgroundImage: `linear-gradient(to bottom, ${alpha(green[600], 0.8)}, ${green[500]})`,
                            boxShadow: `inset 0 2px 0 ${alpha(green[200], 0.2)}, inset 0 -2px 0 ${alpha(green[700], 0.4)}`,
                            border: `1px solid ${green[500]}`,
                            '&:hover': {
                              backgroundColor: green[700],
                              boxShadow: 'none',
                            },
                            '&:active': {
                              backgroundColor: green[700],
                              boxShadow: `inset 0 2.5px 0 ${alpha(green[700], 0.4)}`,
                            },
                          },
                        },
                        {
                          props: {
                            variant: 'outlined',
                          },
                          style: {
                            color: green[700],
                            backgroundColor: alpha(green[300], 0.1),
                            borderColor: alpha(green[200], 0.8),
                            boxShadow: `inset 0 2px ${alpha(green[50], 0.5)}, inset 0 -2px ${alpha(green[200], 0.2)}`,
                            '&:hover': {
                              backgroundColor: alpha(green[300], 0.2),
                              borderColor: alpha(green[300], 0.5),
                              boxShadow: 'none',
                            },
                            '&:active': {
                              backgroundColor: alpha(green[300], 0.3),
                              boxShadow: `inset 0 2.5px 0 ${alpha(green[400], 0.2)}`,
                              backgroundImage: 'none',
                            },
                          },
                        },
                        {
                          props: {
                            color: 'secondary',
                            variant: 'outlined',
                          },
                          style: {
                            backgroundColor: alpha(grey[300], 0.1),
                            borderColor: alpha(grey[300], 0.5),
                            color: grey[700],
                            '&:hover': {
                              backgroundColor: alpha(grey[300], 0.3),
                              borderColor: alpha(grey[300], 0.5),
                              boxShadow: 'none',
                            },
                            '&:active': {
                              backgroundColor: alpha(grey[300], 0.4),
                              boxShadow: `inset 0 2.5px 0 ${alpha(grey[400], 0.2)}`,
                              backgroundImage: 'none',
                            },
                          },
                        },
                        {
                          props: {
                            color: 'primary',
                            variant: 'text',
                          },
                          style: {
                            color: green[700],
                            '&:hover': {
                              backgroundColor: alpha(green[300], 0.3),
                            },
                          },
                        },
                        {
                          props: {
                            color: 'info',
                            variant: 'text',
                          },
                          style: {
                            color: grey[700],
                            '&:hover': {
                              backgroundColor: alpha(grey[300], 0.3),
                            },
                          },
                        },
                      ],
                })
            }
        },
    }
})

export default theme;

