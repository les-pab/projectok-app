import React, { useState, useEffect } from "react";
import {
    Grid,
    Avatar,
    Typography,
    InputLabel,
    FormHelperText,
    FormControl,
    Select,
    MenuItem,
    LinearProgress,
    CircularProgress,
    Divider,
    Tab,
    Tabs,
    TabPanel,
    Container,
    Fade,
    Card,
    CardContent,
    Backdrop,
    Modal,
    Box,
    IconButton,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
    PermPhoneMsg,
    Close,
    ArrowForwardRounded,
    ArrowBackIos,
    ArrowForwardIos,
    Launch,
} from "@material-ui/icons";
import { useHistory } from "react-router";
import Carousel from "react-material-ui-carousel";
import { CustomButton } from "../../../../material-ui/styles";
import DateFnsUtils from "@date-io/date-fns";
import { max, min, format } from "date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { connectWithCounselor } from "../../Service";

const Counselor = ({
    useStyles,
    _id,
    counselor,
    date,
    handleConnectingModalOpen,
}) => {
    const classes = useStyles();

    const handleOnConnect = async () => {
        handleConnectingModalOpen();

        const form = {
            counselor_id: counselor._id,
            student_id: _id,
            date: date,
            time: date,
        };

        const response = await connectWithCounselor(form);
        switch (response.status) {
            case 200:
                break;
            // case 401:
            //     setOnSubmit(false);
            //     setInputError(true);
            //     break;
            // case 422:
            //     setLoading(false);
            //     setFieldError(response.data.errors);
            //     break;
        }
    };

    return (
        <Grid
            container
            wrap="nowrap"
            direction="column"
            className={classes.counselor}
        >
            <Grid
                item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                wrap="nowrap"
            >
                <Grid item>
                    <Avatar
                        src={`../storage/${counselor.profile_picture}`}
                        className={classes.avatar}
                    />
                </Grid>
                <Grid item className={classes.grid_item}>
                    <Typography align="center" variant="h5">
                        {counselor.first_name} {counselor.middle_name}{" "}
                        {counselor.last_name}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography
                        align="center"
                        variant="h5"
                        color="primary"
                        className={classes.typography_green}
                    >
                        {counselor.designation}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item className={classes.grid_item}>
                <Divider />
            </Grid>
            <Grid
                item
                container
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                wrap="nowrap"
            >
                <Grid item className={classes.grid_item}>
                    <Typography variant="h5">PERSONAL INFORMATION</Typography>
                </Grid>
                <Grid
                    item
                    container
                    direction="row"
                    className={classes.grid_item}
                >
                    <Grid item xs={4}>
                        <Typography variant="h6" color="primary">
                            HEI:
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="h6">
                            {counselor.hei}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction="row"
                    className={classes.grid_item}
                >
                    <Grid item xs={4}>
                        <Typography variant="h6" color="primary">
                            Address:
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="h6">
                            {counselor.address === ""
                                ? "None"
                                : counselor.address}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item className={classes.grid_item}>
                    <CustomButton
                        background="primary"
                        fullWidth
                        onClick={handleOnConnect}
                    >
                        Connect
                    </CustomButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

const CounselorModal = ({
    useStyles,
    counselorModal,
    handleCounselorModalClose,
    _id,
    counselors,
    date,
}) => {
    const classes = useStyles();

    const [error, setOnError] = useState(false);
    const [link, setLink] = useState("");

    const [connectingModal, setConnectingModal] = useState(false);
    const handleConnectingModalOpen = () => {
        setConnectingModal(true);
    };
    const handleConnectingModalClose = () => {
        setConnectingModal(false);
    };

    const [acceptedModal, setAcceptedModal] = useState(false);
    const handleAcceptedModalOpen = () => {
        setAcceptedModal(true);
    };
    const handleAcceptedModalClose = () => {
        setAcceptedModal(false);
    };

    const [canceledModal, setCanceledModal] = useState(false);
    const handleCanceledModalOpen = () => {
        setCanceledModal(true);
    };
    const handleCanceledModalClose = () => {
        setCanceledModal(false);
    };

    const availableCounselors = counselors.map((counselor, index) => (
        <Counselor
            key={index}
            useStyles={useStyles}
            _id={_id}
            counselor={counselor}
            date={date}
            handleConnectingModalOpen={handleConnectingModalOpen}
        />
    ));

    useEffect(() => {
        Echo.channel(`student.appointment.${_id}`).listen(
            "StudentImmediateCounselingEvent",
            (e) => {
                const parsedAppointment = JSON.parse(e.appointment);
                switch (parsedAppointment.status) {
                    case "canceled":
                        handleConnectingModalClose();
                        handleCanceledModalOpen();
                        break;
                    case "accepted":
                        setLink(parsedAppointment.link);
                        handleConnectingModalClose();
                        handleAcceptedModalOpen();
                        break;
                }
            }
        );
    }, []);

    return (
        <>
            <Modal
                open={counselorModal}
                onClose={handleCounselorModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                className={classes.modal}
            >
                <Container maxWidth="md">
                    <Fade in={counselorModal}>
                        <Card>
                            <CardContent>
                                <Grid
                                    container
                                    direction="column"
                                    wrap="nowrap"
                                >
                                    <Grid
                                        item
                                        container
                                        direction="row"
                                        justifyContent="flex-end"
                                        alignItems="center"
                                    >
                                        <Grid item>
                                            <IconButton
                                                onClick={
                                                    handleCounselorModalClose
                                                }
                                            >
                                                <Close />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    {counselors.length <= 0 ? (
                                        <Grid
                                            item
                                            className={classes.grid_item}
                                        >
                                            <Typography
                                                align="center"
                                                variant="h4"
                                            >
                                                Sorry but there are no available
                                                counselors at the moment.
                                            </Typography>
                                        </Grid>
                                    ) : (
                                        <Carousel
                                            autoPlay={false}
                                            NextIcon={<ArrowForwardIos />}
                                            PrevIcon={<ArrowBackIos />}
                                            timeout={300}
                                            navButtonsAlwaysVisible
                                        >
                                            {availableCounselors}
                                        </Carousel>
                                    )}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Fade>
                </Container>
            </Modal>

            <ConnectingModal
                useStyles={useStyles}
                connectingModal={connectingModal}
                handleConnectingModalClose={handleConnectingModalClose}
            />

            <CanceledModal
                useStyles={useStyles}
                canceledModal={canceledModal}
                handleCanceledModalClose={handleCanceledModalClose}
            />

            <AcceptedModal
                useStyles={useStyles}
                acceptedModal={acceptedModal}
                handleAcceptedModalClose={handleAcceptedModalClose}
                handleCounselorModalClose={handleCounselorModalClose}
                link={link}
            />
        </>
    );
};

const ConnectingModal = ({
    useStyles,
    connectingModal,
    handleConnectingModalClose,
}) => {
    const classes = useStyles();

    return (
        <Modal
            open={connectingModal}
            // onClose={handleConnectingModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Container maxWidth="sm">
                <Fade in={connectingModal}>
                    <Card>
                        <CardContent>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item className={classes.grid_item}>
                                    <CircularProgress color="primary" />
                                </Grid>
                                <Grid item className={classes.grid_item}>
                                    <Typography align="center" variant="h4">
                                        Connecting with counselor, please wait.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Fade>
            </Container>
        </Modal>
    );
};

const CanceledModal = ({
    useStyles,
    canceledModal,
    handleCanceledModalClose,
}) => {
    const classes = useStyles();

    return (
        <Modal
            open={canceledModal}
            onClose={handleCanceledModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Container maxWidth="sm">
                <Fade in={canceledModal}>
                    <Card>
                        <CardContent>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item className={classes.grid_item}>
                                    <Typography align="center" variant="h4">
                                        Counselor is currently unavailable at
                                        the moment, you can connect with other
                                        counselors or you can set a scheduled
                                        appointment on the Appointments page.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Fade>
            </Container>
        </Modal>
    );
};

const AcceptedModal = ({
    useStyles,
    acceptedModal,
    handleAcceptedModalClose,
    handleCounselorModalClose,
    link,
}) => {
    const classes = useStyles();

    return (
        <Modal
            open={acceptedModal}
            // onClose={handleCanceledModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Container maxWidth="sm">
                <Fade in={acceptedModal}>
                    <Card>
                        <CardContent>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item className={classes.grid_item}>
                                    <Typography align="center" variant="h4">
                                        Counselor accepted your request, you
                                        access the meeting link by clicking the
                                        button below:
                                    </Typography>
                                </Grid>
                                <Grid item className={classes.grid_item}>
                                    <CustomButton
                                        href={link}
                                        fullWidth
                                        target="_blank"
                                        background="primary"
                                        endIcon={<Launch />}
                                        onClick={() => {
                                            handleAcceptedModalClose();
                                            handleCounselorModalClose();
                                        }}
                                    >
                                        <Typography noWrap>
                                            Open Link
                                        </Typography>
                                    </CustomButton>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Fade>
            </Container>
        </Modal>
    );
};

export default CounselorModal;
