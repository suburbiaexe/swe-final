import React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Container, Grid,
    List,
    ListItemText, Stack,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Filter1Icon from '@mui/icons-material/Filter1';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import "../styling/home.css";

export default function(){
    return(
        <>
            <Container>
                <p id={'faq-text'}>Frequently Asked Questions</p>

                {/*Spacing*/}
                <Box sx={{ padding: 1 }} />

                {/*Q: How do we prevent malicious use of the site?*/}
                <Accordion >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        // aria-controls="panel1a-content"
                        // id="panel1a-header"
                    >
                        <Typography variant={"h6"} sx={{ fontFamily: 'Source Sans Pro' }}>Q: How do we prevent malicious use of the site?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {/*TODO: ADD SECTION ON SECURITY QUESTIONS*/}
                        <Typography align={"left"}>
                            <i>How do we prevent people from using our site to "target" lost items?</i>
                        </Typography>

                        {/*Spacing*/}
                        <Box sx={{ padding: 1 }} />

                        <Typography align={"left"}>
                            This is an important question, and one we strove to address during development of the site.
                            Ultimately, we can't guarantee with 100% certainty that an individual won't use our site
                            with malicious intent, but we have taken steps to both mitigate these risks and combat abuse:
                       </Typography>

                        {/*Spacing*/}
                        <Box sx={{ padding: 2 }} />

                        {/*Stack containing ways we prevent malicious usage*/}
                        <Stack spacing={2}>

                        {/*Each item in the list is "bulleted using an icon and formatted using a stack (row)*/}
                            {/*Ensure accountability*/}
                            <Stack direction={"row"} alignItems={"left"} gap={2}>
                                <AccountBoxIcon color={"secondary"} sx={{fontSize:30}}/>
                                <Stack alignItems={"left"} spacing={1}>
                                    <Typography align={"left"} variant={"h5"} display={"inline"}>
                                        Ensure
                                        <Typography color={"secondary"} align={"left"} variant={"h5"} display={"inline"}>
                                            <b> accountability</b> </Typography>
                                        by associating requests with an account
                                    </Typography>
                                    <Typography align={"left"}>
                                        By ensuring a lack of anonymity, malicious actors are forced to use
                                        accounts with information that can be used to track them. This <b><i> decreases </i></b>
                                        the likelihood that someone will use the service for malicious purposes and
                                        <b><i> increases </i></b> our capacity to address the situation if it does happen.
                                    </Typography>

                                    <Typography align={"left"}>
                                        We currently enforce that the accounts are associated with an <i>@brown.edu</i> domain,
                                        which is how we ensure that the accounts are not "throw-away" accounts that
                                        provide no actual accountability.
                                    </Typography>
                                </Stack>
                            </Stack>
                            {/*Only show relevant lost items*/}
                            <Stack direction={"row"} alignItems={"left"} gap={2}>
                                <DashboardCustomizeIcon color={"secondary"} sx={{fontSize:30}}/>
                                <Stack alignItems={"left"} spacing={1}>
                                    <Typography align={"left"} variant={"h5"} display={"inline"}>
                                        <Typography color={"secondary"} display={"inline"} variant={"h5"}>
                                            <b>Compartmentalized</b> </Typography>
                                        search results
                                    </Typography>
                                    <Typography align={"left"}>
                                        When a user creates a posting for a lost item, only results that directly
                                        relate to that item (based on the user's and finder's categorization of the item)
                                        are shown. The user must know the type of item they are looking for before
                                        seeing items that have been found matching that description.
                                    </Typography>
                                    <Typography align={"left"}>
                                        Without an active lost item listing,
                                        a user can't see any found items that have been reported.
                                    </Typography>
                                </Stack>
                            </Stack>
                            {/*Limit lost requests*/}
                            <Stack direction={"row"} alignItems={"left"} gap={2}>
                                <Filter1Icon color={"secondary"} sx={{fontSize:30}}/>
                                <Stack alignItems={"left"} spacing={1}>
                                    <Typography align={"left"} variant={"h5"} display={"inline"}>
                                        <Typography color={"secondary"} display={"inline"} variant={"h5"}>
                                            <b>Limit</b> </Typography>
                                        the number of lost item requests that can be made by a user
                                    </Typography>
                                    <Typography align={"left"}>
                                        In order to prevent a malicious user from creating many lost item requests
                                        as a manner of "searching" through found items,
                                        we impose a per-user limit on how many lost item posts can be made per day.
                                    </Typography>
                                    <Typography align={"left"}>
                                        While having little to no effect on people who legitimately use our software,
                                        this safeguard introduces a massive inconvenience for anyone attempting to use
                                        this malicious strategy. The maximum efficiency of this strategy
                                        is capped such that the damage done is mitigated while their
                                        behavior is tracked, investigated, and addressed.

                                    </Typography>
                                    <Typography align={"left"}>
                                        This is one of the ways that we limit the potential damage of malicious use
                                        before it is detected and addressed.
                                    </Typography>
                                </Stack>
                            </Stack>
                            {/*Track lost requests*/}
                            <Stack direction={"row"} alignItems={"left"} gap={2}>
                                <ContentPasteSearchIcon color={"secondary"} sx={{fontSize:30}}/>
                                <Stack alignItems={"left"} spacing={1}>
                                    <Typography align={"left"} variant={"h5"} display={"inline"}>
                                        <Typography color={"secondary"} display={"inline"} variant={"h5"}>
                                            <b>Track</b> </Typography>
                                        lost item requests made by users
                                    </Typography>
                                    <Typography align={"left"}>
                                        This information is used to track, detect, and report suspicious behavior.
                                    </Typography>
                                </Stack>
                            </Stack>
                            {/*Limit expensive items as DPS-turn-in only*/}
                            <Stack direction={"row"} alignItems={"left"} gap={2}>
                                <MonetizationOnIcon color={"secondary"} sx={{fontSize:30}}/>
                                <Stack alignItems={"left"} spacing={1}>
                                    <Typography align={"left"} variant={"h5"} display={"inline"}>
                                        <Typography color={"secondary"} align={"left"} variant={"h5"} display={"inline"}>
                                            <b> Restricted reporting </b> </Typography>
                                        of high-risk items
                                    </Typography>
                                    <Typography align={"left"}>

                                        Users can report finding high-risk/expensive items using our software, but
                                        only if they turned that item in to DPS or university official after finding it.
                                    </Typography>
                                    <Typography align={"left"}>
                                        High-risk items not in the custody of a university official are vulnerable
                                        to a lack of proper identification before they are claimed. A malicious user could
                                        make a fake lost-item listing for an expensive item in order to locate vulnerable
                                        expensive items around campus.
                                    </Typography>
                                    <Typography align={"left"}>
                                        We allow expensive items to be reported if they were turned into DPS because
                                        we entrust those systems to more reliably identify the true owner of the item.
                                        Even if the item is turned into DPS, it is an extremely helpful thing to post
                                        about it on the site, <i>especially</i> for expensive items. Doing so can provide
                                        the owner of the item with critical information about whether their item was
                                        turned in or potentially stolen.
                                    </Typography>
                                    <Typography align={"left"}>
                                        It is true that low-risk items are vulnerable in the same way, but combined with
                                        the other security measures we take, the return on investment for a malicious user
                                        is far less than just not using our software at all.
                                    </Typography>
                                </Stack>
                            </Stack>
                            {/*ooh secret scary internal stuff*/}
                            <Stack direction={"row"} alignItems={"left"} gap={2}>
                                <DeveloperBoardIcon color={"secondary"} sx={{fontSize:30}}/>
                                <Stack alignItems={"left"} spacing={1}>
                                    <Typography align={"left"} variant={"h5"} display={"inline"}>
                                        Additional
                                        <Typography color={"secondary"} align={"left"} variant={"h5"} display={"inline"}>
                                            <b> internal security </b> </Typography>
                                        measures
                                    </Typography>

                                    <Typography align={"left"}>
                                        In addition to the methods disclosed here, we employ other techniques which help us
                                        both mitigate risks and detect abuse of our software. These procedures remain
                                        undisclosed for security purposes.
                                    </Typography>
                                </Stack>
                            </Stack>
                            {/*DPS Integraiton*/}
                            <Stack direction={"row"} alignItems={"left"} gap={2}>
                                <LocalPoliceIcon color={"secondary"} sx={{fontSize:30}}/>
                                <Stack alignItems={"left"} spacing={1}>
                                    <Typography align={"left"} variant={"h5"} display={"inline"}>
                                        Integration with
                                        <Typography color={"secondary"} align={"left"} variant={"h5"} display={"inline"}>
                                            <b> Brown Department of Public Safety (DPS) </b> </Typography>
                                    </Typography>
                                    <Typography align={"left"}>
                                        We are able to provide records of suspicious activity to the Department of Public
                                        Safety and allow them to investigate and proceed with any situation where we have
                                        detected potential abuse of our software.
                                    </Typography>
                                </Stack>
                            </Stack>



                        </Stack>


                        {/*Spacing*/}
                        <Box sx={{ padding: 5 }} />

                        People will do malicious things regardless of whether this software exists or not. We asses the threats
                        that our software creates with existing threats of current popular methods
                        (such as posting about a lost item in a group chat). We have done our best to ensure that
                        the dangers we pose are no more considerable than existing popular solutions, while maximizing
                        the benefit we hope to bring to people who lose and find items.

                    </AccordionDetails>
                </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={"h6"} sx={{ fontFamily: 'Source Sans Pro' }}>Q: Why do I need to log in to report my item as lost?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography align={"left"}>
                                In an effort to deter people reporting lost items they don't actually own to steal those
                                items, we enforce that users log in with their Brown accounts, which
                                can be used to track them in cases of suspicious behavior.
                                You can read more in our FAQ on <Typography color={"secondary"} display={'inline'}><strong>preventing malicious use</strong></Typography>!
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={"h6"} sx={{ fontFamily: 'Source Sans Pro' }}>Q: Why can I only make a limited number of lost item reports?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography align={"left"}>
                                This makes it so that malicious users can't report a bunch of lost items in a row as a
                                way of "searching through" found items.
                                You can read more in our FAQ on <Typography color={"secondary"} display={'inline'}><strong>preventing malicious use</strong></Typography>!
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        // aria-controls="panel1a-content"
                        // id="panel1a-header"
                    >
                        <Typography variant={"h6"} sx={{ fontFamily: 'Source Sans Pro' }}>Q: Why should I report an item if I turned it into DPS?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography align={"left"}>
                            Even if the item is turned into DPS, it is <strong>extremely helpful</strong> to post about it on the site,
                            especially for expensive items. Doing so can provide the owner of the item with critical
                            information about whether their item was turned in or potentially stolen.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        // aria-controls="panel1a-content"
                        // id="panel1a-header"
                    >
                        <Typography variant={"h6"} sx={{ fontFamily: 'Source Sans Pro' }}>Q: Can RISD students use this?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography align={"left"}>
                            Currently, we enforce that users log-in with a <em>brown.edu</em> domain, which means that
                            only RISD students who also have <em>brown.edu</em> emails will be able to use the site.
                            However, we hope to integrate with RISD in the near future!
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        // aria-controls="panel1a-content"
                        // id="panel1a-header"
                    >
                        <Typography variant={"h6"} sx={{ fontFamily: 'Source Sans Pro' }}>Q: What happens after I claim a found item?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography align={"left"}>
                            Currently, nothing! This is one of our most important tasks in our theoretical next sprint!
                            For demoing purposes, we err on the side of keeping found items in our database
                            until we remove them manually.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

            </Container>
        </>
        );

}