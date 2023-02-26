import React, {useState} from 'react';
import {
    Alert,
    AlertTitle,
    Box,
    Container,
    Grid, Link,
    Theme,
    Typography
} from "@mui/material";
import {Field, useField, useFormik, useFormikContext} from "formik"; // Form
import * as yup from "yup";
import MultiStepForm, {CoupledFormStep} from "../components/FormComponents/MultiStepForm";
import {FormStep} from "../components/FormComponents/MultiStepForm";
import {GenericTextField} from "../components/FormComponents/Formik_X_MUI_Fields/GenericTextField";

import {CurrentLocationRadio} from "../components/FormComponents/Formik_X_MUI_Fields/FoundItemFields/CurrentLocationRadio";
import {Found_CategoryAutocomplete} from "../components/FormComponents/Formik_X_MUI_Fields/FoundItemFields/Found_CategoryAutocomplete";
import {SecurityQuestionRadio} from "../components/FormComponents/Formik_X_MUI_Fields/FoundItemFields/SecurityQuestionRadio";
import {LocationAutocomplete} from "../components/FormComponents/Formik_X_MUI_Fields/LocationAutocomplete";
import {ItemDescriptionTextField} from "../components/FormComponents/Formik_X_MUI_Fields/ItemDescriptionTextField";

import {LOCATION_OPTIONS} from "../config/LocationInfo";
import {CATEGORY_NAMES, ITEM_TYPES} from "../config/ItemTypes";
import TOSModal from "../components/TOSModal";

/*
 * Fields that affect each other somehow in the form need to have access to controlling variables/states
 * in the same class where the <Field>s are defined. (Allows us to electively show/change certain fields)
 *
 * We have to export the functions here because of weird scoping issues w/ the Fields not being in the scope
 * of the form variable at compile time. It is difficult to check a specific value of an input field,
 * using the onChange of the form lags behind by a single input cycle (try console.logging to see what I mean),
 * and because of the way the stepper stuff works we can't neatly access the Form (ergo form values) that fields are within.
 *
 * Ideally, I would have liked to pass the functions through the <Field ...> components directly, but after 4-5 hours
 * struggling to get that to work I decided to go with exports instead
*/

// ANY FIELDS THAT AFFECT EACH OTHER
// (VISIBILITY, DISABLED, ETC... NEED A SET FXN TO ACCES FROM WITHIN THE FIELDS)
export var exportedSetOptionLocation: Function;
export var exportedSetItemType: Function;
export var exportedSetRequiresSecuritySection: Function;


