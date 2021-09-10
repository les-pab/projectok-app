import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

const Partner = ({ partner, useStyles }) => {
    const classes = useStyles();

    return (
        <Paper variant="outlined">
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item className={classes.grid_item}>
                    <img
                        src={`./images/${partner.logo}.png`}
                        alt={partner.name}
                        className={classes.partner_logo}
                    />
                </Grid>
                <Grid item className={classes.grid_item}>
                    <Typography variant="h5" color="primary">
                        {partner.name}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Partner;
