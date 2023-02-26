// Marius video outdated, found this more updated formik documentation on the proper way to do things:
// https://firxworx.com/blog/coding/react/integrating-formik-with-react-material-ui-and-typescript/

// This is verbatim boiler-plate code provided by the update blog w/ respect to using
// MUI with formik, still a bit magical to me but then again formik isn't the most widely-used
// library and is a bit difficult to work with because of outdated/lack of variety docs/tutorials. Worth it though!
import React, {useState} from 'react'
import { FieldProps, getIn } from 'formik'
import {Alert, TextField, TextFieldProps} from "@mui/material";

type propType = {
    oldProps: React.FC<FieldProps & TextFieldProps>;
    displayExtra: boolean;
}

export const InputGenericTextField: React.FC<FieldProps & TextFieldProps> = props => {
    const isTouched = getIn(props.form.touched, props.field.name)
    const errorMessage = getIn(props.form.errors, props.field.name)

    const val = getIn(props.form.values, props.field.name)

    // const displayExtra = props.sharedState.displayExtra


    const { error, helperText, field, form, ...rest } = props


    return (
        <>
            <TextField
                error={error ?? Boolean(isTouched && errorMessage)}
                helperText={helperText ?? ((isTouched && errorMessage) ? errorMessage : undefined)}
                {...rest} // includes any Material-UI specific props
                {...field} // includes all props contributed by the Formik Field/FastField
                // field.onChange={console.log(field.value)}
            />
            {/*Val is {val}*/}
            <div></div>
            {val=="david" ? <Alert severity={"error"}>Alert appears on certain value</Alert> : ''}
            <div></div>
            {/*Display extra is : {String(displayExtra)}*/}
        </>


    )
}

// NOTE: Marius' video is outdated, below code is antiquated
// import React from 'react';
// import {TextField} from "@mui/material";
// import {FieldHookConfig, FieldInputProps, FormikProps, FormikValues, useField} from "formik";
//
// // interface Props extends FieldHookConfig<string> { //TODO: Complains when FieldConfig... why?? (yt:~18:09)
// //     label: string;
// // }
//
// // const GenericTextField = ({label, ...props}: Props) => {
// const GenericTextField = (props: FieldHookConfig<string>) => {
//     const [field, meta] = useField(props);
//     /*
//     formik.touched.<name> can't be done because we don't have access to formik object. we therefore
//     use "meta"
//      */
//
//     return (
//         <TextField
//             fullWidth
//             // label={label}
//             {...field}
//             {...props}
//             error={meta.touched && Boolean(meta.error)}
//             helperText={meta.touched && meta.error}
//             />
//     );
// };
//
// export default GenericTextField;