import React from "react";
import { Typography, TableCell, TableRow } from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import { format } from "date-fns";
import { CustomButton } from "../../material-ui/styles";


const Webinar = ({ webinar }) => {
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
        </TableRow>
    );
};

export default Webinar;
