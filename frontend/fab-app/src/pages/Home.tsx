import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Button, Typography, Box} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FAQ from "../components/FAQ";
import Typewriter from "typewriter-effect";
import "../styling/home.css";

import icon from "../components/lostandfound_Asset.svg";

export default function () {
    return (
        <>
            <div className={'intro'}>
                <p id={'hello'}>Hello, this is <strong>Found@Brown</strong>.</p>
                <p id={'tag'}>We're here to help you find your <Typewriter
                    onInit={(writer) => {
                        writer.typeString("notebook")
                            .pauseFor(500)
                            .deleteChars(8)
                            .pauseFor(300)
                            .typeString("laptop")
                            .pauseFor(500)
                            .deleteChars(6)
                            .pauseFor(300)
                            .typeString("jacket")
                            .pauseFor(500)
                            .deleteChars(6)
                            .pauseFor(300)
                            .typeString("<strong><em>lost items</em></strong>.")
                            .start();
                    }}
                /></p>
            </div>

            <div className={"home-page-icon"}>
                <img src={icon} height={400}/>
            </div>

            <div className={"faq"}>
                <FAQ />
            </div>
        </>
    );
}


