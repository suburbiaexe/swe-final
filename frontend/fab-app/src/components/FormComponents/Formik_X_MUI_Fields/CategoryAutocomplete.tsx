// Credit to https://github.com/mui/material-ui/issues/18331#issuecomment-569981389 for procedure
// and MUIautocomplete x formik x formik-material-ui implementation
import React from 'react';

import { fieldToTextField } from 'formik-material-ui'; // see https://codesandbox.io/s/915qlr56rp for other f-mui examples
import {Autocomplete, TextField} from "@mui/material";
import {getIn} from "formik";

// @ts-ignore
export const CategoryAutocomplete = ({ textFieldProps, ...props }) => {

    const { form: { setTouched, setFieldValue, getFieldValue } } = props;
    // @ts-ignore
    const { error, helperText, ...field } = fieldToTextField(props);
    const { name } = field;

    // const val = getIn(props.form.values, props.field.name)

    // console.log("props being passed in: " + JSON.stringify(props, null, 2))
    return (
        <>
            <Autocomplete
                {...props}
                {...field}
                onChange={
                    (e: any, value: any) => {
                        setFieldValue(name, value)
                        console.log("value of cat autocomplete: " + value)
                    }
                }

                // @ts-ignore
                onBlur={ () => setTouched({ [name]: true }) }

                getOptionLabel={(option: {label:string,enumString:string,category:string}) => option.label || '' }
                // isOptionEqualToValue={(option: {label:string, enumString:string}, value: string) => {
                //     option.label==value
                // }}
                isOptionEqualToValue={(option, value) => option.label==value.label}

                groupBy={(option)=> option.category}

                // @ts-ignore
                renderInput={ (props: JSX.IntrinsicAttributes) => (
                    <TextField {...props} {...textFieldProps} helperText={helperText} error={error} />
                )}
            />

        </>

    );
}










// type propType = {
//     oldProps: React.FC<FieldProps & TextFieldProps>;
//     displayExtra: boolean;
// }
//
//
// export const LocationAutocomplete: React.FC<FieldProps & TextFieldProps> = props => {
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
//     const tempOptions = ["TODO:Change!","one","two"]
//
//     interface optionState {
//         option: string | string[] | null;
//     }
//     const [selectedoption,setSelectedOption] = useState(null)
//
//
//     const { name, onChange, value } = field;
//
//     return (
//         <>
//             Val is: {val}
//             <br />
//             SelectedVal is: {selectedoption}
//             <Autocomplete
//                 options={tempOptions}
//                 value = {value}
//                 onChange={(event, value) => {
//                     console.log("something changed!")
//                     console.log("direct change value: " + value)
//                     field.value=value
//                     setSelectedOption(value)
//                     console.log("selectedoption now: " + selectedoption)
//                 }}
//                 // value={selectedoption}
//                 renderInput={params => (
//                     <TextField
//                         {...params}
//                         error={error ?? Boolean((isTouched && errorMessage) || errorMessage)}
//                         helperText={helperText ?? ((isTouched || errorMessage) ? errorMessage : undefined)}
//                         {...rest} // includes any Material-UI specific props
//                         {...field} // includes all props contributed by the Formik Field/FastField*/
//                         value={selectedoption}
//                     />
//                 )}
//             />
//
//             {/*<TextField*/}
//             {/*    error={error ?? Boolean((isTouched && errorMessage) || errorMessage)}*/}
//             {/*    helperText={helperText ?? ((isTouched || errorMessage) ? errorMessage : undefined)}*/}
//             {/*    {...rest} // includes any Material-UI specific props*/}
//             {/*    {...field} // includes all props contributed by the Formik Field/FastField*/}
//             {/*/>*/}
//             {/*/!*Val is {val}*!/*/}
//         </>
//
//
//     )
// }
