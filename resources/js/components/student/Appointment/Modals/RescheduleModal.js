import React, { useState } from "react";
import {
    Grid,
    Container,
    Card,
    CardContent,
    IconButton,
    TextField,
    Typography,
    Modal,
    Fade,
    Backdrop,
    Switch,
    FormControl,
    FormGroup,
    FormControlLabel,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DateFnsUtils from "@date-io/date-fns";
import {
    DatePicker,
    TimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { CustomButton } from "../../../../material-ui/styles";
import { updateAppointment } from "../../Service";

const RescheduleModal = ({
    useStyles,
    setAppointments,
    selectedAppointment,
    _id,
    student,
    rescheduleModal,
    handleCloseRescheduleModal,
}) => {
    const classes = useStyles();

    const today = new Date();

    const [form, setForm] = useState({
        reason: "",
        email: false,
        contact: false,
    });
    const handleFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const handleSliderCheck = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.checked,
        });
    };

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());

    const [fieldError, setFieldError] = useState({
        reason: null,
        mathching: null,
    });

    const [loading, setLoading] = useState(false);
    const handleOnSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        let formData = {
            student_id: _id,
            appointment_id: selectedAppointment._id,
            slot_id: selectedAppointment.slot_id,
            date: date,
            time: time,
            reason: form.reason,
            email: form.email,
            contact: form.contact,
            type: "reschedule",
        };

        const response = await updateAppointment(formData);
        console.log(response);
        switch (response.status) {
            case 200:
                setAppointments(response.data[0]);
                setForm({
                    reason: "",
                    email: false,
                    contact: false,
                });
                setDate(new Date());
                setTime(new Date());
                setFieldError({
                    reason: null,
                    mathching: null,
                });
                setLoading(false);
                handleCloseRescheduleModal();
                break;
            case 422:
                setLoading(false);
                setFieldError(response.data.errors);
                break;
        }
    };
    return (
        <Modal
            open={rescheduleModal}
            onClose={handleCloseRescheduleModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Container maxWidth="sm">
                <Fade in={rescheduleModal}>
                    <Card>
                        <CardContent>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                            >
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Typography variant="h4">
                                            Reschedule
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton
                                            onClick={handleCloseRescheduleModal}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                {fieldError.mathching ? (
                                    <Grid item className={classes.grid_item}>
                                        <Typography
                                            color="error"
                                            variant="h6"
                                            className={classes.typography_red}
                                        >
                                            {fieldError.mathching}
                                        </Typography>
                                    </Grid>
                                ) : (
                                    ""
                                )}
                                <Grid item className={classes.grid_item}>
                                    <form
                                        autoComplete="off"
                                        onSubmit={handleOnSubmit}
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
                                                <MuiPickersUtilsProvider
                                                    utils={DateFnsUtils}
                                                >
                                                    <DatePicker
                                                        name="date"
                                                        fullWidth
                                                        onChange={setDate}
                                                        value={date}
                                                        autoOk
                                                        disabled={loading}
                                                        inputVariant="outlined"
                                                        minDate={today}
                                                        orientation="landscape"
                                                        variant="inline"
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </Grid>
                                            <Grid item>
                                                <Grid
                                                    item
                                                    className={
                                                        classes.grid_item
                                                    }
                                                >
                                                    <MuiPickersUtilsProvider
                                                        utils={DateFnsUtils}
                                                    >
                                                        <TimePicker
                                                            name="time"
                                                            fullWidth
                                                            onChange={setTime}
                                                            value={time}
                                                            autoOk
                                                            disabled={loading}
                                                            inputVariant="outlined"
                                                            orientation="landscape"
                                                            variant="inline"
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                </Grid>
                                            </Grid>
                                            <Grid
                                                item
                                                className={classes.grid_item}
                                            >
                                                <TextField
                                                    autoFocus
                                                    id="reason"
                                                    maxRows={8}
                                                    minRows={6}
                                                    multiline
                                                    disabled={loading}
                                                    error={
                                                        fieldError.reason
                                                            ? true
                                                            : false
                                                    }
                                                    fullWidth
                                                    helperText={
                                                        fieldError.reason
                                                            ? fieldError.reason
                                                            : ""
                                                    }
                                                    label="Reason"
                                                    name="reason"
                                                    onChange={handleFormChange}
                                                    value={form.reason}
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
                                                    Reschedule Request
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

export default RescheduleModal;
