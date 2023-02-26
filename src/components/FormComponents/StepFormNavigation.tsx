import React from 'react';
import {Button} from "@mui/material";
import {FormikValues} from "formik";

interface Props {
    hasPrevious: boolean;
    onBackClick: (values: FormikValues) => void;
    onLastStep: boolean;
}

const StepFormNavigation = (props: Props) => {
    return (
        //TODO: Add styling
        <>
            {/*Back button*/}
            {props.hasPrevious &&
                <Button onClick={props.onBackClick}>Back</Button>
            }

            {/*Submit button*/}
            <Button type={"submit"} variant={"contained"} sx={{m:1}}>{props.onLastStep ? 'Submit' : 'Next'}</Button>
        </>
    )
}

export default StepFormNavigation