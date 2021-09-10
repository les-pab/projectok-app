import React, { useState, useEffect } from "react";
import {
    Container,
    Grid,
    Paper,
    Card,
    CardContent,
    Typography,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Modal,
    Checkbox,
    Backdrop,
    Fade,
    FormControlLabel,
    LinearProgress,
} from "@material-ui/core";
import { CustomButton } from "../../material-ui/styles";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import CloseIcon from "@material-ui/icons/Close";
import DateFnsUtils from "@date-io/date-fns";
import {
    format,
    eachDayOfInterval,
    eachHourOfInterval,
    getHours,
} from "date-fns";
import {
    DatePicker,
    TimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import {
    fetchAvailability,
    addAvailability,
    removeAvailability,
} from "./Service";
import Available from "./Available";

const TimeItem = ({
    index,
    useStyles,
    handleReduceTimeItemCount,
    fromTime,
    handleFromTimeChange,
    toTime,
    handleToTimeChange,
    loading,
}) => {
    const classes = useStyles();

    return (
        <Grid
            item
            container
            justifyContent="space-between"
            alignItems="center"
            direction="row"
            wrap="nowrap"
            className={classes.grid_item}
        >
            <Grid
                item
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                wrap="nowrap"
                spacing={1}
            >
                <Grid item>
                    <Typography component="span" variant="h5">
                        From:
                    </Typography>
                </Grid>
                <Grid item>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker
                            onChange={(newTime) =>
                                handleFromTimeChange(index, newTime)
                            }
                            value={fromTime[index]}
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
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
                wrap="nowrap"
            >
                <Grid item>
                    <Typography component="span" variant="h5">
                        To:
                    </Typography>
                </Grid>
                <Grid item>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker
                            onChange={(newTime) =>
                                handleToTimeChange(index, newTime)
                            }
                            value={toTime[index]}
                            autoOk
                            disabled={loading}
                            inputVariant="outlined"
                            orientation="landscape"
                            variant="inline"
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>
            {index > 0 ? (
                <Grid item>
                    <IconButton
                        color="primary"
                        onClick={() => handleReduceTimeItemCount(index)}
                    >
                        <CloseIcon fontSize="large" />
                    </IconButton>
                </Grid>
            ) : (
                ""
            )}
        </Grid>
    );
};

const AddAvailabilityModal = ({
    useStyles,
    modalState,
    hanldeAddAvailabilityClose,
    error,
    loading,
    timeItemCountError,
    timeItemCount,
    handleAddTimeItemCount,
    handleReduceTimeItemCount,
    range,
    handleDateRange,
    date,
    setDate,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    fromTime,
    handleFromTimeChange,
    toTime,
    handleToTimeChange,
    handleOnSubmit,
}) => {
    const classes = useStyles();

    let timeItems = [];
    for (let count = 0; count < timeItemCount; count++) {
        let item = (
            <TimeItem
                key={count}
                index={count}
                useStyles={useStyles}
                handleReduceTimeItemCount={handleReduceTimeItemCount}
                fromTime={fromTime}
                handleFromTimeChange={handleFromTimeChange}
                toTime={toTime}
                handleToTimeChange={handleToTimeChange}
                loading={loading}
            />
        );

        timeItems.push(item);
    }

    return (
        <Modal
            open={modalState}
            onClose={hanldeAddAvailabilityClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Container maxWidth="md">
                <Fade in={modalState}>
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
                                            Add a schedule
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton
                                            color="primary"
                                            disabled={loading}
                                            onClick={hanldeAddAvailabilityClose}
                                        >
                                            <CloseIcon fontSize="large" />
                                        </IconButton>
                                    </Grid>
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

                                {error ? (
                                    <Grid
                                        item
                                        xs={12}
                                        md={12}
                                        lg={12}
                                        className={classes.grid_item}
                                    >
                                        <Typography color="error" variant="h5">
                                            Please re-check your selected date
                                            or time interval.
                                        </Typography>
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
                                                container
                                                justifyContent="space-between"
                                                alignItems="center"
                                                direction="row"
                                                wrap="nowrap"
                                                className={classes.grid_item}
                                            >
                                                {range ? (
                                                    <>
                                                        <Grid
                                                            item
                                                            container
                                                            direction="row"
                                                            justifyContent="flex-start"
                                                            alignItems="center"
                                                            wrap="nowrap"
                                                            spacing={1}
                                                        >
                                                            <Grid item>
                                                                <Typography
                                                                    component="span"
                                                                    variant="h5"
                                                                >
                                                                    From:
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <MuiPickersUtilsProvider
                                                                    utils={
                                                                        DateFnsUtils
                                                                    }
                                                                >
                                                                    <DatePicker
                                                                        onChange={
                                                                            setFromDate
                                                                        }
                                                                        value={
                                                                            fromDate
                                                                        }
                                                                        autoOk
                                                                        disabled={
                                                                            loading
                                                                        }
                                                                        inputVariant="outlined"
                                                                        orientation="landscape"
                                                                        variant="inline"
                                                                    />
                                                                </MuiPickersUtilsProvider>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            container
                                                            direction="row"
                                                            justifyContent="flex-start"
                                                            alignItems="center"
                                                            spacing={1}
                                                            wrap="nowrap"
                                                        >
                                                            <Grid item>
                                                                <Typography
                                                                    component="span"
                                                                    variant="h5"
                                                                >
                                                                    To:
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <MuiPickersUtilsProvider
                                                                    utils={
                                                                        DateFnsUtils
                                                                    }
                                                                >
                                                                    <DatePicker
                                                                        onChange={
                                                                            setToDate
                                                                        }
                                                                        value={
                                                                            toDate
                                                                        }
                                                                        autoOk
                                                                        disabled={
                                                                            loading
                                                                        }
                                                                        inputVariant="outlined"
                                                                        minDate={
                                                                            fromDate
                                                                        }
                                                                        orientation="landscape"
                                                                        variant="inline"
                                                                    />
                                                                </MuiPickersUtilsProvider>
                                                            </Grid>
                                                        </Grid>
                                                    </>
                                                ) : (
                                                    <Grid
                                                        item
                                                        container
                                                        direction="row"
                                                        justifyContent="flex-start"
                                                        alignItems="center"
                                                        wrap="nowrap"
                                                        spacing={1}
                                                    >
                                                        <Grid item>
                                                            <Typography
                                                                component="span"
                                                                variant="h5"
                                                            >
                                                                Set date:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <MuiPickersUtilsProvider
                                                                utils={
                                                                    DateFnsUtils
                                                                }
                                                            >
                                                                <DatePicker
                                                                    onChange={
                                                                        setDate
                                                                    }
                                                                    value={date}
                                                                    autoOk
                                                                    disabled={
                                                                        loading
                                                                    }
                                                                    inputVariant="outlined"
                                                                    orientation="landscape"
                                                                    variant="inline"
                                                                />
                                                            </MuiPickersUtilsProvider>
                                                        </Grid>
                                                    </Grid>
                                                )}
                                            </Grid>
                                            <Grid item>
                                                <Button
                                                    color="primary"
                                                    disabled={loading}
                                                    variant="outlined"
                                                    onClick={handleDateRange}
                                                >
                                                    {range ? (
                                                        <>Set a date</>
                                                    ) : (
                                                        <>Set date range</>
                                                    )}
                                                </Button>
                                            </Grid>

                                            <Grid
                                                item
                                                container
                                                direction="column"
                                                className={classes.grid_item}
                                            >
                                                {timeItems}
                                            </Grid>
                                            {timeItemCount != 4 ? (
                                                <Grid item>
                                                    <Button
                                                        color="primary"
                                                        disabled={loading}
                                                        variant="outlined"
                                                        onClick={
                                                            handleAddTimeItemCount
                                                        }
                                                    >
                                                        Add another time
                                                        selection
                                                    </Button>
                                                </Grid>
                                            ) : (
                                                ""
                                            )}
                                            <Grid
                                                item
                                                className={classes.grid_item}
                                            >
                                                <CustomButton
                                                    type="submit"
                                                    disabled={loading}
                                                    fullWidth
                                                    background="primary"
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

const Availability = ({ _id, useStyles }) => {
    const classes = useStyles();

    const [availability, setAvailability] = useState([]);
    useEffect(() => {
        const getAvailability = async () => {
            const response = await fetchAvailability(_id);
            switch (response.status) {
                case 200:
                    setAvailability(response.data[0]);
                    break;
            }
        };

        getAvailability();
    }, []);

    const onDelete = async (e) => {
        const _id = e.currentTarget.getAttribute("data-key");
        const response = await removeAvailability(_id);
        switch (response.status) {
            case 200:
                setAvailability(
                    availability.filter(
                        (availability) => availability._id !== _id
                    )
                );
                break;
        }
    };

    const [modalState, setModalState] = useState(false);
    const hanldeAddAvailabilityOpen = () => {
        setModalState(true);
    };
    const hanldeAddAvailabilityClose = () => {
        setLoading(false);
        setError(false);
        setDate(new Date());
        setFromDate(new Date());
        setToDate(new Date());
        setFromTime([new Date()]);
        setToTime([new Date()]);
        setTimeItemCount(1);
        setModalState(false);
    };

    const [range, setRange] = useState(true);
    const handleDateRange = () => {
        setRange(!range);
    };

    const [date, setDate] = useState(new Date());
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [fromTime, setFromTime] = useState([new Date()]);
    const handleFromTimeChange = (index, newTime) => {
        let copy = [...fromTime];
        copy[index] = newTime;
        setFromTime(copy);
    };
    const [toTime, setToTime] = useState([new Date()]);
    const handleToTimeChange = (index, newTime) => {
        let copy = [...toTime];
        copy[index] = newTime;
        setToTime(copy);
    };
    const [timeItemCountError, setTimeItemCountError] = useState(false);
    const [timeItemCount, setTimeItemCount] = useState(1);
    const handleAddTimeItemCount = () => {
        if (timeItemCount <= 4) {
            setTimeItemCount(timeItemCount + 1);
            setFromTime([...fromTime, new Date()]);
            setToTime([...toTime, new Date()]);
        } else {
            setTimeItemCountError(true);
        }
    };
    const handleReduceTimeItemCount = (index) => {
        let copyFrom = [...fromTime];
        let copyTo = [...toTime];
        copyFrom.splice(index, 1);
        copyTo.splice(index, 1);
        setFromTime(copyFrom);
        setToTime(copyTo);
        setTimeItemCount(timeItemCount - 1);
        setTimeItemCountError(false);
    };
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        setLoading(true);

        let dateInterval;
        try {
            dateInterval = eachDayOfInterval({
                start: fromDate,
                end: toDate,
            });
        } catch (error) {
            setError(true);
            setLoading(false);
        }

        let timeRows = [];
        let timeInterval;
        for (let count = 0; count < timeItemCount; count++) {
            try {
                timeInterval = eachHourOfInterval({
                    start: fromTime[count],
                    end: toTime[count],
                });

                timeRows.push(timeInterval);

                // timeInterval.map((time) => {
                //     if (time.getHours() != 12 && time.getHours() != 0) {
                // timeRows.push(time);
                //     }
                // });
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }

        let slots = [];
        let slot;
        dateInterval.map((date) => {
            if (date.getDay() != 0) {
                timeRows.map((row) => {
                    row.map((time) => {
                        slot = {
                            date: date,
                            time: time,
                            available: true,
                        };
                        slots.push(slot);
                    });
                });
            }
        });

        let dateForm;
        if (range) {
            dateForm = {
                from: fromDate,
                to: toDate,
            };
        } else {
            dateForm = date;
        }

        const form = {
            counselor_id: _id,
            date: dateForm,
            time: timeRows,
            slots: slots,
        };

        if (!error) {
            const response = await addAvailability(form);
            switch (response.status) {
                case 200:
                    setAvailability(response.data[0]);
                    hanldeAddAvailabilityClose();
                    break;
                case 422:
                    setLoading(false);
                    setError(true);
                    break;
            }
        }
    };

    return (
        <>
            <Container>
                <Card raised={true}>
                    <CardContent>
                        <Grid container direction="column">
                            <Grid
                                container
                                item
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                wrap="nowrap"
                                className={classes.grid_container}
                            >
                                <Grid item>
                                    <Typography color="primary" variant="h4">
                                        Availability
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <IconButton
                                        color="primary"
                                        onClick={hanldeAddAvailabilityOpen}
                                    >
                                        <AddCircleOutlineOutlinedIcon fontSize="large" />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid item>
                                {availability.length > 0 ? (
                                    <TableContainer>
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
                                                    <TableCell>""</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {availability.map(
                                                    (availability) => (
                                                        <Available
                                                            key={
                                                                availability._id
                                                            }
                                                            availability={
                                                                availability
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
                                            It looks like you haven't set your
                                            schedule yet, set one by clicking
                                            the plus icon.
                                        </Typography>
                                    </Paper>
                                )}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>

            <AddAvailabilityModal
                useStyles={useStyles}
                modalState={modalState}
                hanldeAddAvailabilityClose={hanldeAddAvailabilityClose}
                error={error}
                loading={loading}
                timeItemCountError={timeItemCountError}
                timeItemCount={timeItemCount}
                handleAddTimeItemCount={handleAddTimeItemCount}
                handleReduceTimeItemCount={handleReduceTimeItemCount}
                range={range}
                handleDateRange={handleDateRange}
                date={date}
                setDate={setDate}
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
                fromTime={fromTime}
                handleFromTimeChange={handleFromTimeChange}
                toTime={toTime}
                handleToTimeChange={handleToTimeChange}
                handleOnSubmit={handleOnSubmit}
            />
        </>
    );
};

export default Availability;
