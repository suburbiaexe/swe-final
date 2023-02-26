import {Button, CircularProgress, Container, Grid, LinearProgress, Typography} from "@mui/material";
import FAQ from "../components/FAQ";
import React, {useEffect, useState} from "react";
import FitemResult from "../components/ResultComponents/FitemResult";
import {LOCATION_OPTIONS} from "../config/LocationInfo";
import {ITEM_TYPES} from "../config/ItemTypes";

import { useNavigate } from "react-router-dom";


// const testServerResponse = [
//     {
//         currentLocation: "left-in-place",
//         currentLocationDescription: "",
//         foundLocation: "SCIENCESLIBRARY",
//         foundLocationFloor: "9th",
//         foundLocationRoom: "Presidential Suite",
//         itemDescription: "Red Hydro Flask Water Bottle with hello kitty stickers",
//         itemType: "WATERBOTTLE",
//         timeFound: "5/9/2022, 1:28:07 AM",
//     },
//     {
//         currentLocation: "turned-in",
//         currentLocationDescription: "First floor front desk",
//         foundLocation: "ROCKEFELLERJOHNDJRLIBRARY",
//         foundLocationFloor: "1st",
//         foundLocationRoom: "",
//         itemDescription: "Yellow skinny 16oz water bottle with yarn around the cap",
//         itemType: "WATERBOTTLE",
//         timeFound: "5/9/2022, 2:34:17 AM",
//     },
//     {
//         currentLocation: "moved",
//         currentLocationDescription: "Table closest to the exit",
//         foundLocation: "SHARPEREFECTORY",
//         foundLocationFloor: "",
//         foundLocationRoom: "",
//         itemDescription: "Green bottle with a Mexican Flag on the side",
//         itemType: "WATERBOTTLE",
//         timeFound: "5/9/2022, 2:41:57 AM",
//     },
//     {
//         currentLocation: "dps",
//         currentLocationDescription: "",
//         foundLocation: "MAINGREEN",
//         foundLocationFloor: "",
//         foundLocationRoom: "",
//         itemDescription: "Purple hydroflask bottle with rainbow and glitter stickers",
//         itemType: "WATERBOTTLE",
//         timeFound: "5/9/2022, 2:30:44 AM",
//     },
//     {
//         currentLocation: "left-in-place",
//         currentLocationDescription: "",
//         foundLocation: "WAYLANDHOUSEWRISTONQUAD",
//         foundLocationFloor: "2nd",
//         foundLocationRoom: "Hallway 202",
//         itemDescription: "White thermoflask with dents all over it",
//         itemType: "WATERBOTTLE",
//         timeFound: "5/9/2022, 1:39:47 AM",
//     },
//     {
//         currentLocation: "left-in-place",
//         currentLocationDescription: "",
//         foundLocation: "METCALFRESEARCHBUILDING",
//         foundLocationFloor: "",
//         foundLocationRoom: "AUD",
//         itemDescription: "Pink and silver thermos with flame stickers on the side",
//         itemType: "WATERBOTTLE",
//         timeFound: "5/9/2022, 1:49:44 AM",
//     },
// ]



type FitemResult = {
    currentLocation: string;
    currentLocationDescription: string;
    foundLocation: string;
    foundLocationFloor: string;
    foundLocationRoom: string;
    itemDescription: string;
    itemType: string;
    timeFound: string;
}

async function deleteLitemListing(){

    const messageBody = {
        userID: localStorage.getItem('loggedIn')
    }

    const requestOptions: RequestInit = {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(messageBody)
        // body: fullValues
    };
    // console.log("Sending this as body: " + JSON.stringify(localStorage.getItem('loggedIn')))
    await fetch('http://localhost:3001/deleteLitem', requestOptions)
        // .then(response => response.json())
        // .then(data => {
        //     // alert(JSON.stringify(data))
        //     // alert("server, does userHasLitem?: " + JSON.stringify(data))
        //     // console.log("data to set to: " + data)
        //     // console.log("data to set to v2: " + Boolean(JSON.stringify(data)))
        // })
}

