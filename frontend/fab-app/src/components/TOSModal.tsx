import React from "react";
import {Box, Link, Modal, Typography} from "@mui/material";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};




const TOSModal = () =>
{

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    return(
        <>
        <Typography>By submitting this form you agree to our<> </>
            <Link
                onClick={() => {
                    handleOpen()
                    console.log("modal should open!")
                }}
            ><i>terms of service</i></Link></Typography>


        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"

        >
            <Box sx={{ ...style, width: 1000 }}>
                <Typography variant={"h2"} id="parent-modal-title">Terms of Service</Typography>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dui turpis, feugiat ac tempus quis, mattis sed ipsum. Phasellus laoreet orci sit amet mollis posuere. Vestibulum at egestas dui, et ornare ligula. Etiam ornare, felis in gravida molestie, enim ligula lacinia felis, id egestas dui mi a augue. Nullam semper, magna et pulvinar consectetur, arcu sapien eleifend lectus, vitae volutpat metus leo et sapien. Sed ligula ipsum, semper in metus eget, ultrices finibus nisi. Donec posuere laoreet mi ac tincidunt. Cras posuere viverra elit id commodo. Aliquam mattis tempus fringilla. Fusce porta fringilla quam non cursus. Sed pellentesque rhoncus condimentum.
                </Typography>
                <br/>
                <Typography>
                    Cras felis massa, scelerisque non orci sed, ullamcorper fringilla mauris. Curabitur tempor, massa lobortis ornare fringilla, tellus magna sagittis quam, id sollicitudin dui eros ut dolor. Sed egestas rhoncus nunc fermentum facilisis. Fusce erat diam, placerat ut rutrum in, aliquam a est. Proin in ex vitae ligula consectetur dignissim at vel erat. Duis aliquam turpis at sapien finibus iaculis. Phasellus nunc nunc, ultricies et bibendum sodales, mollis ut lectus. Nunc posuere blandit quam. Sed nec velit vulputate, pharetra urna tristique, porttitor dolor. Quisque tempus magna id sodales placerat. Proin maximus lorem sodales, vulputate diam dictum, bibendum mi. Donec a felis non ex pharetra sodales ut ut dolor. Suspendisse eu blandit velit.
                </Typography>
                <br/>
                <Typography>
                    Curabitur ut tempus nibh. Pellentesque vel suscipit elit, eget pretium augue. Etiam sed sodales mauris, in congue urna. Aliquam ut efficitur sem. Etiam quis elementum magna. Etiam nec hendrerit quam. Integer sed ornare nibh, id blandit justo. Donec eget sapien ac ante accumsan interdum id et dui. Maecenas vel nulla vel purus semper pretium.
                </Typography>
                <br/>
                <Typography>
                    Maecenas lacus nunc, scelerisque eu dictum nec, elementum vestibulum sapien. Phasellus ultricies nec eros at vulputate. Donec tincidunt dolor ac mi egestas, ac porttitor mauris aliquam. Integer pellentesque malesuada turpis sed congue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed consectetur massa in sodales aliquam. Mauris semper augue eu fringilla pretium. Ut nisi sem, lacinia ac turpis faucibus, convallis sollicitudin sem. Donec ut erat tortor. Donec sollicitudin elit vitae odio malesuada, eu consequat sem tempor.

                    Phasellus commodo mollis nibh non sagittis. Integer blandit tempus nisi ac ullamcorper. Etiam et sollicitudin lacus. Ut ac nisl ultrices, porttitor justo ac, vulputate lacus. Quisque sit amet massa dapibus, dictum odio vitae, bibendum lorem. Nam a nunc eu lacus rutrum feugiat imperdiet quis lacus. Etiam vestibulum efficitur enim, a ullamcorper nibh commodo vel. Duis ullamcorper ipsum turpis, sit amet bibendum orci pulvinar et. Donec scelerisque orci ut nibh rhoncus, gravida vestibulum tellus blandit.
                </Typography>
            </Box>
        </Modal>
    </>
        )
}

export default TOSModal;