export default function () {
    //
    const [optionLocation, setOptionLocation] = useState('')
    exportedSetOptionLocation = setOptionLocation;
    //
    const [itemType, setItemType] = useState<{label:string, category:string, enumString:string}>()
    exportedSetItemType = setItemType;

    // If it was turned in to a desk or DPS, show the extra sections/information on each step re: security
    const [requiresSecuritySection, setRequiresSecuritySection] = useState(false)
    exportedSetRequiresSecuritySection = setRequiresSecuritySection;

    // Form values that we will be altering and submitting
    const initialValues = {
        // Location Step
        foundLocation: null, // Where an item was found
        foundLocationRoom: '', // What room an item was found in (if applicable)
        foundLocationFloor: '', // What room an item was found in (if applicable)
        currentLocation: '', // What did you do with the item?
        currentLocationDescription: '', // If u moved/turned-in, provide additional details

        // Item categorization
        itemType: null, // Sub-Category of an item (also selected from enumerated values)
        // TODO: In future iterations, add more granularity by asking for more sub-categories

        // Identifying features: (if it's an expensive item, b/c DPS/University official will use as identifying feature)
        securityQuestion: '', // A Q from the predetermined list of security questions
        securityQuestionResponse: '', // An answer provided by the user

        // Item description step
        itemDescription: '', // Describe item as you were describing it to a friend (be generally descriptive
    }

    const validationSchemaLocation = yup.object({
        foundLocation: yup.object()
            .typeError('You must indicate where you found the item')
            .required('You must indicate where you found the item'),
        foundLocationRoom: yup.string(),
        foundLocationFloor: yup.string(),
    })

    const validationSchemaCurrentLocation = yup.object({
        currentLocation: yup.string().required('You must indicate what you did with the item'),
        currentLocationDescription:
        // Location description only required if it was moved or turned-in
            ((optionLocation=="moved" || optionLocation=="turned-in")
                    ? (optionLocation=="moved"
                        ? yup.string()
                            .required('You must indicate where you moved the item')
                            // .min(10, 'Description must be at least 10 characters long')
                        : yup.string()
                            .required('You must indicate where you turned in the item'))
                        // .min(10, 'Description must be at least 10 characters long')
                    : yup.string()
            ),
    })

    const validationSchemaCategorization = yup.object({
        itemType: yup.object()
            .required('You must categorize the item')
            .typeError('You must categorize the item'),
    })

    const validationSchemaSecurity = yup.object({
        securityQuestion: yup.string().required('You must choose a security question'),
        securityQuestionResponse: yup.string()
            .required('You must provide an answer to the question')
    })

    const validationSchemaDescription = yup.object({
        itemDescription: yup.string()
            .required('You must describe the item')
            // .min(20, 'Description must be at least a few words (at least 20 characters long)')
    })


    // TOS Modal handling
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };




    return (
        <>
            {/*Upper page tite/information*/}
            <Typography variant={"h2"} sx={{ m: 2 }}><b>Report an Item You Found</b></Typography>
            <Box sx={{ padding: 1 }} />
            <Typography variant={"h4"}>Less than <b><u>60 seconds</u></b> of your time can save someone else hours of searching!</Typography>
            {/*<Typography variant={"h5"}>Thank you for taking the time to report finding a lost item. </Typography>*/}
            {/*<Box sx={{ padding: 1 }} />*/}
            {/*<Typography><i>We, and the people who lose items on campus, are grateful to people like you who help them find items they have lost.</i></Typography>*/}

            {/*Spacing*/}
            <Box sx={{ padding: 2 }} />

            {/*Instructions*/}
            <Container maxWidth={"md"}>
                {/*<Typography variant={"h5"}>This step-by-step form takes <b><u> less than 60 seconds</u></b> to fill out.</Typography>*/}
                <Typography variant={"h6"}>Thank you again for your contribution!</Typography>
                <Box sx={{ padding: 2 }} />
                <Alert severity={"info"}>
                    <AlertTitle><b>IMPORTANT NOTE ABOUT <u>EXPENSIVE</u> ITEMS</b></AlertTitle>
                    <Typography>Expensive items (laptops, tablets, etc...) should be <u>turned into a desk or DPS</u> and reported here.
                        Expensive items that are not turned in should <b>not be reported on this site at all</b>.</Typography>
                    <br />
                    <Typography>This helps prevent people from using the site
                        maliciously, and increases the likelihood that expensive items are turned into a university official if they are found by students.</Typography>
                </Alert>
            </Container>

            {/*Spacing*/}
            <Box sx={{ padding: 2 }} />

            {/*Actual form to submit found item*/}
            <Container maxWidth="sm" sx={{ mb: 3 }}>
            <Box sx={{
                p: 1,
                border: 1,
                borderRadius: '3%',
                borderColor: (theme: Theme) => theme.palette.primary.main,}}>
            <MultiStepForm
                initialValues={initialValues}
                isVertical={true}
                onSubmit={(values) => {
                    let fullValues = values;
                    // Because itemType/foundLocation are yucky objects we just want to send the server the ENUM
                    // type they will use
                    fullValues.itemType = fullValues.itemType.enumString
                    fullValues.foundLocation = fullValues.foundLocation.enumString

                    // Add additional necessary metadata
                    // userID from cookie
                    fullValues.userID = localStorage.getItem('loggedIn');
                    // Timestamp
                    fullValues.timeFound = new Date().toLocaleDateString()

                    // Submit with metadata
                    // TODO: Send to server instead of alert
                    console.log(fullValues)
                    // alert(JSON.stringify(fullValues,null,2))

                    const requestOptions: RequestInit = {
                        method: 'POST',
                        // headers: {}
                        body: JSON.stringify(fullValues)
                        // body: fullValues
                    };
                    fetch('http://localhost:3001/addFitem', requestOptions)
                        .then(response => response.json())
                        // .then(data => {
                        //     // alert(JSON.stringify(data))
                        //     })
                }

                }
                thankYouMessage={"Your found item has been recorded! Thank you again!"}
                resetButtonText={"Report another lost item"}
            >


                {/*Item Location*/}
                <FormStep stepName={"Item Location"} validationSchema={validationSchemaLocation} onSubmit={() => console.log("Location step submitted!")}>
                    <Typography variant={"h6"} sx={{mb:1}}><b><u>Where did you find the item?</u></b></Typography>
                    <Field
                        name={"foundLocation"}
                        component={LocationAutocomplete} sx={{p:-2, mb:1, mt:1}}
                        options={LOCATION_OPTIONS}
                        textFieldProps={{ label:"Found Location*", placeholder:"(Type to search)",
                            fullWidth: true, margin: 'normal', variant: 'outlined' }}/>
                    <Field name={"foundLocationFloor"} label={"(Optional) Floor"} component={GenericTextField} sx={{p:-2, mb:1, mt:1}}
                           placeholder={"First, 3rd, 2, Basement ..."}/>
                    <Field name={"foundLocationRoom"} label={"(Optional) Room"} component={GenericTextField} sx={{p:-2, mb:1, mt:1}}
                           placeholder={"202, AUD, 225R, ..."}/>
                </FormStep>

                {/*Current Item location*/}
                <FormStep stepName={"Current Item Location"} validationSchema={validationSchemaCurrentLocation} onSubmit={() => console.log("Current Location step submitted!")}>
                    <Typography variant={"h6"} sx={{mb:1}}><b><u>What did you do with the item?</u></b></Typography>
                    <Field name={"currentLocation"} component={CurrentLocationRadio}/>

                    {/*Additional field if they turned it in/moved item asking for clarification*/}
                    {optionLocation == "turned-in" || optionLocation == "moved"
                        ?   <>
                            <Box sx={{ padding: 1 }} /> {/*Spacing*/}
                            <Typography variant={"h6"} sx={{mb:1}}><b><u>
                                {optionLocation=="turned-in"
                                    ? 'Where did you turn in the item?'
                                    :'Where did you move the item?'}
                            </u></b></Typography>
                            {/*<Typography variant={"caption"}>NOTE: Your identity is not revealed to people searching for lost items. When describing the location, use global reference points (i.e. don't say "my" room).</Typography>*/}
                            <Field name={"currentLocationDescription"}
                                   label={optionLocation=="turned-in"
                                       ? "Where/Who was the item turned into"
                                       : "Where was the item moved"}
                                   placeholder={optionLocation=="turned-in"
                                       ? "First floor front desk"
                                       : "Table closest to the elevator"}
                                   component={GenericTextField}
                                   sx={{minWidth: 300, mb:1, mt:1}} />
                        </>
                        : undefined}
                </FormStep>


                {/*Item Category*/}
                <FormStep stepName={"Item Category"} validationSchema={validationSchemaCategorization} onSubmit={() => console.log("Category step submitted!")}>
                    <Typography variant={"h6"} sx={{mb:1}}><b><u>Categorize the item:</u></b></Typography>
                    {/*TODO: When categorization becomes more granular (future sprint),
                       TODO: warn about being as specific as possible but not too specific*/}
                    <Field
                        name={"itemType"}
                        component={Found_CategoryAutocomplete} sx={{p:-2, mb:1, mt:1}}
                        options={ITEM_TYPES}
                        textFieldProps={{ label:"Item Category*", placeholder:"(Type to search)",
                            fullWidth: true, margin: 'normal', variant: 'outlined' }}
                    ></Field>

                    {/*If left in place/moved and expensive category chosen, warn the user*/}
                    {(itemType && (itemType.category == CATEGORY_NAMES.DEVICE))
                    ? ((optionLocation == 'moved' || optionLocation == 'left-in-place')
                        ? <Alert severity={"error"}>
                                    Do <b><u>not</u></b> <i>move</i> or <i>report</i> expensive items that have been left in place.
                                    Only report expensive items if they have been turned into DPS or a desk. Proceed <b>only </b>
                                    if you believe this to be a "low-risk"/inexpensive item.
                            </Alert>
                        : undefined
                        )
                    : undefined}
                </FormStep>

                {/*Identification Security (ONLY APPEARS IF optionLocation is "turned-in" || "dps")*/}
                {requiresSecuritySection
                    ? <FormStep stepName={"Identification Security"} validationSchema={validationSchemaSecurity} onSubmit={() => console.log("Security step submitted!")}>
                        <Typography variant={"h6"} sx={{mb:1}}><b><u>Choose a security question:</u></b></Typography>
                        <Typography sx={{mb:1}}>Pick a question the owner should know the answer to:</Typography>
                        <Field name={"securityQuestion"} component={SecurityQuestionRadio}/>
                        <Box sx={{ padding: 2 }} />
                        <Typography fontSize={15}>Provide a response that the owner would be likely to give:</Typography>
                        <Field name={"securityQuestionResponse"}
                               label={"Question Response*"}
                               placeholder={"..."}
                               component={GenericTextField}
                               sx={{minWidth: 460, mb:1, mt:1}}>

                        </Field>

                        <Box sx={{ padding: 1 }} />

                        <Box sx={{p: 1, border: 1, borderRadius: '0%', borderColor: (theme: Theme) => theme.palette.primary.main,}}>
                        <Typography variant={"caption"}><i>Officials need information that only the owner would know in
                                order to properly identify the owner. This information is not shown
                                to people looking for lost items, making it distinct from the item description
                        you will provide in the next step.</i></Typography>
                        </Box>
                        <Box sx={{ padding: .5 }} />
                    </FormStep>
                    : undefined}

                {/*Item Description*/}
                <FormStep stepName={"Item Description"} validationSchema={validationSchemaDescription} onSubmit={() => console.log("Description step submitted!")}>
                    <Typography variant={"h6"} sx={{mb:1}}><b><u>Describe the item:</u></b></Typography>
                    <Typography variant={"caption"}><i>
                        Suggested details include: Color, Brand, Labels/Tags, Wear and Tear, Writing, Markings, Stickers, Decorative Adornments
                    </i></Typography>
                    {requiresSecuritySection
                        ? <Alert severity={"error"}>Do <b><u>not</u></b> include information you included in the previous security step.
                            <br/>
                            {/*<Typography variant={"caption"}>(E.g. if you chose the stickers question, mention the item had stickers but only describe the stickers for the security question)</Typography>*/}
                            </Alert>
                        : undefined
                    }
                    <Field name={"itemDescription"}
                           label={"Describe the item"}
                           placeholder={"Red Hydro Flask water bottle covered with cool stickers"}
                           component={ItemDescriptionTextField}
                           sx={{minWidth: 450, mb:1, mt:1}} />
                    <Box sx={{ padding: 2 }} />
                    <TOSModal />
                </FormStep>

            </MultiStepForm>
            </Box>
            </Container>
        </>
    );
}