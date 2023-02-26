import React, {useState} from 'react'
import {Field, FieldProps, getIn} from 'formik'
import {
    Alert, AlertTitle, Box,
    Container,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    TextFieldProps, Theme,
    Typography
} from "@mui/material";
import {
    exportedSetOptionLocation,
    exportedSetRequiresSecuritySection,
} from "../../../../pages/FoundItemPage";


export const CurrentLocationRadio: React.FC<FieldProps & TextFieldProps> = props => {
    const isTouched = getIn(props.form.touched, props.field.name)
    const errorMessage = getIn(props.form.errors, props.field.name)

    const val = getIn(props.form.values, props.field.name)



    const { error, helperText, field, form, ...rest } = props

    const isError = Boolean((isTouched && errorMessage));


    return (
        <>
            <RadioGroup {...field}>
                <Container maxWidth={"xs"}>
                    <Container maxWidth={"xs"}>
                        <Container maxWidth={"xs"}>
                            <Box sx={{
                                p: 1,
                                border: 1,
                                borderRadius: '3%',
                                borderColor: isError
                                    ?(theme: Theme) => theme.palette.error.main
                                    : (theme: Theme) => theme.palette.grey["400"],}}>
                                <div style={{textAlign:"left"}}>
                                    <FormControlLabel control={<Radio />} label={"Turned in to DPS"} value={"dps"} />
                                    <br />
                                    <FormControlLabel control={<Radio />} label={"Turned in to Desk/University Official"} value={"turned-in"} />
                                    <br />
                                    <FormControlLabel control={<Radio />} label={"Left in place"} value={"left-in-place"} />
                                    <br />
                                    <FormControlLabel control={<Radio />} label={"Moved to nearby location"} value={"moved"} />
                                </div>
                            </Box>
                        </Container>
                    </Container>
                </Container>
                {isError ? <Typography fontSize={12} color={(theme: Theme) => theme.palette.error.main} sx={{mt:1}}>{errorMessage}</Typography>:undefined}

            </RadioGroup>
            {/*Val is: {val}*/}
            {/*{val=="dps" ? <Alert severity={"warning"}>test dps</Alert>:undefined}*/}

            {exportedSetRequiresSecuritySection(val == "turned-in" || val=="dps")}


            {/*Discouraging people from leaving/moving expensive items*/}
            {val=="left-in-place" ?
                <>
                    <Box sx={{m:2}}></Box>
                    <Alert severity={"warning"}>
                        <AlertTitle><Grid container justifyContent="left"><b>DOUBLE CHECK:</b></Grid>
                        </AlertTitle>
                        <Typography>
                            Do <b><u>not</u></b> report expensive items that have been left in place. Only report expensive items
                            if they have been turned into DPS or a desk.
                        </Typography>
                         </Alert>
                </>
                : null}
            {exportedSetOptionLocation(val)}
            {val=="moved" ?
                <>
                    <Box sx={{m:2}}></Box>
                    <Alert severity={"warning"}>
                        <AlertTitle><Grid container justifyContent="left"><b>DOUBLE CHECK:</b></Grid>
                        </AlertTitle>
                        <Typography>
                            Do <b><u>not</u></b> move expensive items and report them. Only report expensive items
                            if they have been turned into DPS or a desk.
                        </Typography>
                    </Alert>
                </>
                : null}
            {exportedSetOptionLocation(val)}


            {/*<Typography color={"error"} fontSize={12}>You must indicate what you did with the item</Typography>*/}


            {/*<TextField*/}
            {/*    error={error ?? Boolean((isTouched && errorMessage) || errorMessage)}*/}
            {/*    helperText={helperText ?? ((isTouched || errorMessage) ? errorMessage : undefined)}*/}
            {/*    {...rest} // includes any Material-UI specific props*/}
            {/*    {...field} // includes all props contributed by the Formik Field/FastField*/}
            {/*    // field.onChange={console.log(field.value)}*/}
            {/*/>*/}
            {/*/!*Val is {val}*!/*/}
            {/*<div></div>*/}
            {/*{val=="michael" ? <Alert severity={"error"}>Alert appears on certain value</Alert> : ''}*/}
            {/*{val=="alison" ? setLastNameFieldVisible(true) : setLastNameFieldVisible(false)}*/}
            {/*/!*{val=="david" ? setShowLastNameField(true) : setShowLastNameField(false)}*!/*/}
            {/*<div></div>*/}

            {/*/!*onChange= setParentValue(val)*!/*/}

            {/*/!*Display extra is : {String(displayExtra)}*!/*/}
        </>


    )
}