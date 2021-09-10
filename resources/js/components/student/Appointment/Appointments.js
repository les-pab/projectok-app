import React, { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Container,
    Card,
    CardContent,
    IconButton,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    TableFooter,
    LinearProgress,
    Tab,
} from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { format, isAfter, isBefore } from "date-fns";
import { fetchAppointments, fetchAvailability } from "../Service";
import { CustomButton } from "../../../material-ui/styles";
import { TodayUpcomingRow, RequestRow, ArchivedRow } from "./Appointment";
import CounselorModal from "./Modals/CounselorModal";
import AcceptModal from "./Modals/AcceptModal";
import CancelModal from "./Modals/CancelModal";
import RescheduleModal from "./Modals/RescheduleModal";

const useStyles = makeStyles((theme) => ({
    grid_container: {
        padding: "4% 0",
    },
    grid_item: {
        padding: "2% 0",
    },
    table: {
        height: 512,
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    counselor_card: {
        maxHeight: "724px",
    },
    counselor: {
        padding: "0 68px",
    },
    avatar: {
        width: "160px",
        height: "160px",
    },
    typography_green: {
        padding: "2% 8%",
        backgroundColor: "rgba(41, 187, 137, 0.17)",
    },
}));

const TodayPanel = ({ todayPanel }) => {
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const emptyRows =
        rowsPerPage -
        Math.min(rowsPerPage, todayPanel.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TabPanel value="1">
            <TableContainer className={classes.table}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Date
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Time
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Link
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Email
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Contact
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Status
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Cancel
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Reschedule
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? todayPanel.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                              )
                            : todayPanel
                        ).map((row) => row)}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={todayPanel.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </TabPanel>
    );
};

const UpcomingPanel = ({ upcomingPanel }) => {
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const emptyRows =
        rowsPerPage -
        Math.min(rowsPerPage, upcomingPanel.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TabPanel value="2">
            <TableContainer className={classes.table}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Date
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Time
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Link
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Email
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Contact
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Status
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Cancel
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Reschedule
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? upcomingPanel.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                              )
                            : upcomingPanel
                        ).map((row) => row)}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={upcomingPanel.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </TabPanel>
    );
};

const RequestPanel = ({ requestPanel }) => {
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const emptyRows =
        rowsPerPage -
        Math.min(rowsPerPage, requestPanel.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TabPanel value="3">
            <TableContainer className={classes.table}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Date
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Time
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Status
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Cancel
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Reschedule
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? requestPanel.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                              )
                            : requestPanel
                        ).map((row) => row)}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={requestPanel.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </TabPanel>
    );
};

const ArchivedPanel = ({ archivedPanel }) => {
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const emptyRows =
        rowsPerPage -
        Math.min(rowsPerPage, archivedPanel.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TabPanel value="4">
            <TableContainer className={classes.table}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Date
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Time
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Status
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? archivedPanel.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                              )
                            : archivedPanel
                        ).map((row) => row)}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={archivedPanel.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </TabPanel>
    );
};

