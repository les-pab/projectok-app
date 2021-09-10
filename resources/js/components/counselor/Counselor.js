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
    TextField,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { format } from "date-fns";
import { useAuth } from "../auth/AuthProvider";
import Index from "./Index";
import Profile from "./Profile";
import ScrollToTop from "../shared/ScrollToTop";
import Header from "../shared/Header";
import Appointments from "./Appointment/Appointments";
import Footer from "../shared/Footer";
import { CustomButton } from "../../material-ui/styles";
import { fetchProfile, fetchAppointments, updateConnect } from "./Service";

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

const Counselor = () => {
    const auth = useAuth();

    let { path } = useRouteMatch();

    const _id = auth.user.data._id;

    const [loading, setLoading] = useState(false);

    const [counselor, setCounselor] = useState("");
    useEffect(() => {
        const getProfile = async () => {
            const response = await fetchProfile(_id);
            switch (response.status) {
                case 200:
                    setCounselor(response.data[0]);
                    break;
            }
        };

        getProfile();
    }, []);

    const [count, setCount] = useState(0);
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        const getAppointments = async () => {
            setLoading(true);

            const response = await fetchAppointments(_id);
            switch (response.status) {
                case 200:
                    setLoading(false);
                    setAppointments(response.data[0]);
                    break;
            }
        };

        getAppointments();
    }, [count]);

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

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [name, setName] = useState("");
    const [reason, setReason] = useState("");
    const [studentId, setStudentId] = useState("");
    const [appointmentId, setAppointmentId] = useState("");

    const [connectNotificationModal, setConnectNotificationModal] =
        useState(false);
    const handleConnectNotificationModalOpen = () => {
        setConnectNotificationModal(true);
    };
    const handleConnectNotificationModalClose = () => {
        setDate("");
        setTime("");
        setName("");
        setReason("");
        setCount(count + 1);
        setConnectNotificationModal(false);
    };

    const [acceptConnectModal, setAcceptConnectModal] = useState(false);
    const handleAcceptConnectModalOpen = () => {
        setAcceptConnectModal(true);
    };
    const handleAcceptConnectModalClose = () => {
        setAcceptConnectModal(false);
    };

    const [pendingNotificationModal, setPendingNotificationModal] =
        useState(false);
    const handlePendingNotificationModalOpen = () => {
        setPendingNotificationModal(true);
    };
    const handlePendingNotificationModalClose = () => {
        setDate("");
        setTime("");
        setName("");
        setReason("");
        setCount(count + 1);
        setPendingNotificationModal(false);
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

    const [form, setForm] = useState({
        link: "",
    });
    const [fieldError, setFieldError] = useState({
        link: null,
    });
    const handleFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnCancel = async () => {
        let formData = {
            counselor_id: _id,
            student_id: studentId,
            appointment_id: appointmentId,
            type: "cancel",
        };

        const response = await updateConnect(formData);
        switch (response.status) {
            case 200:
                handleConnectNotificationModalClose();
                break;
            case 422:
                break;
        }
    };

    const handleOnAccept = async (e) => {
        e.preventDefault();

        setLoading(true);

        let formData = {
            counselor_id: _id,
            student_id: studentId,
            appointment_id: appointmentId,
            link: form.link,
            type: "accept",
        };

        const response = await updateConnect(formData);
        switch (response.status) {
            case 200:
                setLoading(false);
                handleAcceptConnectModalClose();
                handleConnectNotificationModalClose();
                break;
            case 422:
                break;
        }
    };

    useEffect(() => {
        Echo.channel(`counselor.appointment.${_id}`)
            .listen("CounselorAppointmentEvent", (e) => {
                const parsedAppointment = JSON.parse(e.appointment);

                setDate(new Date(parsedAppointment.date).toDateString());
                setTime(format(new Date(parsedAppointment.time), "hh:mm aa"));
                setName(
                    `${parsedAppointment.student.last_name}, ${parsedAppointment.student.first_name}`
                );
                setReason(parsedAppointment.reason);

                switch (parsedAppointment.status) {
                    case "pending":
                        handlePendingNotificationModalOpen();
                        break;
                    case "canceled":
                        handleCanceledNotificationModalOpen();
                        break;
                    case "rescheduled":
                        handleRescheduledNotificationModalOpen();
                        break;
                }
            })
            .listen("CounselorImmediateCounselingEvent", (e) => {
                // console.log(e.appointment);
                const parsedAppointment = JSON.parse(e.appointment);

                setName(
                    `${parsedAppointment.student.first_name} ${parsedAppointment.student.last_name}`
                );
                setAppointmentId(parsedAppointment._id);
                setStudentId(parsedAppointment.student_id);

                handleConnectNotificationModalOpen();
            });
    }, []);

    return (
        <>
            <>
                <Header
                    _name={`${counselor.last_name}, ${counselor.first_name}`}
                />
                <Switch>
                    <Route exact path={path}>
                        <ScrollToTop />
                        <Index
                            _id={`${_id}`}
                            counselor={counselor}
                            today={today}
                        />
                    </Route>
                    <Route path={`${path}/appointment`}>
                        <ScrollToTop />
                        <Appointments
                            _id={`${_id}`}
                            counselor={counselor}
                            appointments={appointments}
                            setAppointments={setAppointments}
                            date={internetDate}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </Route>
                    <Route path={`${path}/:id`}>
                        <ScrollToTop />
                        <Profile
                            _id={`${_id}`}
                            profile={counselor}
                            setProfile={setCounselor}
                        />
                    </Route>
                </Switch>
                <Footer />
            </>

            <AppointmentConnectModal
                connectNotificationModal={connectNotificationModal}
                handleConnectNotificationModalClose={
                    handleConnectNotificationModalClose
                }
                handleOnCancel={handleOnCancel}
                handleAcceptConnectModalOpen={handleAcceptConnectModalOpen}
                name={name}
            />

            <AppointmentAcceptConnectModal
                acceptConnectModal={acceptConnectModal}
                handleAcceptConnectModalClose={handleAcceptConnectModalClose}
                loading={loading}
                form={form}
                handleFormChange={handleFormChange}
                fieldError={fieldError}
                handleOnAccept={handleOnAccept}
            />

            <AppointmentPendingModal
                pendingNotificationModal={pendingNotificationModal}
                handlePendingNotificationModalClose={
                    handlePendingNotificationModalClose
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

const AppointmentConnectModal = ({
    connectNotificationModal,
    handleConnectNotificationModalClose,
    handleOnCancel,
    handleAcceptConnectModalOpen,
    name,
}) => {
    const classes = useStyles();

    return (
        <Modal
            open={connectNotificationModal}
            // onClose={handleConnectNotificationModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Container maxWidth="sm">
                <Fade in={connectNotificationModal}>
                    <Card>
                        <CardContent>
                            <Grid container direction="column">
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    className={classes.grid_item}
                                >
                                    <Grid item>
                                        <Typography
                                            color="primary"
                                            variant="h4"
                                        >
                                            Connect
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item className={classes.grid_item}>
                                    <Typography variant="h5">
                                        {name} wants to connect with you.
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    className={classes.grid_item}
                                >
                                    <Grid item>
                                        <CustomButton onClick={handleOnCancel}>
                                            Cancel
                                        </CustomButton>
                                    </Grid>
                                    <Grid item>
                                        <CustomButton
                                            background="primary"
                                            onClick={
                                                handleAcceptConnectModalOpen
                                            }
                                        >
                                            Accept
                                        </CustomButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Fade>
            </Container>
        </Modal>
    );
};

const AppointmentAcceptConnectModal = ({
    acceptConnectModal,
    handleAcceptConnectModalClose,
    loading,
    form,
    handleFormChange,
    fieldError,
    handleOnAccept,
}) => {
    const classes = useStyles();

    return (
        <Modal
            open={acceptConnectModal}
            // onClose={handleAcceptConnectModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Container maxWidth="sm">
                <Fade in={acceptConnectModal}>
                    <Card>
                        <CardContent>
                            <Grid container direction="column">
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Typography variant="h4">
                                            Accept
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item className={classes.grid_item}>
                                    <form
                                        autoComplete="off"
                                        onSubmit={handleOnAccept}
                                    >
                                        <Grid
                                            container
                                            direction="column"
                                            justifyContent="flex-start"
                                        >
                                            <Grid
                                                item
                                                className={classes.grid_item}
                                            >
                                                <TextField
                                                    autoFocus
                                                    id="link"
                                                    disabled={loading}
                                                    error={
                                                        fieldError.link
                                                            ? true
                                                            : false
                                                    }
                                                    fullWidth
                                                    helperText={
                                                        fieldError.link
                                                            ? fieldError.link
                                                            : ""
                                                    }
                                                    label="Meeting Link"
                                                    name="link"
                                                    onChange={handleFormChange}
                                                    value={form.link}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                className={classes.grid_item}
                                            >
                                                <CustomButton
                                                    type="submit"
                                                    disabled={loading}
                                                    background="primary"
                                                    width="100%"
                                                >
                                                    Accept
                                                </CustomButton>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Fade>
            </Container>
        </Modal>
    );
};

const AppointmentPendingModal = ({
    pendingNotificationModal,
    handlePendingNotificationModalClose,
    date,
    time,
    name,
}) => {
    const classes = useStyles();

    return (
        <Modal
            open={pendingNotificationModal}
            onClose={handlePendingNotificationModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Container maxWidth="sm">
                <Fade in={pendingNotificationModal}>
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
                                            Pending Appointment
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton
                                            onClick={
                                                handlePendingNotificationModalClose
                                            }
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Grid item className={classes.grid_item}>
                                    <Typography variant="h5">
                                        You have a new pending appointment for{" "}
                                        {date} at {time} with {name}.
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

export default Counselor;
