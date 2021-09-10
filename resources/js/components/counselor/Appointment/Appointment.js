import React from "react";
import { IconButton, Typography, TableRow, TableCell } from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import EventIcon from "@material-ui/icons/Event";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import {
    format,
    differenceInMinutes,
    isSameHour,
    isSameMinute,
    isAfter,
    getYear,
    getMonth,
    getDate,
    getHours,
    getMinutes,
    getSeconds,
    getMilliseconds,
} from "date-fns";
import { GridRowsProp } from "@mui/x-data-grid";
import { CustomButton } from "../../../material-ui/styles";

export const TodayUpcomingRow = ({
    appointment,
    internetDate,
    handleAddNoteModal,
    handleOnCompleted,
    handleOnCancel,
    handleOnReschedule,
}) => {
    const date = new Date(appointment.date).toDateString();
    const time = format(new Date(appointment.time), "hh:mm aa");

    console.log(appointment);

    return (
        <TableRow>
            <TableCell>
                <Typography variant="h6" color="textPrimary">
                    {appointment.student.last_name},{" "}
                    {appointment.student.first_name}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="h6" color="textPrimary">
                    {date}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="h6" color="textPrimary">
                    {time}
                </Typography>
            </TableCell>
            <TableCell>
                <IconButton
                    href={appointment.link}
                    target="_blank"
                    color="primary"
                >
                    <LaunchIcon />
                </IconButton>
            </TableCell>
            <TableCell>
                {differenceInMinutes(
                    new Date(
                        getYear(new Date(appointment.date)),
                        getMonth(new Date(appointment.date)),
                        getDate(new Date(appointment.date)),
                        getHours(new Date(appointment.time)),
                        getMinutes(new Date(appointment.time)),
                        0,
                        0
                    ),
                    internetDate
                ) <= 30 ? (
                    <IconButton
                        color="primary"
                        onClick={() => handleOnCompleted(appointment)}
                    >
                        <AssignmentTurnedInIcon />
                    </IconButton>
                ) : (
                    ""
                )}
            </TableCell>
            <TableCell>
                <IconButton
                    color="primary"
                    disabled={
                        differenceInMinutes(
                            new Date(
                                getYear(new Date(appointment.date)),
                                getMonth(new Date(appointment.date)),
                                getDate(new Date(appointment.date)),
                                getHours(new Date(appointment.time)),
                                getMinutes(new Date(appointment.time)),
                                0,
                                0
                            ),
                            internetDate
                        ) >= 0
                            ? true
                            : false
                    }
                    onClick={() => handleAddNoteModal(appointment)}
                >
                    <PostAddIcon />
                </IconButton>
            </TableCell>
            <TableCell>
                <IconButton
                    color="primary"
                    disabled={
                        differenceInMinutes(
                            new Date(
                                getYear(new Date(appointment.date)),
                                getMonth(new Date(appointment.date)),
                                getDate(new Date(appointment.date)),
                                getHours(new Date(appointment.time)),
                                getMinutes(new Date(appointment.time)),
                                0,
                                0
                            ),
                            internetDate
                        ) <= 30
                            ? true
                            : false
                    }
                    onClick={() => handleOnCancel(appointment)}
                >
                    <EventBusyIcon />
                </IconButton>
            </TableCell>
            <TableCell>
                <IconButton
                    color="primary"
                    disabled={
                        differenceInMinutes(
                            new Date(
                                getYear(new Date(appointment.date)),
                                getMonth(new Date(appointment.date)),
                                getDate(new Date(appointment.date)),
                                getHours(new Date(appointment.time)),
                                getMinutes(new Date(appointment.time)),
                                0,
                                0
                            ),
                            internetDate
                        ) <= 30
                            ? true
                            : false
                    }
                    onClick={() => handleOnReschedule(appointment)}
                >
                    <EventIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export const RequestRow = ({
    appointment,
    handleOnAccept,
    handleOnCancel,
    handleOnReschedule,
}) => {
    const date = new Date(appointment.date).toDateString();
    const time = format(new Date(appointment.time), "hh:mm aa");

    return (
        <TableRow>
            <TableCell>
                <Typography variant="h6" color="textPrimary">
                    {appointment.student.last_name},{" "}
                    {appointment.student.first_name}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="h6" color="textPrimary">
                    {date}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="h6" color="textPrimary">
                    {time}
                </Typography>
            </TableCell>
            <TableCell>
                <IconButton
                    color="primary"
                    onClick={() => handleOnAccept(appointment)}
                >
                    <EventAvailableIcon />
                </IconButton>
            </TableCell>
            <TableCell>
                <IconButton
                    color="primary"
                    onClick={() => handleOnCancel(appointment)}
                >
                    <EventBusyIcon />
                </IconButton>
            </TableCell>
            <TableCell>
                <IconButton
                    color="primary"
                    onClick={() => handleOnReschedule(appointment)}
                >
                    <EventIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export const ArchivedRow = ({ appointment, handleViewNoteModal }) => {
    const date = new Date(appointment.date).toDateString();
    const time = format(new Date(appointment.time), "hh:mm aa");

    return (
        <>
            <TableRow hover onClick={() => handleViewNoteModal(appointment)}>
                <TableCell>
                    <Typography variant="h6" color="textPrimary">
                        {appointment.student.last_name},{" "}
                        {appointment.student.first_name}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="h6" color="textPrimary">
                        {date}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="h6" color="textPrimary">
                        {time}
                    </Typography>
                </TableCell>
                <TableCell>
                    {appointment.status === "completed" ? (
                        <Typography variant="h6" color="primary">
                            {appointment.status}
                        </Typography>
                    ) : (
                        <Typography variant="h6" color="error">
                            {appointment.status}
                        </Typography>
                    )}
                </TableCell>
            </TableRow>
        </>
    );
};
