import Typography from '@mui/material/Typography';


interface InfoProps {
    paragraphs: string[] | null,
    subheader: string
}

const Info = (props: InfoProps) => {

    return (
        <>
            <Typography
                variant='h2'
                color='text.primary'
                pb={4}
            >
                Ermittle jetzt deine Risikokennzahl
            </Typography>
            <Typography
            variant='h3'
            color='text.primary'
            pb={2}
            >
                {props.subheader}
            </Typography>
            {
                props.paragraphs ? props.paragraphs.map((paragraph, index) => (
                    <Typography
                    key={`${paragraph}-${index}`}
                    variant='body1'
                    pb={1}
                >
                    { paragraph }
                </Typography>
                )) : null
            }
        </>
    )
}

export default Info;