import React, {useEffect, useState} from 'react';
import {
    Alert, AlertTitle,
    Box,
    Container, Grid,
    Theme,
    Typography
} from "@mui/material";
import {Field, useField, useFormik, useFormikContext} from "formik"; // Form
import * as yup from "yup";
import MultiStepForm, {CoupledFormStep} from "../components/FormComponents/MultiStepForm";
import {FormStep} from "../components/FormComponents/MultiStepForm";
import {GenericTextField} from "../components/FormComponents/Formik_X_MUI_Fields/GenericTextField";

import {CurrentLocationRadio} from "../components/FormComponents/Formik_X_MUI_Fields/FoundItemFields/CurrentLocationRadio";
import {CategoryAutocomplete} from "../components/FormComponents/Formik_X_MUI_Fields/CategoryAutocomplete";
import {SecurityQuestionRadio} from "../components/FormComponents/Formik_X_MUI_Fields/FoundItemFields/SecurityQuestionRadio";
import {LocationAutocomplete} from "../components/FormComponents/Formik_X_MUI_Fields/LocationAutocomplete";
import {ItemDescriptionTextField} from "../components/FormComponents/Formik_X_MUI_Fields/ItemDescriptionTextField";

import {LOCATION_OPTIONS} from "../config/LocationInfo";
import {CATEGORY_NAMES, ITEM_TYPES} from "../config/ItemTypes";

import { useNavigate } from "react-router-dom";

const initialValues = {
    // Location Step
    lostLocation: null, // Where do you remember having item last

    // Item categorization
    itemType: null, // Sub-Category of an item (also selected from enumerated values)
    // TODO: In future iterations, add more granularity by asking for more sub-categories

    // Item description step
    itemDescription: '', // Describe item as you were describing it to a friend (be generally descriptive
}

const validationSchemaLocation = yup.object({
    // lostLocation: yup.object()
    //     .typeError('You must indicate the last place you remember having the item')
    //     .required('You must indicate the last place you remember having the item'),
})

const validationSchemaCategorization = yup.object({
    itemType: yup.object()
        .required('You must categorize the item')
        .typeError('You must categorize the item'),
})

const validationSchemaDescription = yup.object({
    itemDescription: yup.string()
        .required('You must describe the item')
        .min(40, 'Must be at least 40 characters long, but we recommend at least 100!')
})



