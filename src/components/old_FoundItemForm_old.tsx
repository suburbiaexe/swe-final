import {
    Alert,
    Box,
    Button,
    Container, Paper,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    TextField,
    Theme,
    Typography
} from "@mui/material";
import * as yup from 'yup';
import {useFormik} from "formik";
import React from "react"; // Form

export default function(){
    //////////////////////////////
    //     FORMIK VARIABLES     //
    /////////////////////////////
    /**
     * Defines the properties we are validating about each of the values of the form
     */
    const valSchema = yup.object({
        foundLocation: yup
            .string()
            .required(`You must select where the item was found`),
        foundLocationRoomNumber: yup
            .string(),
    })

    /**
     * Values that fields should have by default
     */
    const initValues = {
    //    example:
    //    email: 'foobar@example.com',
    //    password: `foobar`,
        foundLocation: null, // Where the item was found
    }

    // Formik data that helps us manage the form state
    const formik = useFormik({
        initialValues: initValues,
        validationSchema: valSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2))
        }
    })

    /////////////////////////////
    //     FORM COMPONENTS     //
    ////////////////////////////

    // Enter (enumerated) categories for items
    function SelectItemCategories() {
        return(
            <>
                <Alert severity={"info"}>Be as specific as possible, but do <b>NOT</b> guess!</Alert>
                <Button>Button on first step</Button>
                <Button>Also one too!</Button>
                <div></div>
                <Button>One on next line too!</Button>

            </>
        )
    }

    // Enter qualitative description of the item
    function EnterItemDescription() {
        return (
            <>
                <Typography variant={"h6"}><b>Describe the item</b></Typography>
                <Typography>Describe the item as if you were describing it to a friend, or the person who lost the item.
                    Include any unique features making it easily identifiable</Typography>
                <TextField fullWidth/>
            </>
        )

    }

    ///////////////////////////////
    //     STEPPER VARIABLES     //
    //////////////////////////////
    /**
     * Tracks the current step of the stepper form
     */
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {setActiveStep((prevActiveStep) => prevActiveStep + 1);};
    const handleBack = () => {setActiveStep((prevActiveStep) => prevActiveStep - 1);};
    const handleReset = () => {setActiveStep(0);/*TODO: Reset formik values here*/};

    // Taken from https://mui.com/material-ui/react-stepper/
    /**
     * Define the steps the stepper should generate
     */
    const steps = [
        {
            label: 'Location',
            description: '',
            // componentSetup: <InputItemLocation />,
            componentSetup: <></>,
        },
        {
            label: 'Category',
            description: ` `,
            componentSetup: <SelectItemCategories />,
        },
        {
            label: 'Description',
            description:
                '',
            componentSetup: <EnterItemDescription />,
        },
    ];

    return(
        <>
            <form onSubmit={formik.handleSubmit}>

                <Typography variant={"h6"}><b>Where did you find the item?</b></Typography>

                <Container maxWidth="sm">
                    <Box sx={{
                        p: 1,
                        border: 1,
                        borderRadius: '3%',
                        borderColor: (theme: Theme) => theme.palette.primary.main,}}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => (
                                <Step key={step.label}>
                                    <StepLabel> <b>{step.label}</b> </StepLabel>
                                    <StepContent>
                                        {/*Description of the step*/}
                                        <Typography>{step.description}</Typography>

                                        {/*Spacing*/}
                                        <Box sx={{ padding: 2 }} />

                                        {/*Components necessary to make the step functional*/}
                                        {step.componentSetup}
                                        {/*NOTE: Was originally a <component /> but now called as function to prevent component re-render and weird
                                value and re-focus issues after a single character is changed, and other values dissapearing when another field is affecting
                                See https://stackoverflow.com/a/65328486*/}

                                        {/*Spacing*/}
                                        <Box sx={{ padding: 2 }} />

                                        {/*TODO: Depending on current index, criteria for being able to continue differs*/}
                                        {/*Next and Back buttons to navigate between steps*/}
                                        <Box sx={{ mb: 2 }}>
                                            <div>
                                                <Typography color={"lightgreen"}>TODO: <i>Depending on current index, criteria for being able to continue differs</i></Typography>
                                                <Button
                                                    variant="contained"
                                                    onClick={handleNext}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                                </Button>
                                                <Button
                                                    disabled={index === 0}
                                                    onClick={handleBack}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    Back
                                                </Button>
                                            </div>
                                        </Box>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} sx={{ p: 3 }}>
                                <Typography>Your found item has been reocrded! Thank you again!</Typography>
                                {/*TODO: Add arbitrary wait/counter, so you can't spam*/}
                                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                    Report another lost item
                                </Button>
                            </Paper>
                        )}
                    </Box>
                </Container>


                <TextField
                    fullWidth
                    id={"foundLocation"}
                    name={"foundLocation"}
                    value={formik.values.foundLocation}
                ></TextField>
            </form>
        </>
    )
}