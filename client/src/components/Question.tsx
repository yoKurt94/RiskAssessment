import {
    useState,
    useContext,
    useEffect
} from "react";
import {
    Box,
    RadioGroup,
    FormControlLabel,
    Radio,
    Slider,
    FormControl,
    FormLabel,
    FormHelperText
} from "@mui/material";
import * as Types from '../types';
import { riskAssessmentData } from "../constants";

interface QuestionProps {
    didClickBack: boolean,
    question: Types.QuestionaireQuestion,
    handleSubmit: (event: React.FormEvent, isValid: boolean) => void
}

const Question = (props: QuestionProps) => {
    const { answerAndResponseState, setanswerAndResponseState } = useContext(Types.UserAnswerContext);
    const defaultValue = answerAndResponseState.answers[props.question.key as keyof typeof answerAndResponseState.answers];    
    const defaultValueString = typeof defaultValue === 'number' ? defaultValue.toString() : defaultValue;
    const [value, setValue] = useState<string>(defaultValueString);
    const [error, setError] = useState<boolean>(false);
    const [helperText, setHelperText] = useState<string>('');
    const optionsEntries = Object.entries(props.question.options ?? {});

    const generateMarks = () => {
        const marks = [];
        for (let i = 1; i <= 10; i++) {
            marks.push({ value: i, label: `${i}` });
        }
        return marks;
    }

    const stringToNumber = (val: string) => {
        let valueAsNumber = parseInt(val, 10);
        if (isNaN(valueAsNumber)) {
            valueAsNumber = 5;
        }
        return valueAsNumber;
    }

    useEffect(() => {
        setValue(defaultValueString);
    }, [defaultValueString]);

    useEffect(() => {
        if (props.didClickBack) {
            setError(false);
            setHelperText('');
        }
    }, [props.didClickBack])

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setanswerAndResponseState(prevState => ({
            ...prevState,
            answers: {
                ...prevState.answers,
                [props.question.key]: event.target.value
            }
        }));
        setValue(event.target.value);
        setError(false);
        setHelperText('');
    }

    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setanswerAndResponseState(prevState => ({
            ...prevState,
            answers: {
                ...prevState.answers,
                [props.question.key]: newValue
            }
        }));
        setValue(`${newValue}`);
        setError(false);
        setHelperText('');
    };

    const validateForm = () => {
        if (!value) {
            setError(true);
            setHelperText('Bitte wähle eine Option aus.');
            return false;
        } else {
            setValue('');
            setError(false);
            setHelperText('');
            return true;
        }
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const isValid = validateForm();
        props.handleSubmit(event, isValid);
    }

    return (
        <Box
            display='flex'
            flexDirection='column'
            gap={2}
        >
            <form
                onSubmit={handleSubmit}
            >
                <FormControl error={error}>
                    <FormLabel
                        id="question-label"
                    >
                        {props.question.question}
                    </FormLabel>
                    {
                        props.question.section !== riskAssessmentData.questions[4].section ?
                            <>
                                <RadioGroup
                                    aria-labelledby="question-label"
                                    name="question"
                                    value={value}
                                    onChange={handleRadioChange}
                                >
                                    {optionsEntries.map(([key, optionValue]) => (
                                        <FormControlLabel
                                            key={key}
                                            value={key}
                                            control={<Radio />}
                                            label={optionValue}
                                        />
                                    ))}
                                </RadioGroup>
                                <FormHelperText>{helperText}</FormHelperText>
                            </>
                            :
                            <Box
                                sx={{
                                    pt: 10
                                }}
                            >
                                <Slider
                                    aria-label="Always visible"
                                    step={1}
                                    marks={generateMarks()}
                                    valueLabelDisplay="on"
                                    min={1}
                                    max={10}
                                    onChange={handleSliderChange}
                                    value={stringToNumber(value)}
                                />
                            </Box>
                    }
                </FormControl>
            </form>
        </Box>
    )
}

export default Question;
