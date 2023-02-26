// Marius video outdated, found this more updated formik documentation on the proper way to do things:
// https://firxworx.com/blog/coding/react/integrating-formik-with-react-material-ui-and-typescript/

// This is verbatim boiler-plate code provided by the update blog w/ respect to using
// MUI with formik, still a bit magical to me but then again formik isn't the most widely-used
// library and is a bit difficult to work with because of outdated/lack of variety docs/tutorials. Worth it though!

import React, {useState} from 'react'
import { FieldProps, getIn } from 'formik'
import {Alert, Autocomplete, TextField, TextFieldProps} from "@mui/material";

type propType = {
    oldProps: React.FC<FieldProps & TextFieldProps>;
    displayExtra: boolean;
}


export const LocationAutocomplete_old: React.FC<FieldProps & TextFieldProps> = props => {
    const isTouched = getIn(props.form.touched, props.field.name)
    const errorMessage = getIn(props.form.errors, props.field.name)

    const val = getIn(props.form.values, props.field.name)

    // const displayExtra = props.sharedState.displayExtra


    const { error, helperText, field, form, ...rest } = props

    const tempOptions = ["TODO:Change!","one","two"]

    interface optionState {
        option: string | string[] | null;
    }
    const [selectedoption,setSelectedOption] = useState(null)


    const { name, onChange, value } = field;

    return (
        <>
            Val is: {val}
            <br />
            SelectedVal is: {selectedoption}
            <Autocomplete
                options={tempOptions}
                value = {value}
                onChange={(event, value) => {
                    console.log("something changed!")
                    console.log("direct change value: " + value)
                    field.value=value
                    setSelectedOption(value)
                    console.log("selectedoption now: " + selectedoption)
                }}
                // value={selectedoption}
                renderInput={params => (
                    <TextField
                        {...params}
                        error={error ?? Boolean((isTouched && errorMessage) || errorMessage)}
                        helperText={helperText ?? ((isTouched || errorMessage) ? errorMessage : undefined)}
                        {...rest} // includes any Material-UI specific props
                        {...field} // includes all props contributed by the Formik Field/FastField*/
                        value={selectedoption}
                    />
                )}
            />

            {/*<TextField*/}
            {/*    error={error ?? Boolean((isTouched && errorMessage) || errorMessage)}*/}
            {/*    helperText={helperText ?? ((isTouched || errorMessage) ? errorMessage : undefined)}*/}
            {/*    {...rest} // includes any Material-UI specific props*/}
            {/*    {...field} // includes all props contributed by the Formik Field/FastField*/}
            {/*/>*/}
            {/*/!*Val is {val}*!/*/}
        </>


    )
}


// import React, {useState} from 'react'
// import { FieldProps, getIn } from 'formik'
// import {Alert, TextField, TextFieldProps} from "@mui/material";
//
// type propType = {
//     oldProps: React.FC<FieldProps & TextFieldProps>;
//     displayExtra: boolean;
// }
//
//
// export const GenericTextField: React.FC<FieldProps & TextFieldProps> = props => {
//     const isTouched = getIn(props.form.touched, props.field.name)
//     const errorMessage = getIn(props.form.errors, props.field.name)
//
//     const val = getIn(props.form.values, props.field.name)
//
//     // const displayExtra = props.sharedState.displayExtra
//
//
//     const { error, helperText, field, form, ...rest } = props
//
//
//     return (
//         <>
//             <TextField
//                 error={error ?? Boolean(isTouched && errorMessage)}
//                 helperText={helperText ?? ((isTouched && errorMessage) ? errorMessage : undefined)}
//                 {...rest} // includes any Material-UI specific props
//                 {...field} // includes all props contributed by the Formik Field/FastField
//                 // field.onChange={console.log(field.value)}
//             />
//             {/*Val is {val}*/}
//             <div></div>
//             {val=="david" ? <Alert severity={"error"}>Alert appears on certain value</Alert> : ''}
//             {/*{val=="david" ? setShowLastNameField(true) : setShowLastNameField(false)}*/}
//             <div></div>
//
//             {/*onChange= setParentValue(val)*/}
//
//             {/*Display extra is : {String(displayExtra)}*/}
//         </>
//
//
//     )
// }


//
// // @ts-ignore
// export const GenericTextField = ({
//     field,
//     form,
//     ...props
// }:{field:FieldProps;form:{touched:any, errors:any}; props:any})=> (
//     <>
//         test123
//         {/*<TextField*/}
//
//         {/*    {...props}*/}
//         {/*    {...field}*/}
//         {/*    // field.onChange={console.log(field.value)}*/}
//         {/*/>*/}
//         {/*<input type="text" {...field} {...props} />*/}
//         {/*{touched[field.name] &&*/}
//         {/*    errors[field.name] && <div className="error">{errors[field.name]}</div>}*/}
//     </>
// );





// // TODO add a function as a parameter
// export const GenericTextField = (fieldProps: FieldProps, formData: any, ...props: any) => {
//
//     console.log("fieldProps: " + String(fieldProps))
//     console.log("formData: " + String(formData))
//     console.log("fp Form: " + fieldProps.form)
//
//     console.log("FIELD NAME IS: " + fieldProps.field.name)
//
//
//     const isTouched = getIn(fieldProps.form.touched, fieldProps.field.name)
//     const errorMessage = getIn(fieldProps.form.errors, fieldProps.field.name)
//
//     const val = getIn(fieldProps.form.values, fieldProps.field.name)
//
//     return(
//         <>
//             <TextField
//                 error={errorMessage ?? Boolean(isTouched && errorMessage)} //errorMessage
//                 helperText={props.helperText ?? ((isTouched && errorMessage) ? errorMessage : undefined)}
//                 // onChange={fom}
//                 {...fieldProps}
//                 {...props}
//                 // field.onChange={console.log(field.value)}
//             />
//             Value is {val}
//         </>
//     )
// };



//
// TODO: David's attempt at fixing it:
// export const GenericTextField: React.FC<{fp: FieldProps, tfp:TextFieldProps, dependentChanger:Function}> = props => {
//     console.log("fp: " + props.fp)
//     console.log("tfp: " + props.tfp)
//     console.log("dependentChanger: " + props.dependentChanger)
//     const isTouched = getIn(props.fp.form.touched, props.fp.field.name)
//     const errorMessage = getIn(props.fp.form.errors, props.fp.field.name)
//
//     const val = getIn(props.fp.form.values, props.fp.field.name)
//
//     // const displayExtra = props.sharedState.displayExtra
//
//
//     // const { error, helperText, field, form, ...rest } = props
//
//
//     return (
//         <>
//             <TextField
//                 error={props.tfp.error ?? Boolean(isTouched && errorMessage)}
//                 helperText={props.tfp.helperText ?? ((isTouched && errorMessage) ? errorMessage : undefined)}
//                 {...props.tfp} // includes any Material-UI specific props
//                 {...props.fp} // includes all props contributed by the Formik Field/FastField
//                 // field.onChange={console.log(field.value)}
//             />
//             {/*Val is {val}*/}
//             <div></div>
//             {val=="david" ? <Alert severity={"error"}>Alert appears on certainN value</Alert> : ''}
//             <div></div>
//             {/*Display extra is : {String(displayExtra)}*/}
//         </>
//
//
//     )
// }

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