import React, { useState, useEffect } from "react";
import {
    Container,
    Grid,
    Paper,
    Card,
    CardContent,
    Typography,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Modal,
    Backdrop,
    Fade,
    LinearProgress,
    TextField,
} from "@material-ui/core";
import { CustomButton } from "../../material-ui/styles";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import DateFnsUtils from "@date-io/date-fns";
import {
    TimePicker,
    DatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { fetchWebinars, addWebinar, removeWebinar } from "./Service";
import Webinar from "./Webinar";

const AddWebinarModal = ({
    useStyles,
    modalState,
    handleAddWebinarModalClose,
    handleOnSubmit,
    loading,
    fieldError,
    form,
    date,
    setDate,
    time,
    setTime,
    handleFormChange,
}) => {
    const classes = useStyles();

    return (
        <Modal
            open={modalState}
            onClose={handleAddWebinarModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Container maxWidth="sm">
                <Fade in={modalState}>
                    <Card>
                        <CardContent>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="h4">
                                        Add a webinar
                                    </Typography>
                                </Grid>

                                {loading ? (
                                    <Grid
                                        item
                                        xs={12}
                                        md={12}
                                        lg={12}
                                        className={classes.grid_item}
                                    >
                                        <LinearProgress />
                                    </Grid>
                                ) : (
                                    ""
                                )}

                                <Grid item>
                                    <form
                                        autoComplete="off"
                                        onSubmit={handleOnSubmit}
                                    >
                                        <Grid container direction="column">
                                            <Grid
                                                item
                                                className={classes.grid_item}
                                            >
                                                <TextField
                                                    autoFocus
                                                    id="title"
                                                    disabled={loading}
                                                    error={
                                                        fieldError.title
                                                            ? true
                                                            : false
                                                    }
                                                    fullWidth
                                                    helperText={
                                                        fieldError.title
                                                            ? fieldError.title
                                                            : ""
                                                    }
                                                    label="Title"
                                                    name="title"
                                                    onChange={handleFormChange}
                                                    value={form.title}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                className={classes.grid_item}
                                            >
                                                <MuiPickersUtilsProvider
                                                    utils={DateFnsUtils}
                                                >
                                                    <DatePicker
                                                        value={date}
                                                        onChange={setDate}
                                                        autoOk
                                                        disabled={loading}
                                                        inputVariant="outlined"
                                                        orientation="landscape"
                                                        variant="inline"
                                                        error={
                                                            fieldError.date
                                                                ? true
                                                                : false
                                                        }
                                                        fullWidth
                                                        helperText={
                                                            fieldError.date
                                                                ? fieldError.date
                                                                : ""
                                                        }
                                                        label="Date"
                                                        name="date"
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </Grid>
                                            <Grid
                                                item
                                                className={classes.grid_item}
                                            >
                                                <MuiPickersUtilsProvider
                                                    utils={DateFnsUtils}
                                                >
                                                    <TimePicker
                                                        value={time}
                                                        onChange={setTime}
                                                        autoOk
                                                        disabled={loading}
                                                        inputVariant="outlined"
                                                        orientation="landscape"
                                                        variant="inline"
                                                        error={
                                                            fieldError.time
                                                                ? true
                                                                : false
                                                        }
                                                        fullWidth
                                                        helperText={
                                                            fieldError.time
                                                                ? fieldError.time
                                                                : ""
                                                        }
                                                        label="Time"
                                                        name="time"
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </Grid>
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
                                                    label="Link"
                                                    name="link"
                                                    onChange={handleFormChange}
                                                    value={form.link}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                className={classes.grid_items}
                                            >
                                                <CustomButton
                                                    type="submit"
                                                    disabled={loading}
                                                    onClick={handleOnSubmit}
                                                    background="primary"
                                                    width="100%"
                                                >
                                                    Add
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

const Webinars = ({ _id, useStyles }) => {
    const classes = useStyles();

    const [webinars, setWebinars] = useState([]);
    useEffect(() => {
        const getWebinars = async () => {
            const response = await fetchWebinars(_id);
            switch (response.status) {
                case 200:
                    setWebinars(response.data[0]);
                    break;
            }
        };

        getWebinars();
    }, []);

    const onDelete = async (e) => {
        const _id = e.currentTarget.getAttribute("data-id");
        console.log(_id);
        const response = await removeWebinar(_id);
        switch (response.status) {
            case 200:
                setWebinars(webinars.filter((webinar) => webinar._id !== _id));
                break;
        }
    };

    const [modalState, setModalState] = useState(false);
    const handleAddWebinarModalOpen = () => {
        setModalState(true);
    };
    const handleAddWebinarModalClose = () => {
        setLoading(false);
        setForm({
            title: "",
            link: "",
        });
        setFieldError({
            title: null,
            date: null,
            time: null,
            link: null,
        });
        setDate(new Date());
        setTime(new Date());
        setModalState(false);
    };

    const [webinarId, setWebinarId] = useState("");
    const [form, setForm] = useState({
        title: "",
        link: "",
    });
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const handleFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const [loading, setLoading] = useState(false);
    const [fieldError, setFieldError] = useState({
        topic: null,
        date: null,
        time: null,
        link: null,
    });

    const handleOnEdit = (index) => {
        setWebinarId(webinars[index]._id);
        setForm({
            title: webinars[index].title,
            link: webinars[index].link,
        });
        setDate(new Date(webinars[index].date));
        setTime(new Date(webinars[index].time));
        handleAddWebinarModalOpen();
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let formData = {
            counselor_id: _id,
            webinar_id: webinarId,
            title: form.title,
            date: date,
            time: time,
            link: form.link,
        };

        let response = await addWebinar(formData);
        switch (response.status) {
            case 200:
                setWebinars(response.data[0]);
                handleAddWebinarModalClose();
                break;
            case 422:
                setLoading(false);
                setFieldError(response.data.errors);
                break;
        }
    };

    return (
        <>
            <Container>
                <Card raised={true} className={classes.card}>
                    <CardContent>
                        <Grid container direction="column">
                            <Grid
                                container
                                item
                                justifyContent="space-between"
                                alignItems="center"
                                className={classes.grid_container}
                            >
                                <Grid item>
                                    <Typography color="primary" variant="h4">
                                        Webinars
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <IconButton
                                        color="primary"
                                        onClick={handleAddWebinarModalOpen}
                                    >
                                        <AddCircleOutlineOutlinedIcon fontSize="large" />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid item className={classes.grid_item}>
                                {webinars.length > 0 ? (
                                    <TableContainer component={Paper}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell
                                                        align="left"
                                                        variant="head"
                                                    >
                                                        <Typography
                                                            color="primary"
                                                            variant="h5"
                                                        >
                                                            Title
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        variant="head"
                                                    >
                                                        <Typography
                                                            color="primary"
                                                            variant="h5"
                                                        >
                                                            Date
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        variant="head"
                                                    >
                                                        <Typography
                                                            color="primary"
                                                            variant="h5"
                                                        >
                                                            Time
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        variant="head"
                                                    >
                                                        <Typography
                                                            color="primary"
                                                            variant="h5"
                                                        >
                                                            Link
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        variant="head"
                                                    >
                                                        ""
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        variant="head"
                                                    >
                                                        ""
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {webinars.map(
                                                    (webinar, index) => (
                                                        <Webinar
                                                            key={index}
                                                            index={index}
                                                            webinar={webinar}
                                                            handleOnEdit={
                                                                handleOnEdit
                                                            }
                                                            onDelete={onDelete}
                                                        />
                                                    )
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                ) : (
                                    <Paper
                                        square
                                        elavation={0}
                                        className={classes.paper}
                                    >
                                        <Typography
                                            variant="h5"
                                            className={classes.paper_typography}
                                            color="textPrimary"
                                        >
                                            You have no webinars to show, would
                                            you like to add one?.
                                        </Typography>
                                    </Paper>
                                )}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>

            <AddWebinarModal
                useStyles={useStyles}
                modalState={modalState}
                handleAddWebinarModalClose={handleAddWebinarModalClose}
                handleOnSubmit={handleOnSubmit}
                loading={loading}
                fieldError={fieldError}
                form={form}
                date={date}
                setDate={setDate}
                time={time}
                setTime={setTime}
                handleFormChange={handleFormChange}
            />
        </>
    );
};

export default Webinars;
