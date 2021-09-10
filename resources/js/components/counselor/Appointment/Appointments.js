import React, { useState, useEffect } from "react";
import {
    Grid,
    Container,
    Card,
    CardContent,
    IconButton,
    Typography,
    Box,
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
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { format, isAfter, isBefore } from "date-fns";
import { TodayUpcomingRow, RequestRow, ArchivedRow } from "./Appointment";
import AcceptModal from "./Modals/AcceptModal";
import CancelModal from "./Modals/CancelModal";
import RescheduleModal from "./Modals/RescheduleModal";
import NoteModal from "./Modals/NoteModal";
import ViewNoteModal from "./Modals/ViewNoteModal";
import { updateAppointment } from "../Service";

const useStyles = makeStyles((theme) => ({
    typography_red: {
        padding: "2% 8%",
        backgroundColor: "rgba(187, 41, 50, 0.17)",
    },
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
                                    Status
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Note
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
                                    Status
                                </Typography>
                            </TableCell>
                            <TableCell align="left" variant="head">
                                <Typography color="primary" variant="h5">
                                    Note
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
                                    Accept
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
    counselor,
    appointments,
    setAppointments,
    date,
    loading,
    setLoading,
}) => {
    const history = useHistory();

    const classes = useStyles();

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
            appointment.status === "canceled" ||
            appointment.status === "completed"
    );

    const [selectedAppointment, setSelectedAppointment] = useState("");
    const [acceptModal, setAcceptModal] = useState(false);
    const handleOpenAcceptModal = () => {
        setCancelModal(false);
        setRescheduleModal(false);
        setNoteModal(false);
        setViewNoteModal(false);
        setAcceptModal(true);
    };
    const handleCloseAcceptModal = () => {
        setAcceptModal(false);
    };

    const [cancelModal, setCancelModal] = useState(false);
    const handleOpenCancelModal = () => {
        setAcceptModal(false);
        setRescheduleModal(false);
        setNoteModal(false);
        setViewNoteModal(false);
        setCancelModal(true);
    };
    const handleCloseCancelModal = () => {
        setCancelModal(false);
    };

    const [rescheduleModal, setRescheduleModal] = useState(false);
    const handleOpenRescheduleModal = () => {
        setAcceptModal(false);
        setCancelModal(false);
        setNoteModal(false);
        setViewNoteModal(false);
        setRescheduleModal(true);
    };
    const handleCloseRescheduleModal = () => {
        setRescheduleModal(false);
    };

    const [noteModal, setNoteModal] = useState(false);
    const handleOpenNoteModal = () => {
        setCancelModal(false);
        setRescheduleModal(false);
        setAcceptModal(false);
        setViewNoteModal(false);
        setNoteModal(true);
    };
    const handleCloseNoteModal = () => {
        setNoteModal(false);
    };

    const [viewNoteModal, setViewNoteModal] = useState(false);
    const handleOpenViewNoteModal = () => {
        setCancelModal(false);
        setRescheduleModal(false);
        setAcceptModal(false);
        setNoteModal(false);
        setViewNoteModal(true);
    };
    const handleCloseViewNoteModal = () => {
        setViewNoteModal(false);
    };

    const handleOnCompleted = async (appointment) => {
        setLoading(true);

        const formData = {
            counselor_id: _id,
            appointment_id: appointment._id,
            type: "completed",
        };

        const response = await updateAppointment(formData);
        switch (response.status) {
            case 200:
                setAppointments(response.data[0]);
                setLoading(false);
                break;
            case 422:
                setLoading(false);
                break;
        }
    };

    const handleAddNoteModal = (appointment) => {
        setSelectedAppointment(appointment);
        handleOpenNoteModal();
    };
    const handleViewNoteModal = (appointment) => {
        setSelectedAppointment(appointment);
        handleOpenViewNoteModal();
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
            handleAddNoteModal={handleAddNoteModal}
            handleOnCompleted={handleOnCompleted}
            handleOnCancel={handleOnCancel}
            handleOnReschedule={handleOnReschedule}
        />
    ));

    const upcomingPanel = upcoming.map((appointment, key) => (
        <TodayUpcomingRow
            key={key}
            appointment={appointment}
            internetDate={date}
            handleAddNoteModal={handleAddNoteModal}
            handleOnCancel={handleOnCancel}
            handleOnReschedule={handleOnReschedule}
        />
    ));

    const requestPanel = requests.map((appointment, key) => (
        <RequestRow
            key={key}
            appointment={appointment}
            handleOnAccept={handleOnAccept}
            handleOnCancel={handleOnCancel}
            handleOnReschedule={handleOnReschedule}
        />
    ));

    const archivedPanel = archived.map((appointment, key) => (
        <ArchivedRow
            key={key}
            appointment={appointment}
            handleViewNoteModal={handleViewNoteModal}
        />
    ));

    const handleGoBack = () => {
        history.push("/counselor");
    };

    return (
        <>
            <div>
                <Container>
                    <Grid
                        container
                        direction="column"
                        className={classes.grid_container}
                    >
                        <Grid
                            item
                            container
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            className={classes.grid_item}
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
                        {loading ? (
                            <Grid item className={classes.grid_item}>
                                <LinearProgress />
                            </Grid>
                        ) : (
                            ""
                        )}
                        <Grid item container direction="column">
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

            <NoteModal
                useStyles={useStyles}
                setAppointments={setAppointments}
                selectedAppointment={selectedAppointment}
                counselor={counselor}
                noteModal={noteModal}
                handleCloseNoteModal={handleCloseNoteModal}
            />

            <ViewNoteModal
                useStyles={useStyles}
                selectedAppointment={selectedAppointment}
                viewNoteModal={viewNoteModal}
                handleCloseViewNoteModal={handleCloseViewNoteModal}
            />

            <AcceptModal
                useStyles={useStyles}
                setAppointments={setAppointments}
                selectedAppointment={selectedAppointment}
                counselor={counselor}
                acceptModal={acceptModal}
                handleCloseAcceptModal={handleCloseAcceptModal}
            />

            <CancelModal
                useStyles={useStyles}
                selectedAppointment={selectedAppointment}
                setAppointments={setAppointments}
                selectedAppointment={selectedAppointment}
                counselor={counselor}
                cancelModal={cancelModal}
                handleCloseCancelModal={handleCloseCancelModal}
            />

            <RescheduleModal
                useStyles={useStyles}
                selectedAppointment={selectedAppointment}
                setAppointments={setAppointments}
                selectedAppointment={selectedAppointment}
                counselor={counselor}
                rescheduleModal={rescheduleModal}
                handleCloseRescheduleModal={handleCloseRescheduleModal}
            />
        </>
    );
};

export default Appointments;
