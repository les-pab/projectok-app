import React from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { CustomButton } from "../../material-ui/styles";

const GetStarted = ({ useStyles }) => {
    let location = useLocation();
    const classes = useStyles();

    return (
        <div id="get-started" className={classes.get_started}>
            <Container>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography
                            align="center"
                            color="primary"
                            component="h2"
                            variant="h3"
                        >
                            Students from the different colleges and
                            universities in CAR are actively participating
                        </Typography>
                    </Grid>

                    <Grid item className={classes.grid_item}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid item>
                                <Typography color="primary" variant="h6">
                                    Do you need guidance?
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Link
                                    color="secondary"
                                    to={{
                                        pathname: `/student/create`,
                                    }}
                                    className={classes.link}
                                >
                                    <CustomButton
                                        texttransform="none"
                                        radius="32px"
                                    >
                                        Get Started
                                    </CustomButton>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default GetStarted;
