import React, {useState} from 'react';
import {Formik, Field, FormikConfig, FormikValues, FormikHelpers, Form, useFormikContext, useField} from "formik";
import {GenericTextField} from "./Formik_X_MUI_Fields/GenericTextField";
import StepFormNavigation from "./StepFormNavigation";
import {Button, Container, Paper, Step, StepContent, StepLabel, Stepper, Typography} from "@mui/material";

interface Props extends FormikConfig<FormikValues>{
    children: React.ReactNode;
    isVertical: boolean;
    thankYouMessage: string; //What does the form say when you submit?
    showResetButton?: boolean; // Should there be a reset button?
    resetButtonText: string; // What does the reset button say?
}

/**
 *
 * @param children The custom FormStep components that represent a step in our form
 * @param initialValues The overall initial values for all data in the form
 * @param onSubmit The onSubmit to execute once *all* steps have been completed
 * @param isVertical Should the stepper form be displayed in a vertical orientation
 * @constructor
 */
const MultiStepForm = ({children, initialValues, onSubmit, isVertical, thankYouMessage, showResetButton, resetButtonText}: Props) => {

    // As the user navigates around the pages of the form,
    // we want to save a snapshot of the values the user has entered
    const [snapshot, setSnapshot] = useState(initialValues)
    const realOriginalValues = initialValues // Doesn't change with state so we can reset the form later

    // Stepper state
    const [activeStep, setActiveStep] = useState(0);

    // Individual Form Steps
    const steps = React.Children.toArray(children) as React.ReactElement[];
    const totalSteps = steps.length;
    const onLastStep = activeStep === steps.length-1;
    const currFormStep = steps[activeStep]
    const [currFormValues, setFormValues] = useState(initialValues)

    // Stepper controls
    const nextStep = (currFormValues: FormikValues) => {
        setActiveStep(activeStep+1)
        if(activeStep<totalSteps){
            setSnapshot(currFormValues)
        }

    };
    const prevStep = (currFormValues: FormikValues) => {
        setActiveStep(activeStep-1)
        setSnapshot(currFormValues)
    };

    const handleReset = (values:FormikValues) => {
        // setActiveStep(0);
        window.location.reload();
    };




    // "Next" button is a submit button, as is the final form submit. Handle behavior in both cases
    const handleGenericSubmit = (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
        // If the current form step has their own submit procedure defined, execute that
        // Does NOT override, executes *in addition to*
        if (currFormStep.props.onSubmit){
            currFormStep.props.onSubmit(values)
        }

        // If we are on the last page of the form, submit all of the values
        if(onLastStep){
            nextStep(values)
            let valsToSubmit = values
            // alert("og vals are " + JSON.stringify(realOriginalValues, null, 2))
            //TODO: I cant get resetForm to work for the life of me... just reloading the page on reset i give up
            // actions.resetForm({values:realOriginalValues})
            // actions.resetForm()
            // alert("values NOW " + JSON.stringify(values, null, 5))
            onSubmit(valsToSubmit, actions)
            // actions.resetForm({values:realOriginalValues})
            // cons
        } else {
            // If we don't setsubmitting = false, after pressing "next" some form inputs might grey-out automatically
            actions.setSubmitting(false) // We aren't "submitting" till the v last step.
            // If we navigate next off of the page, we reset the touched values so that error
            // prompts don't persist (until user touches fields again)
            actions.setTouched({})
            nextStep(values)
        }
    }

    console.log("Active form step: " + activeStep)
    console.log("total steps is : " + totalSteps)
    // console.log("Current form step is: " + (currFormStep !== undefined))
    // console.log("Current form step is: " + currFormStep)

    return (
        <>
            {activeStep<totalSteps ?
            <Formik
                initialValues={snapshot}
                onSubmit={handleGenericSubmit}
                validationSchema={currFormStep.props.validationSchema}>
                {/*^ We only want to validate the values for the form step we are currently looking at*/}

                {(formik) =>
                    <Form
                        onSubmit={formik.handleSubmit}
                        // onReset={formik} //TODO: ADD A RESET
                        // onChange={() => {formik.values.firstName=="michael" ? formik.values.lastName="fryd":console.log("not yet michael")}}
                        // onInput={() => {formik.values.firstName=="michael" ? formik.values.lastName="fryd":console.log("not yet michael")}}
                        >
                        <Stepper
                            activeStep={activeStep}
                            orientation={isVertical ? "vertical" : undefined}>
                            {steps.map(currFormStep => {
                                const label = currFormStep.props.stepName;
                                return (
                                    <Step key={label}>
                                        <StepLabel><Typography>{label}</Typography></StepLabel>
                                        <StepContent>
                                            {/*Only render the active step we are on*/}
                                            {currFormStep}
                                            {/*Next/Back buttons*/}
                                            <div></div>
                                            <StepFormNavigation
                                                onBackClick={() => prevStep(formik.values)}
                                                hasPrevious={activeStep>0}
                                                onLastStep={onLastStep} />
                                        </StepContent>
                                    </Step>
                                )
                            })}

                        </Stepper>
                    </Form>}
            </Formik>
                :
                <>
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>{thankYouMessage}</Typography>
                    {/*TODO: Add arbitrary wait/counter, so you can't spam*/}
                    <Button type={"reset"} onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        {resetButtonText}
                    </Button>
                </Paper>
                </>
            }
        </>
    )
}

export default MultiStepForm

export const FormStep = ({ stepName = '', children}: any) => children;

// For inputs in the same step that rely on each other to appear
export const CoupledFormStep = ({sharedStateChanger={}, stepName = '', children}: any) => children;