const Appointments = ({
    _id,
    student,
    appointments,
    setAppointments,
    date,
    loading,
    setLoading,
}) => {
    const history = useHistory();

    const classes = useStyles();

    const [counselors, setCounselors] = useState([]);
    useEffect(() => {
        const getAvailability = async () => {
            const response = await fetchAvailability();
            switch (response.status) {
                case 200:
                    setCounselors(response.data[0]);
                    break;
            }
        };

        getAvailability();
    }, []);

    const [counselorModal, setCounselorModal] = useState(false);
    const handleCounselorModal = () => {
        setCounselorModal(!counselorModal);
    };

    const [tabValue, setTabValue] = useState("1");
    const handleTabChange = (e, value) => {
        setTabValue(value);
    };

    let today = appointments.filter(
        (appointment) =>
            `${format(new Date(appointment.date), "MM/dd/yyyy")}` ===
                `${format(date, "MM/dd/yyyy")}` &&
            appointment.status !== "pending" &&
            appointment.status !== "canceled" &&
            appointment.status !== "completed"
    );

    let upcoming = appointments.filter(
        (appointment) =>
            isAfter(new Date(appointment.date), date) &&
            appointment.status !== "pending" &&
            appointment.status !== "canceled" &&
            appointment.status !== "completed"
    );

    let requests = appointments.filter(
        (appointment) => appointment.status === "pending"
    );

    let archived = appointments.filter(
        (appointment) =>
            // isBefore(new Date(appointment.date), date) &&
            appointment.status === "canceled" ||
            appointment.status === "completed"
    );

    const [selectedAppointment, setSelectedAppointment] = useState("");
    const [acceptModal, setAcceptModal] = useState(false);
    const handleOpenAcceptModal = () => {
        setCancelModal(false);
        setRescheduleModal(false);
        setAcceptModal(true);
    };
    const handleCloseAcceptModal = () => {
        setAcceptModal(false);
    };

    const [cancelModal, setCancelModal] = useState(false);
    const handleOpenCancelModal = () => {
        setAcceptModal(false);
        setRescheduleModal(false);
        setCancelModal(true);
    };
    const handleCloseCancelModal = () => {
        setCancelModal(false);
    };

    const [rescheduleModal, setRescheduleModal] = useState(false);
    const handleOpenRescheduleModal = () => {
        setAcceptModal(false);
        setCancelModal(false);
        setRescheduleModal(true);
    };
    const handleCloseRescheduleModal = () => {
        setRescheduleModal(false);
    };

    const handleOnAccept = (appointment) => {
        setSelectedAppointment(appointment);
        handleOpenAcceptModal();
    };
    const handleOnCancel = (appointment) => {
        setSelectedAppointment(appointment);
        handleOpenCancelModal();
    };
    const handleOnReschedule = (appointment) => {
        setSelectedAppointment(appointment);
        handleOpenRescheduleModal();
    };

    const todayPanel = today.map((appointment, key) => (
        <TodayUpcomingRow
            key={key}
            appointment={appointment}
            internetDate={date}
            handleOnCancel={handleOnCancel}
            handleOnReschedule={handleOnReschedule}
        />
    ));

    const upcomingPanel = upcoming.map((appointment, key) => (
        <TodayUpcomingRow
            key={key}
            appointment={appointment}
            internetDate={date}
            handleOnCancel={handleOnCancel}
            handleOnReschedule={handleOnReschedule}
        />
    ));

    const requestPanel = requests.map((appointment, key) => (
        <RequestRow
            key={key}
            appointment={appointment}
            internetDate={date}
            handleOnAccept={handleOnAccept}
            handleOnCancel={handleOnCancel}
            handleOnReschedule={handleOnReschedule}
        />
    ));

    const archivedPanel = archived.map((appointment, key) => (
        <ArchivedRow key={key} appointment={appointment} />
    ));

    const handleGoBack = () => {
        history.push("/student");
    };

    return (
        <>
            <div>
                <Container maxWidth="lg">
                    <Grid
                        container
                        direction="column"
                        wrap="nowrap"
                        className={classes.grid_container}
                    >
                        <Grid
                            item
                            container
                            direction="row"
                            className={classes.grid_item}
                        >
                            <Grid
                                item
                                container
                                direction="row"
                                alignItems="center"
                                wrap="wrap"
                            >
                                <Grid item>
                                    <IconButton onClick={handleGoBack}>
                                        <ArrowBackIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Typography color="primary" variant="h4">
                                        Appointments
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className={classes.grid_item}>
                            <CustomButton
                                background="primary"
                                startIcon={<AddCircleOutlineIcon />}
                                onClick={handleCounselorModal}
                            >
                                Set an appointment
                            </CustomButton>
                        </Grid>
                        {loading <= 0 ? (
                            <Grid item className={classes.grid_item}>
                                <LinearProgress />
                            </Grid>
                        ) : (
                            ""
                        )}
                        <Grid item container direction="column" wrap="nowrap">
                            <Card>
                                <CardContent>
                                    <Box display="flex" flexDirection="column">
                                        <TabContext value={tabValue}>
                                            <TabList
                                                onChange={handleTabChange}
                                                orientation="horizontal"
                                            >
                                                <Tab
                                                    label={
                                                        <Typography
                                                            color="primary"
                                                            variant="h5"
                                                        >
                                                            Today
                                                        </Typography>
                                                    }
                                                    value="1"
                                                />
                                                <Tab
                                                    label={
                                                        <Typography
                                                            color="primary"
                                                            variant="h5"
                                                        >
                                                            Upcoming
                                                        </Typography>
                                                    }
                                                    value="2"
                                                />
                                                <Tab
                                                    label={
                                                        <Typography
                                                            color="primary"
                                                            variant="h5"
                                                        >
                                                            Requests
                                                        </Typography>
                                                    }
                                                    value="3"
                                                />
                                                <Tab
                                                    label={
                                                        <Typography
                                                            color="primary"
                                                            variant="h5"
                                                        >
                                                            Archive
                                                        </Typography>
                                                    }
                                                    value="4"
                                                />
                                            </TabList>
                                            <TodayPanel
                                                todayPanel={todayPanel}
                                            />

                                            <UpcomingPanel
                                                upcomingPanel={upcomingPanel}
                                            />

                                            <RequestPanel
                                                requestPanel={requestPanel}
                                            />

                                            <ArchivedPanel
                                                archivedPanel={archivedPanel}
                                            />
                                        </TabContext>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </div>

            <CounselorModal
                useStyles={useStyles}
                setCounselors={setCounselors}
                setAppointments={setAppointments}
                counselorModal={counselorModal}
                handleCounselorModal={handleCounselorModal}
                _id={_id}
                counselors={counselors}
            />

            <AcceptModal
                useStyles={useStyles}
                setAppointments={setAppointments}
                selectedAppointment={selectedAppointment}
                _id={_id}
                student={student}
                acceptModal={acceptModal}
                handleCloseAcceptModal={handleCloseAcceptModal}
            />

            <CancelModal
                useStyles={useStyles}
                selectedAppointment={selectedAppointment}
                setAppointments={setAppointments}
                selectedAppointment={selectedAppointment}
                _id={_id}
                student={student}
                cancelModal={cancelModal}
                handleCloseCancelModal={handleCloseCancelModal}
            />

            <RescheduleModal
                useStyles={useStyles}
                selectedAppointment={selectedAppointment}
                setAppointments={setAppointments}
                selectedAppointment={selectedAppointment}
                _id={_id}
                student={student}
                rescheduleModal={rescheduleModal}
                handleCloseRescheduleModal={handleCloseRescheduleModal}
            />
        </>
    );
};

export default Appointments;
