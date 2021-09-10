import React, { useState } from "react";
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
import { Close } from "@material-ui/icons";
import { useHistory } from "react-router";
import { CustomButton } from "../../../../material-ui/styles";
import DateFnsUtils from "@date-io/date-fns";
import { max, min, format } from "date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { storeAppointment } from "../../Service";

const CustomTab = withStyles(() => ({
    root: {
        borderTop: "1px solid gray",
        borderBottom: "1px solid gray",
        marginTop: "4px",
        marginBottom: "4px",
        textTransform: "none",
    },
    wrapper: {
        alignItems: "flex-start",
    },
}))((props) => <Tab disableRipple {...props} />);

const CounselorPanel = ({
    useStyles,
    setCounselors,
    setAppointments,
    value,
    index,
    _id,
    counselor,
    handleCounselorModal,
}) => {
    const classes = useStyles();

    const history = useHistory();

    let availability_id;
    let schedule = [];
    let dates = [];
    let slots = [];
    counselor.availability.map((available) => {
        availability_id = available._id;

        available.slot.map((slot) => {
            slots.push(slot);
        });

        let date;
        if (
            typeof available.date === "object" &&
            available.date.constructor === Object
        ) {
            date = `${new Date(
                available.date.from
            ).toDateString()} - ${new Date(available.date.to).toDateString()}`;

            dates.push(new Date(available.date.from));
            dates.push(new Date(available.date.to));
        } else {
            date = new Date(available.date).toDateString();

            dates.push(new Date(available.date));
        }

        let timeItems = [];
        available.time.map((row) => {
            let times = [];

            row.map((time) => {
                times.push(new Date(time));
            });

            timeItems.push(
                `${format(min(times), "hh:mm aa")} - ${format(
                    max(times),
                    "hh:mm aa"
                )}`
            );
        });

        schedule.push(
            <Grid
                item
                container
                direction="column"
                wrap="nowrap"
                className={classes.grid_item}
            >
                <Grid item>
                    <Typography color="primary" variant="h5">
                        {date}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h5">{timeItems.toString()}</Typography>
                </Grid>
                <Grid item className={classes.grid_item}>
                    <Divider />
                </Grid>
            </Grid>
        );
    });

    let maxDate = max(dates);
    let minDate = min(dates);
    const [date, setDate] = useState(new Date());

    const [timeSlots, setTimeSlots] = useState(
        slots.filter(
            (slot) =>
                `${format(new Date(slot.date), "MM/dd/yyyy")}` ===
                `${format(new Date(date), "MM/dd/yyyy")}`
        )
    );

    const handleDateChange = (value) => {
        setDate(new Date(value));
        setTimeSlots(
            slots.filter(
                (slot) =>
                    `${format(new Date(slot.date), "MM/dd/yyyy")}` ===
                    `${format(new Date(value), "MM/dd/yyyy")}`
            )
        );
    };
    let slotItems = [];
    if (timeSlots.length > 0) {
        timeSlots.map((slot, index) => {
            if (slot.available) {
                let item = (
                    <MenuItem key={index} data-id={slot._id} value={slot.time}>
                        {`${format(new Date(slot.time), "hh:mm aa")}`}
                    </MenuItem>
                );
                slotItems.push(item);
            }
        });
    }

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        slot_id: "",
        time: "",
    });
    const handleSelectSlotChange = (e) => {
        const { id } = e.currentTarget.dataset;
        setForm({
            ...form,
            slot_id: id,
            time: e.target.value,
        });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        let formData = {
            student_id: _id,
            availability_id: availability_id,
            counselor_id: counselor._id,
            slot_id: form.slot_id,
            date: date,
            time: form.time,
        };

        const response = await storeAppointment(formData);
        switch (response.status) {
            case 200:
                setAppointments(response.data[0]);
                setCounselors(response.data[1]);
                setLoading(false);
                handleCounselorModal();
                break;
            case 422:
                break;
            default:
                break;
        }
    };

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            {value === index && (
                <Grid
                    container
                    direction="row"
                    wrap="nowrap"
                    spacing={1}
                    className={classes.counselor}
                >
                    <Grid item container direction="column">
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
                                    {counselor.first_name}{" "}
                                    {counselor.middle_name}{" "}
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
                                <Typography variant="h5">
                                    PERSONAL INFORMATION
                                </Typography>
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
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Divider orientation="vertical" />
                    </Grid>

                    {counselor.availability.length <= 0 ? (
                        <Grid item>
                            <Typography variant="h4">
                                No available schedule.
                            </Typography>
                        </Grid>
                    ) : (
                        <Grid item container direction="column">
                            <Grid
                                item
                                container
                                direction="column"
                                justifyContent="flex-start"
                            >
                                <Grid item className={classes.grid_item}>
                                    <Typography
                                        variant="h5"
                                        color="primary"
                                        className={classes.typography_green}
                                    >
                                        Schedule
                                    </Typography>
                                </Grid>
                                {schedule}
                            </Grid>

                            <Grid item container direction="column">
                                <Grid item>
                                    <Typography
                                        variant="h5"
                                        color="primary"
                                        className={classes.typography_green}
                                    >
                                        Set an appointment
                                    </Typography>
                                </Grid>
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
                                                <MuiPickersUtilsProvider
                                                    utils={DateFnsUtils}
                                                >
                                                    <DatePicker
                                                        onChange={(value) =>
                                                            handleDateChange(
                                                                value
                                                            )
                                                        }
                                                        value={date}
                                                        autoOk
                                                        disabled={loading}
                                                        inputVariant="outlined"
                                                        maxDate={maxDate}
                                                        minDate={minDate}
                                                        orientation="landscape"
                                                        variant="inline"
                                                        fullWidth
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </Grid>
                                            <Grid item>
                                                <FormControl
                                                    id="slot"
                                                    fullWidth
                                                    variant="outlined"
                                                >
                                                    <InputLabel id="select-label">
                                                        Slot
                                                    </InputLabel>
                                                    <Select
                                                        labelId="select-label"
                                                        id="slot"
                                                        label="Slot"
                                                        name="slot"
                                                        onChange={
                                                            handleSelectSlotChange
                                                        }
                                                        value={form.time}
                                                        fullWidth
                                                        disabled={
                                                            slotItems.length >
                                                                0 || loading
                                                                ? false
                                                                : true
                                                        }
                                                    >
                                                        {slotItems}
                                                    </Select>
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
                                                    texttransform="initial"
                                                    fullWidth
                                                >
                                                    Set appointment
                                                </CustomButton>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            )}
        </Box>
    );
};

