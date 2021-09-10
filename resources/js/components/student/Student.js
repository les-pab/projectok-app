import React, { useState, useEffect } from "react";
import {
    Grid,
    Typography,
    Container,
    Fade,
    Card,
    CardContent,
    Backdrop,
    Modal,
    IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { format } from "date-fns";
import { useAuth } from "../auth/AuthProvider";
import Index from "./Index";
import Header from "../shared/Header";
import Profile from "./Profile";
import Appointments from "./Appointment/Appointments";
import Footer from "../shared/Footer";
import ScrollToTop from "../shared/ScrollToTop";
import { fetchProfile, fetchAppointments } from "./Service";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    grid_item: {
        padding: "2% 0",
    },
}));

const Student = () => {
    const auth = useAuth();

    let { path } = useRouteMatch();

    const _id = auth.user.data._id;

    const [loading, setLoading] = useState(false);

    const [student, setStudent] = useState("");
    useEffect(() => {
        const getProfile = async () => {
            const response = await fetchProfile(_id);
            switch (response.status) {
                case 200:
                    setStudent(response.data[0]);
                    break;
            }
        };

        getProfile();
    }, []);

    const [noDateModal, setNoDateModal] = useState(false);
    const handleNoDateModalOpen = () => {
        setNoDateModal(true);
    };
    const handleNoDateModalClose = () => {
        setNoDateModal(false);
    };

    const [internetDate, setInternetDate] = useState(new Date());
    const [today, setToday] = useState(new Date().toDateString());
    useEffect(() => {
        fetch("http://worldtimeapi.org/api/timezone/Asia/Manila")
            .then((res) => res.json())
            .then(
                (result) => {
                    setInternetDate(new Date(result.datetime));
                    setToday(new Date(result.datetime).toDateString());
                },
                (error) => {
                    handleNoDateModalOpen();
                }
            );
    }, []);
    useEffect(() => {
        const getDateTime = async () => {
            setInterval(() => {
                fetch("http://worldtimeapi.org/api/timezone/Asia/Manila")
                    .then((res) => res.json())
                    .then(
                        (result) => {
                            setInternetDate(new Date(result.datetime));
                            setToday(new Date(result.datetime).toDateString());
                        },
                        (error) => {
                            handleNoDateModalOpen();
                        }
                    );
            }, 60000);
        };

        getDateTime();
    }, []);

    const [count, setCount] = useState(0);
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        const getAppointments = async () => {
            const response = await fetchAppointments(_id);
            switch (response.status) {
                case 200:
                    setAppointments(response.data[0]);
                    setLoading(true);
                    break;
            }
        };

        getAppointments();
    }, [count]);

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [name, setName] = useState("");
    const [reason, setReason] = useState("");

    const [acceptedNotificationModal, setAcceptedNotificationModal] =
        useState(false);
    const handleAcceptedNotificationModalOpen = () => {
        setAcceptedNotificationModal(true);
    };
    const handleAcceptedNotificationModalClose = () => {
        setDate("");
        setTime("");
        setName("");
        setReason("");
        setCount(count + 1);
        setAcceptedNotificationModal(false);
    };

    const [canceledNotificationModal, setCanceledNotificationModal] =
        useState(false);
    const handleCanceledNotificationModalOpen = () => {
        setCanceledNotificationModal(true);
    };
    const handleCanceledNotificationModalClose = () => {
        setDate("");
        setTime("");
        setName("");
        setReason("");
        setCount(count + 1);
        setCanceledNotificationModal(false);
    };

    const [rescheduledNotificationModal, setRescheduledNotificationModal] =
        useState(false);
    const handleRescheduledNotificationModalOpen = () => {
        setRescheduledNotificationModal(true);
    };
    const handleRescheduledNotificationModalClose = () => {
        setDate("");
        setTime("");
        setName("");
        setReason("");
        setCount(count + 1);
        setRescheduledNotificationModal(false);
    };

    useEffect(() => {
        Echo.channel(`student.appointment.${_id}`).listen(
            "StudentAppointmentEvent",
            (e) => {
                const parsedAppointment = JSON.parse(e.appointment);

                setDate(new Date(parsedAppointment.date).toDateString());
                setTime(format(new Date(parsedAppointment.time), "hh:mm aa"));
                setName(
                    `${parsedAppointment.counselor.last_name}, ${parsedAppointment.counselor.first_name}`
                );
                setReason(parsedAppointment.reason);

                switch (parsedAppointment.status) {
                    case "accepted":
                        handleAcceptedNotificationModalOpen();
                        break;
                    case "canceled":
                        handleCanceledNotificationModalOpen();
                        break;
                    case "rescheduled":
                        handleRescheduledNotificationModalOpen();
                        break;
                }
            }
        );
        // .listen("StudentImmediateCounselingEvent", (e) => {
        //     console.log(e.appointment);
        // });
    }, []);

    return (
        <>
            <>
                <Header _name={`${student.first_name} ${student.last_name}`} />
                <Switch>
                    <Route exact path={path}>
                        <ScrollToTop />
                        <Index
                            _id={`${_id}`}
                            student={student}
                            date={internetDate}
                            today={today}
                        />
                    </Route>
                    <Route path={`${path}/appointment`}>
                        <ScrollToTop />
                        <Appointments
                            _id={`${_id}`}
                            student={student}
                            date={internetDate}
                            today={today}
                            loading={loading}
                            setLoading={setLoading}
                            appointments={appointments}
                            setAppointments={setAppointments}
                        />
                    </Route>
                    <Route path={`${path}/:id`}>
                        <ScrollToTop />
                        <Profile
                            _id={`${_id}`}
                            profile={student}
                            setProfile={setStudent}
                        />
                    </Route>
                </Switch>
                <Footer />
            </>

            <AppointmentAcceptedModal
                acceptedNotificationModal={acceptedNotificationModal}
                handleAcceptedNotificationModalClose={
                    handleAcceptedNotificationModalClose
                }
                date={date}
                time={time}
                name={name}
            />

            <AppointmentCanceledModal
                canceledNotificationModal={canceledNotificationModal}
                handleCanceledNotificationModalClose={
                    handleCanceledNotificationModalClose
                }
                date={date}
                time={time}
                name={name}
                reason={reason}
            />

            <AppointmentRescheduledModal
                rescheduledNotificationModal={rescheduledNotificationModal}
                handleRescheduledNotificationModalClose={
                    handleRescheduledNotificationModalClose
                }
                date={date}
                time={time}
                name={name}
                reason={reason}
            />

            <NoticeNoDateModal
                noDateModal={noDateModal}
                handleNoDateModalClose={handleNoDateModalClose}
            />
        </>
    );
};

