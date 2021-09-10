import React from "react";
import { IconButton, TableRow, TableCell, Typography } from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { CustomButton } from "../../material-ui/styles";
import { format } from "date-fns";

const Webinar = ({ index, webinar, handleOnEdit, onDelete }) => {
    let date = `${new Date(webinar.date).toDateString()}`;
    let time = `${format(new Date(webinar.time), "hh:mm aa")}`;

    return (
        <TableRow key={webinar._id}>
            <TableCell>
                <Typography variant="h6" color="textPrimary">
                    {webinar.title}
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
                <CustomButton
                    href={webinar.link}
                    target="_blank"
                    background="primary"
                    endIcon={<LaunchIcon />}
                >
                    Proceed
                </CustomButton>
            </TableCell>
            <TableCell>
                <IconButton
                    data-key={index}
                    color="primary"
                    onClick={() => handleOnEdit(index)}
                >
                    <EditIcon fontSize="large" />
                </IconButton>
            </TableCell>
            <TableCell>
                <IconButton
                    data-id={webinar._id}
                    color="primary"
                    onClick={onDelete}
                >
                    <DeleteIcon fontSize="large" />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default Webinar;