const CounselorModal = ({
    useStyles,
    setCounselors,
    setAppointments,
    counselorModal,
    handleCounselorModal,
    _id,
    counselors,
}) => {
    const classes = useStyles();

    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (e, value) => {
        setTabValue(value);
    };

    let tabs = [];
    let panels = [];
    counselors.map((counselor, index) => {
        tabs.push(
            <CustomTab
                key={index}
                value={index}
                label={
                    <Typography
                        align="left"
                        variant="h5"
                    >{`${counselor.first_name} ${counselor.last_name}`}</Typography>
                }
            />
        );
        panels.push(
            <CounselorPanel
                key={index}
                useStyles={useStyles}
                setCounselors={setCounselors}
                setAppointments={setAppointments}
                value={tabValue}
                index={index}
                _id={_id}
                counselor={counselor}
                handleCounselorModal={handleCounselorModal}
            />
        );
    });

    return (
        <Modal
            open={counselorModal}
            onClose={handleCounselorModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Container>
                <Fade in={counselorModal}>
                    <Card>
                        <CardContent>
                            <Box
                                display="flex"
                                className={classes.counselor_card}
                            >
                                <Tabs
                                    orientation="vertical"
                                    value={tabValue}
                                    onChange={handleTabChange}
                                    variant="scrollable"
                                    scrollButtons="on"
                                >
                                    {tabs}
                                </Tabs>
                                {panels}
                            </Box>
                        </CardContent>
                    </Card>
                </Fade>
            </Container>
        </Modal>
    );
};

export default CounselorModal;