export default function () {

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [fitemsFromServer, setFitemsFromServer] = useState([FitemResult])

    // We make it wait artificially for a little bit of time because its fun to watch the spinny thing work
    const[arbitraryLoadTime, setArbitraryLoadTime] = useState(true)

    async function handleDeleteLitem(){
        await deleteLitemListing()
        window.location.reload();
    }


    async function redirectIfExistingItem() {
        const messageBody = {
            userID: localStorage.getItem('loggedIn')
        }

        let userHasLitem: Boolean = false;

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
                // alert("server, does userHasLitem?: " + JSON.stringify(data))
                // console.log("data to set to: " + data)
                // console.log("data to set to v2: " + Boolean(JSON.stringify(data)))
                userHasLitem = Boolean(data)
            })

        console.log("userHasLitem: " + userHasLitem)
        if (!userHasLitem) {
            console.log("User does not have a litem! Redirecting to lost form page")
            navigate("/lost_item/");
        }
        // setLoading(false);
    }

    // Get the matching fitems given the userID (match the exisitng litem on backend)
    async function getLitemFitems() {
        const messageBody = {
            userID: localStorage.getItem('loggedIn')
        }

        // let userHasLitem: Boolean = false;

        const requestOptions: RequestInit = {
            method: 'POST',
            // headers: {}
            body: JSON.stringify(messageBody)
            // body: fullValues
        };
        console.log("Sending this as body: " + JSON.stringify(localStorage.getItem('loggedIn')))
        await fetch('http://localhost:3001/litemResults', requestOptions)
            .then(response => response.json())
            .then(data => {
                // alert("We got this in response: " + JSON.stringify(data))
                console.log("We got this in response: " + JSON.stringify(data))
                setFitemsFromServer(data)
                console.log("set items to: " + data)
                // alert("server, does userHasLitem?: " + JSON.stringify(data))
                // console.log("data to set to: " + data)
                // console.log("data to set to v2: " + Boolean(JSON.stringify(data)))
                // userHasLitem = Boolean(data)
            })

        setLoading(false);
    }

    useEffect(() => {
        redirectIfExistingItem()
        getLitemFitems()
    }, []);

    // //TODO REMOVE: (demo purposes only)
    useEffect(() => {
        const timer = setTimeout(() => {
            setArbitraryLoadTime(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    //TODO: hookup to server
    // useEffect(() => {
    //     const fakeServerResponse = false;
    //     if (!fakeServerResponse) {
    //         navigate("/lost_item");
    //     }
    // }, []);


    //TODO: foundLocation and category need to be mapped back
    // using their associated itemType/LocationInfo

    return (
        <>
            {loading || arbitraryLoadTime
                ?
                <>
                    <Grid container
                          spacing={0}
                          direction="column"
                          alignItems="center"
                          justifyContent="center"
                          style={{ minHeight: '100vh' }}>
                        <Grid item xs={12}>
                            {/*<Container>*/}
                                <Typography sx={{mb:2}}>
                                    <i>Loading results...</i>
                                </Typography>
                                <CircularProgress />
                            {/*</Container>*/}
                        </Grid>
                    </Grid>

                </>

            :
                <div style={{minHeight: "77.5vh"}}>
                    <br/>
                    {/*TODO: map based on server results*/}
                    <Typography variant={"h5"} sx={{mb:3}}>
                        <b>
                        Showing search results for your active lost-item listing:</b></Typography>
                    <Typography sx={{mt:1, mb:5}}><i>When you claim an item or remove your lost-item listing, you will not be able
                        to post another lost item listing for 24 hours.</i></Typography>


                    <Container>
                    <Grid
                        container
                        rowSpacing={3}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                    {fitemsFromServer.map(result => {
                        console.log("Examining result " + JSON.stringify(result, null, 2))
                        console.log(typeof result)
                        return(
                                <>
                                    <Grid item xs={4}>
                                    <FitemResult
                                    //@ts-ignore
                                    currentLocation={result.currentLocation}
                                    //@ts-ignore
                                    currentLocationDescription={result.currentLocationDescription}
                                    //@ts-ignore
                                    foundLocation={result.foundLocation}
                                    //@ts-ignore
                                    foundLocationFloor={result.foundLocationFloor}
                                    //@ts-ignore
                                    foundLocationRoom={result.foundLocationRoom}
                                    //@ts-ignore
                                    itemDescription={result.itemDescription}
                                    //@ts-ignore
                                    itemType={result.itemType}
                                    //@ts-ignore
                                    timeFound={result.timeFound}
                                    />
                                    </Grid>
                                </>
                        )
                    })}
                    </Grid>
                    </Container>
                    {fitemsFromServer.length<=0
                        ? <>
                        <Typography variant={"h5"} sx={{m:5}}><b>No items have been found that match the description of your item.
                            Check back later!</b></Typography>
                        </>
                    : undefined}

                    <Typography sx={{mt:7, mb:2}}><i>When you claim an item or remove your lost-item listing, you will not be able
                        to post another lost item listing for 24 hours.</i></Typography>
                    <Button color={"secondary"} variant={"contained"} sx={{mb:5}}
                            onClick={() => handleDeleteLitem()}
                    >Remove My Lost Item Listing</Button>
                </div>
            }

        </>
    );
}