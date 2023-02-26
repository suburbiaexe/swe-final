/**
 * Representation of a FITEM search result item
 */
import React from "react";
import {Button, Card, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";

import placeholderImage from '../placeholderImage.svg';
import {LOCATION_OPTIONS} from "../../config/LocationInfo";
import {ITEM_TYPES} from "../../config/ItemTypes";

interface Props {
    currentLocation: string;
    currentLocationDescription: string;
    foundLocation: string;
    foundLocationFloor: string;
    foundLocationRoom: string;
    itemDescription: string;
    itemType: string;
    timeFound: string;

}

function enumCurrLocationToString(currentLocation:string){
    switch(currentLocation){
        case 'left-in-place':
            return "left it in place";
        case 'dps':
            return "turned it into DPS";
        case 'moved':
            return "moved it to a nearby location";
        case 'turned-in':
            return "turned it in to a desk/university official";
        default:
            return "ERROR: Invalid currLocation";
    }
}

/**
 * Gets the user readable locaitontype based on the location enum
 * @param locationEnum
 */
function locationEnumToString(locationEnum:string){
    // label  enumString
    const locationObj = LOCATION_OPTIONS.find(location => location.enumString===locationEnum);
    return (locationObj ? locationObj.label : "ERROR: locationEnum " + locationEnum + " not recognized");
}

function itemEnumToString(itemEnum:string){
    // console.log("attempting to find match for itemEnum " + itemEnum)
    const itemObj = ITEM_TYPES.find(item => item.enumString===itemEnum);
    // console.log(itemObj)
    return (itemObj ? itemObj.label : "ERROR: itemEnum " + itemEnum + " not recognized");
}

export default function FitemResult({
                                        currentLocation,
                                        currentLocationDescription,
                                        foundLocation,
                                        foundLocationFloor,
                                        foundLocationRoom,
                                        itemDescription,
                                        itemType,
                                        timeFound
                                    }: Props) {
    return(
        <>
            {/*<Typography>this iss a search result</Typography>*/}
            <Card
                sx={{
                    maxWidth: 500 }}
                raised={true}
            >
                <CardHeader
                    title={<Typography variant={"h5"}>{itemEnumToString(itemType)}</Typography>}
                    subheader={"Found: " + timeFound}
                />
                <CardMedia
                    //TODO: When picture uploading is a thing, display the pic here
                    component={"img"}
                    height={194}
                    src={placeholderImage}
                    alt={"Blank placeholder image"}
                />

                <CardContent>
                    <Typography variant={"h5"} align={"left"} sx={{ml:.5, mb:1}}><b><u>Description </u></b></Typography>
                    <Typography paragraph fontSize={18}>{itemDescription}</Typography>

                    <Typography variant={"h5"} align={"left"} sx={{ml:.5, mb:1}}><b><u>Found@ </u></b></Typography>
                    <Typography fontSize={18}>{locationEnumToString(foundLocation)}</Typography>
                    {foundLocationFloor!=""
                        ? <Typography fontSize={18}>Floor: {foundLocationFloor}</Typography>
                        :undefined}
                    {foundLocationRoom!=""
                        ? <Typography fontSize={18}>Room: {foundLocationRoom}</Typography>
                        :undefined}

                    <Typography variant={"h5"} align={"left"} sx={{ml:.5, mt:1 ,mb:1}}><b><u>Currently@ </u></b></Typography>
                    <Typography fontSize={18}>The finder of the item</Typography>
                    <Typography fontSize={18}><u><b><i>{enumCurrLocationToString(currentLocation)}</i></b></u>.</Typography>
                    <br/>
                    {currentLocation == 'moved'
                        ?<>
                        <Typography fontSize={18}>Item was moved to: </Typography>
                        <Typography fontSize={18}><i>{currentLocationDescription}</i></Typography>
                        </>
                        : undefined
                    }
                    {currentLocation == 'turned-in'
                        ?<>
                        <Typography>Item was turned in to: </Typography>
                        <Typography fontSize={18}><i>{currentLocationDescription}</i></Typography>
                        </>

                        :undefined}


                    <br/>
                    <Button variant={"contained"} color={"success"}>This is my item</Button>
                </CardContent>
            </Card>
            {/*currentLocation: "left-in-place",*/}
            {/*currentLocationDescription: "",*/}
        </>
    );
}