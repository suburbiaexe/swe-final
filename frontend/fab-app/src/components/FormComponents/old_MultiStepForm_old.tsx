/**
 * HUGE THANKS TO MARIUS ESPEJO, WHO WAS INSTRUMENTAL IN THE CREATION OF THIS FORM SYSTEM.
 * VERY EDUCATIONAL ABOUT FORMIK USED IN CONJUNCTION W/ FORMIK DOCUMENTATION, AND IN ADDITION TO
 * FORMIK BOILER-PLATE,
 * A LOT OF THE CODE HERE IS INSPIRED/ADAPTED FROM THIS VIDEO:
 * "Formik Multi-Step Form with Material UI | React JS Forms Tutorial"
 * https://www.youtube.com/watch?v=C3hGMDVo_ec
 */

import { Formik, Field } from 'formik';
import {Button, TextField} from "@mui/material";
import * as yup from 'yup';
import {GenericTextField} from "./Formik_X_MUI_Fields/GenericTextField";

export default function(){

    const valSchema = yup.object({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Not a valid email!').required('Email is required'),
        third: yup.number()
            .typeError('Must be a number!')
            .required('You gotta enter a number!').test(
            "maxDigitsAfterDecimal",
            "number field must have 2 digits after decimal or less",
            (number) => /^\d+(\.\d{1,2})?$/.test(String(number))
        )
    })

    return(
        <>
        <Formik
            initialValues={{
                name: '',
                email: '',
                third: '',

            }}
            onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2))
            }}
            validationSchema={valSchema}
        >
            {(formik) =>
            (<form onSubmit={formik.handleSubmit}>




                {/*Using Field differs from the approach originally used because the YT vid is outdated*/}
                {/*Reference here instead: https://firxworx.com/blog/coding/react/integrating-formik-with-react-material-ui-and-typescript/*/}
                <Field name={"name"} label={"Name"} component={GenericTextField}/>
                <Field name={"email"} label={"Email"} component={GenericTextField}/>
                <div></div>
                <Field name={"third"} label={"Third!"} component={GenericTextField}/> {/*https://formik.org/docs/api/field*/}


                {/*Deprecated w/ the custom GenericTextField form components*/}
                {/*<TextField*/}
                {/*    id={"name"}*/}
                {/*    name={"name"}*/}
                {/*    label={"Name"}*/}
                {/*    value={formik.values.name}*/}
                {/*    onChange={formik.handleChange}*/}
                {/*    error={formik.touched.name && Boolean(formik.errors.name)}*/}
                {/*    helperText={formik.touched.name && formik.errors.name}/>*/}

                <div></div>

                <Button
                    type={"submit"}
                    variant={"contained"}>
                    submit!</Button>


            </form>)}
        </Formik>
        </>
    )
}