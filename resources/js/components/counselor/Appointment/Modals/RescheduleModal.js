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
    counselor,
    rescheduleModal,
    handleCloseRescheduleModal,
}) => {
    const classes = useStyles();

    const today = new Date();

    const [form, setForm] = useState({
        reason: "",
        link: "",
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
        link: null,
        existing: null,
    });

    const [loading, setLoading] = useState(false);
    const handleOnSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        let formData = {
            counselor_id: counselor._id,
            appointment_id: selectedAppointment._id,
            slot_id: selectedAppointment.slot_id,
            date: date,
            time: time,
            reason: form.reason,
            link: form.link,
            email: form.email,
            contact: form.contact,
            type: "reschedule",
        };

        const response = await updateAppointment(formData);
        switch (response.status) {
            case 200:
                setAppointments(response.data[0]);
                setForm({
                    reason: "",
                    link: "",
                    email: false,
                    contact: false,
                });
                setDate(new Date());
                setTime(new Date());
                setFieldError({
                    reason: null,
                    link: null,
                    existing: null,
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
                                {fieldError.existing ? (
                                    <Grid item className={classes.grid_item}>
                                        <Typography
                                            color="error"
                                            variant="h6"
                                            className={classes.typography_red}
                                        >
                                            {fieldError.existing}
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
                                                        autoFocus
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
                                                <TextField
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
                                                <FormControl component="fieldset">
                                                    <FormGroup>
                                                        <FormControlLabel
                                                            control={
                                                                <Switch
                                                                    color="primary"
                                                                    disabled={
                                                                        counselor
                                                                            .email
                                                                            .length >
                                                                        0
                                                                            ? false
                                                                            : true
                                                                    }
                                                                    checked={
                                                                        form.email
                                                                    }
                                                                    onChange={
                                                                        handleSliderCheck
                                                                    }
                                                                    name="email"
                                                                />
                                                            }
                                                            label="Share email address"
                                                        />
                                                        <FormControlLabel
                                                            control={
                                                                <Switch
                                                                    color="primary"
                                                                    disabled={
                                                                        counselor
                                                                            .contact
                                                                            .length >
                                                                        0
                                                                            ? false
                                                                            : true
                                                                    }
                                                                    checked={
                                                                        form.contact
                                                                    }
                                                                    onChange={
                                                                        handleSliderCheck
                                                                    }
                                                                    name="contact"
                                                                />
                                                            }
                                                            label="Share phone/contact number"
                                                        />
                                                    </FormGroup>
                                                </FormControl>
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