export default function () {
    const navigate = useNavigate();

    // If the server says the user has an active Litem already, redirect them to the results page
    async function redirectIfExistingItem() {
        const messageBody = {
            userID: localStorage.getItem('loggedIn')
        }

        let userHasLitem: Boolean = false;

        console.log("da userID is: " + messageBody.userID)

        const requestOptions: RequestInit = {
            method: 'POST',
            // headers: {}
            body: JSON.stringify(messageBody)
            // body: fullValues
        };
        console.log("Sending this as body: " + JSON.stringify(localStorage.getItem('loggedIn')))
        await fetch('http://localhost:3001/userLitems', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("data is: " + Boolean(data))
                // alert("server, does userHasLitem?: " + JSON.stringify(data))
                // console.log("data to set to: " + data)
                // console.log("data to set to v2: " + Boolean(JSON.stringify(data)))
                userHasLitem = Boolean(data)
            })

        console.log("userHasLitem: " + userHasLitem)
        if (userHasLitem) {
            console.log("User already has a litem! Redirecting to results page")
            navigate("/lost_item/results");
        }
    }


    // const [noExistingUserLitem, setNoExistingUserLitem] = useState(true);
    //
    // // TODO: hookup to server
    useEffect(() => {
        redirectIfExistingItem()
    }, []);


    return (
        <>
            <Typography variant={"h2"} sx={{ m: 2, mb:4 }}><b>Report an Item You Lost</b></Typography>

            <Typography variant={"h4"} sx={{mb:2}}>Lost an item? Came to the right place!</Typography>

            <Typography variant={"h6"} sx={{mb:2}}>After filling out this form, we will search our database and show you
            items people have found that are similar to your item.</Typography>

            <Container maxWidth={"xs"}>
            <Alert severity={"info"}>
                <AlertTitle><b>LOST ITEM SUBMISSION LIMIT</b></AlertTitle>
                You are limited to one lost item submission every 24 hours</Alert>
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
                            // Because foundLocation/itemType are yucky objects we just want to send the server the ENUM
                            // type they will use
                            {fullValues.lostLocation
                                ? fullValues.lostLocation = fullValues.lostLocation.enumString
                                : fullValues.lostLocation = ''}
                            fullValues.itemType = fullValues.itemType.enumString

                            // Add additional necessary metadata
                            // userID from log-in cookie
                            fullValues.userID = localStorage.getItem('loggedIn');
                            // Timestamp
                            fullValues.timeFound = new Date().toLocaleDateString()

                            // Submit with metadata
                            // TODO: Send to server instead of alert
                            // alert(JSON.stringify(fullValues,null,2))

                            const requestOptions: RequestInit = {
                                method: 'POST',
                                // headers: {}
                                body: JSON.stringify(fullValues)
                                // body: fullValues
                            };
                            fetch('http://localhost:3001/addLitem', requestOptions)
                                .then(response => response.json())
                                .then(data => console.log("submitted litem: " + JSON.stringify(data)))

                            navigate("/lost_item/results");
                        }
                        }
                        thankYouMessage={"You have successfully reported a lost item. " +
                            "You will be redirected to a page where you can check to see if anyone " +
                            "has reported an item matching the description you provided. If you " +
                            "are not redirected in the next five seconds, click the button below to reload the page..."}
                        resetButtonText={"Reload Page"}
                        showResetButton={true}
                    >


                        {/*Item Location*/}
                        <FormStep stepName={"Item Location"} validationSchema={validationSchemaLocation} onSubmit={() => console.log("Location step submitted!")}>
                            <Typography variant={"h6"} sx={{mb:1}}><b><u>Last place you remember having the item:</u></b></Typography>
                            <Typography>This information helps us identify items that are more likely yours based on the location they were found.
                                If you aren't sure, you can skip this step.</Typography>
                            <Field
                                name={"lostLocation"}
                                component={LocationAutocomplete} sx={{p:-2, mb:1, mt:1}}
                                options={LOCATION_OPTIONS}
                                textFieldProps={{ label:"Lost Location", placeholder:"(Type to search)",
                                    fullWidth: true, margin: 'normal', variant: 'outlined' }}/>
                            <br/>
                            {/*<Box sx={{p: 1, border: 1, borderRadius: '0%', borderColor: (theme: Theme) => theme.palette.primary.main,}}>*/}
                            {/*/!*<Typography variant={"caption"}><i>*!/*/}
                            {/*/!*    This information helps us identify items that are more likely yours based on the location they were found.*!/*/}
                            {/*/!*    If you aren't sure, you can skip this step.</i></Typography>*!/*/}
                            {/*</Box>*/}

                        </FormStep>


                        {/*Item Category*/}
                        <FormStep stepName={"Item Category"} validationSchema={validationSchemaCategorization} onSubmit={() => console.log("Category step submitted!")}>
                            <Typography variant={"h6"} sx={{mb:1}}><b><u>Categorize the item:</u></b></Typography>
                            {/*TODO: When categorization becomes more granular (future sprint),
                            TODO: warn about being as specific as possible but not too specific*/}
                            <Field
                                name={"itemType"}
                                component={CategoryAutocomplete} sx={{p:-2, mb:1, mt:1}}
                                options={ITEM_TYPES}
                                textFieldProps={{ label:"Item Category*", placeholder:"(Type to search)",
                                    fullWidth: true, margin: 'normal', variant: 'outlined' }}
                            ></Field>
                        </FormStep>


                        {/*Item Description*/}
                        <FormStep stepName={"Item Description"} validationSchema={validationSchemaDescription} onSubmit={() => console.log("Description step submitted!")}>
                            <Typography variant={"h6"} sx={{mb:1}}><b><u>Describe the item:</u></b></Typography>
                            <Typography>The more details, the better! The more information you provide, the more likely our system
                            is to correctly suggest found items.</Typography>
                            <br/>
                            <Typography variant={"caption"}><i>
                                Suggested details include: Color, Brand, Labels/Tags, Serial Number, Wear and Tear, Writing, Markings, Stickers, Decorative Adornments.
                            </i></Typography>
                            <br/>
                            <br/>
                            <Field name={"itemDescription"}
                                   label={"Describe the item"}
                                   placeholder={"Red Hydro Flask water bottle, large dent toward the top, covered with colorful stickers"}
                                   component={ItemDescriptionTextField}
                                   sx={{minWidth: 450, mb:1, mt:1}} />
                        </FormStep>

                    </MultiStepForm>
                </Box>
            </Container>
        </>
    );
}