const AppointmentAcceptedModal = ({
    acceptedNotificationModal,
    handleAcceptedNotificationModalClose,
    date,
    time,
    name,
}) => {
    const classes = useStyles();

    return (
        <Modal
            open={acceptedNotificationModal}
            onClose={handleAcceptedNotificationModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Container maxWidth="sm">
                <Fade in={acceptedNotificationModal}>
                    <Card>
                        <CardContent>
                            <Grid container direction="column">
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Typography
                                            color="primary"
                                            variant="h4"
                                        >
                                            Appointment Accepted
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton
                                            onClick={
                                                handleAcceptedNotificationModalClose
                                            }
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Grid item className={classes.grid_item}>
                                    <Typography variant="h5">
                                        Your appointment for {date} at {time}{" "}
                                        with {name} was accepted.
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

const AppointmentCanceledModal = ({
    canceledNotificationModal,
    handleCanceledNotificationModalClose,
    date,
    time,
    name,
    reason,
}) => {
    const classes = useStyles();

    return (
        <Modal
            open={canceledNotificationModal}
            onClose={handleCanceledNotificationModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Container maxWidth="sm">
                <Fade in={canceledNotificationModal}>
                    <Card>
                        <CardContent>
                            <Grid container direction="column">
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Typography
                                            color="primary"
                                            variant="h4"
                                        >
                                            Appointment Canceled
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton
                                            onClick={
                                                handleCanceledNotificationModalClose
                                            }
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Grid item className={classes.grid_item}>
                                    <Typography variant="h5">
                                        Your appointment for {date} at {time}{" "}
                                        with {name} was canceled due to: "
                                        {reason}"
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

const AppointmentRescheduledModal = ({
    rescheduledNotificationModal,
    handleRescheduledNotificationModalClose,
    date,
    time,
    name,
    reason,
}) => {
    const classes = useStyles();

    return (
        <Modal
            open={rescheduledNotificationModal}
            onClose={handleRescheduledNotificationModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Container maxWidth="sm">
                <Fade in={rescheduledNotificationModal}>
                    <Card>
                        <CardContent>
                            <Grid container direction="column">
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Typography
                                            color="primary"
                                            variant="h4"
                                        >
                                            Appointment Rescheduled
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton
                                            onClick={
                                                handleRescheduledNotificationModalClose
                                            }
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Grid item className={classes.grid_item}>
                                    <Typography variant="h5">
                                        Your scheduled appointment with {name}
                                        was rescheduled to {date} at {time} due
                                        to: "{reason}"
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

const NoticeNoDateModal = ({ noDateModal, handleNoDateModalClose }) => {
    const classes = useStyles();

    return (
        <Modal
            open={noDateModal}
            onClose={handleNoDateModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Container maxWidth="sm">
                <Fade in={noDateModal}>
                    <Card>
                        <CardContent>
                            <Grid container direction="column">
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Typography color="error" variant="h4">
                                            NOTICE:
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton
                                            onClick={handleNoDateModalClose}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Grid item className={classes.grid_item}>
                                    <Typography variant="h5">
                                        An error occured while getting the
                                        current date and time, please reload or
                                        refresh the page.
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

export default Student;
