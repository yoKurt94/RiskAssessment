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
import * as Types from '../../../common/types';
import { riskAssessmentData } from "../constants";

interface QuestionProps {
    didClickBack: boolean,
    questionNo: number,
}

const Question = (props: QuestionProps) => {
    const questionIndex = props.questionNo >= riskAssessmentData.questions.length
        ? riskAssessmentData.questions.length - 1
        : props.questionNo
    const question = riskAssessmentData.questions[questionIndex];
    const { answerAndResponseState, setanswerAndResponseState } = useContext(Types.UserAnswerContext);
    const defaultValue = answerAndResponseState.answers[question.key as keyof typeof answerAndResponseState.answers];
    const defaultValueString = typeof defaultValue === 'number' ? defaultValue.toString() : defaultValue;
    const [value, setValue] = useState<string>(defaultValueString);
    const [error, setError] = useState<boolean>(false);
    const [helperText, setHelperText] = useState<string>('');
    const optionsEntries = Object.entries(question.options ?? {});

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
                [question.key]: event.target.value
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
                [question.key]: newValue
            }
        }));
        setValue(`${newValue}`);
        setError(false);
        setHelperText('');
    };

    return (
        <Box
            display='flex'
            flexDirection='column'
            gap={2}
        >
            <form>
                <FormControl 
                error={error}
                sx={{
                    width: '100%'
                }}
                >
                    <FormLabel
                        id="question-label"
                    >
                        {question.question}
                    </FormLabel>
                    {
                        question.section !== riskAssessmentData.questions[4].section ?
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
                                    pt: 10,
                                    width: '100%'
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
                                    sx={{
                                        width: '100%'
                                    }}
                                />
                            </Box>
                    }
                </FormControl>
            </form>
        </Box>
    )
}

export default Question;
