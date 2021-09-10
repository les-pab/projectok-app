import React from "react";
import { Typography, IconButton, TableCell, TableRow } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { max, min, format } from "date-fns";

const Available = ({ availability, onDelete }) => {
    let date;
    if (
        typeof availability.date === "object" &&
        availability.date.constructor === Object
    ) {
        date = `${new Date(availability.date.from).toDateString()} - ${new Date(
            availability.date.to
        ).toDateString()}`;
    } else {
        date = new Date(availability.date).toDateString();
    }

    let timeItmes = [];

    availability.time.map((row, index) => {
        let times = [];

        row.map((time) => {
            times.push(new Date(time));
        });

        timeItmes.push(
            `${format(min(times), "hh:mm aa")} - ${format(max(times), "hh:mm aa")}`
        );
    });

    return (
        <TableRow>
            <TableCell>
                <Typography variant="h6" color="textPrimary">
                    {date}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="h6" color="textPrimary">
                    {timeItmes.toString()}
                </Typography>
            </TableCell>
            <TableCell>
                <IconButton
                    data-key={availability._id}
                    color="primary"
                    onClick={onDelete}
                >
                    <DeleteIcon fontSize="large" />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default Available;
