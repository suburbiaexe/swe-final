import React from 'react';
import { Typography, Card, CardHeader, CardMedia, Grid, Container } from "@mui/material";
import placeholder from "../components/placeholderImage.svg";
import daniel from "../components/daniel.jpg";
import hannah from "../components/hannah.jpg";
import liz from "../components/me.jpg";
import alex from "../components/alex.jpg";
import david from "../components/david.jpg";
import "../styling/about.css";

export default function () {
    return (
        <>
            <div className={"head"}>
                <p>This website was created for CS32 by a group of 5 students that are currently clawing their way through finals.</p>
            </div>

            <div className={"team"}>
                <p>Meet the Team!</p>
            </div>

            <div className={"team-cards"}>
                <Container>
                    <Grid
                        container
                        rowSpacing={3}
                        columnSpacing={{ xs: 'auto', sm: 'auto', md: 'auto' }}>
                        <Card variant={'outlined'} sx={[{backgroundColor: "primary.main"},  {width: 2/9}, {margin: "auto"}]}>
                            <CardHeader title={"Hannah"} sx={{color: "white"}}/>
                            <CardMedia
                                component={'img'}
                                height={150}
                                src={hannah}
                                alt={"Image of Hannah Julius"}
                            />
                        </Card>
                        <Card variant={'outlined'} sx={[{backgroundColor: "primary.main"},  {width: 2/9}, {margin: "auto"}]}>
                            <CardHeader title={"Alex"} sx={{color: "white"}}/>
                            <CardMedia
                                component={'img'}
                                height={150}
                                src={alex}
                                alt={"Image of Alex Duchnowski"}
                            />
                        </Card>
                        <Card variant={'outlined'} sx={[{backgroundColor: "primary.main"},  {width: 2/9}, {margin: "auto"}]}>
                            <CardHeader title={"Daniel"} sx={{color: "white"}}/>
                            <CardMedia
                                component={'img'}
                                height={150}
                                src={daniel}
                                alt={"Image of Daniel Graves"}
                            />
                        </Card>
                        <Card variant={'outlined'} sx={[{backgroundColor: "primary.main"},  {width: 2/9}, {margin: "auto"}]}>
                            <CardHeader title={"David"} sx={{color: "white"}}/>
                            <CardMedia
                                component={'img'}
                                height={150}
                                src={david}
                                alt={"Image of David Fryd"}
                            />
                        </Card>
                        <Card variant={'outlined'} sx={[{backgroundColor: "primary.main"},  {width: 2/9}, {margin: "auto"}, {mt: 2}]}>
                            <CardHeader title={"⚡️ Elizabeth ⚡️"} sx={{color: "white"}}/>
                            <CardMedia
                                component={'img'}
                                height={150}
                                src={liz}
                                alt={"Image of Elizabeth Wu"}
                            />
                        </Card>
                    </Grid>
                </Container>
            </div>
        </>
    );
}