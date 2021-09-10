import React, { useState } from "react";
import {
    IconButton,
    Typography,
    TableRow,
    TableCell,
    Link,
} from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import EventIcon from "@material-ui/icons/Event";
import {
    format,
    differenceInMinutes,
    isSameHour,
    isSameMinute,
    getYear,
    getMonth,
    getDate,
    getHours,
    getMinutes,
    getSeconds,
    getMilliseconds,
} from "date-fns";
import { CustomButton } from "../../../material-ui/styles";

export const TodayUpcomingRow = ({
    appointment,
    internetDate,
    handleOnCancel,
    handleOnReschedule,
}) => {
    const date = new Date(appointment.date).toDateString();
    const time = format(new Date(appointment.time), "hh:mm aa");

    return (
        <TableRow>
            <TableCell>
                <Typography variant="h6" color="textPrimary" noWrap>
                    {appointment.counselor.last_name},{" "}
                    {appointment.counselor.first_name}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="h6" color="textPrimary" noWrap>
                    {date}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="h6" color="textPrimary" noWrap>
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
                {appointment.email ? (
                    <Link
                        href={`mailto:${appointment.counselor.email}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Typography variant="h6" color="textPrimary" noWrap>
                            {appointment.counselor.email}
                        </Typography>
                    </Link>
                ) : (
                    ""
                )}
            </TableCell>
            <TableCell>
                {appointment.contact ? (
                    <Typography variant="h6" color="textPrimary">
                        {appointment.counselor.contact}
                    </Typography>
                ) : (
                    ""
                )}
            </TableCell>
            <TableCell>
                {isSameHour(internetDate, date) &&
                isSameMinute(internetDate, date) ? (
                    <Typography variant="h6" color="textPrimary">
                        On Going
                    </Typography>
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
                                getYear(internetDate),
                                getMonth(internetDate),
                                getDate(internetDate),
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
                                getYear(internetDate),
                                getMonth(internetDate),
                                getDate(internetDate),
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
    handleOnCancel,
    handleOnReschedule,
}) => {
    const date = new Date(appointment.date).toDateString();
    const time = format(new Date(appointment.time), "hh:mm aa");

    return (
        <TableRow>
            <TableCell>
                <Typography variant="h6" color="textPrimary">
                    {appointment.counselor.last_name},{" "}
                    {appointment.counselor.first_name}
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
                {appointment.status === "pending" ? (
                    <Typography variant="h6" color="secondary">
                        {appointment.status}
                    </Typography>
                ) : (
                    <Typography variant="h6" color="error">
                        {appointment.status}
                    </Typography>
                )}
            </TableCell>
            <TableCell>
                {appointment.status === "canceled" ? (
                    ""
                ) : (
                    <IconButton
                        color="primary"
                        // disabled={
                        //     differenceInMinutes(
                        //         internetDate,
                        //         new Date(appointment.date)
                        //     ) >= 30
                        //         ? true
                        //         : false
                        // }
                        onClick={() => handleOnCancel(appointment)}
                    >
                        <EventBusyIcon />
                    </IconButton>
                )}
            </TableCell>
            <TableCell>
                {appointment.status === "canceled" ? (
                    ""
                ) : (
                    <IconButton
                        color="primary"
                        // disabled={
                        //     differenceInMinutes(
                        //         internetDate,
                        //         new Date(appointment.date)
                        //     ) >= 30
                        //         ? true
                        //         : false
                        // }
                        onClick={() => handleOnReschedule(appointment)}
                    >
                        <EventIcon />
                    </IconButton>
                )}
            </TableCell>
        </TableRow>
    );
};

export const ArchivedRow = ({ appointment }) => {
    const date = new Date(appointment.date).toDateString();
    const time = format(new Date(appointment.time), "hh:mm aa");

    return (
        <TableRow>
            <TableCell>
                <Typography variant="h6" color="textPrimary">
                    {appointment.counselor.last_name},{" "}
                    {appointment.counselor.first_name}
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
    );
};
