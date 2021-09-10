import React from "react";
import { Grid, Container, Typography } from "@material-ui/core";

const About = ({ useStyles }) => {
    const classes = useStyles();

    return (
        <div id="about" className={classes.about}>
            <Container>
                <Grid container direction="column" alignItems="center">
                    <Grid item lg={12}>
                        <Typography
                            color="primary"
                            variant="h2"
                            className={classes.about_text}
                        >
                            What is
                        </Typography>
                    </Grid>
                    <Grid item lg={12} className={classes.grid_item}>
                        <Typography color="primary" component="p" variant="h5">
                            The Commission on Higher Education – Cordillera
                            Administrative Region (CHED – CAR) together with
                            colleges and universities in CAR created
                            <Typography
                                color="secondary"
                                component="span"
                                variant="h5"
                            >
                                &ensp; Project OK: Online Kumustahan &ensp;
                            </Typography>
                            to provide students with a venue to communicate
                            concerns amidst the pandemic and find support from
                            the colleges, universities, and private and public
                            partner institutions.
                        </Typography>
                    </Grid>
                    <Grid item lg={12} className={classes.grid_item}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={8}
                        >
                            <Grid item>
                                <img
                                    src="./images/projectok_logo.svg"
                                    alt="Project-OK Logo"
                                    className={classes.about_images}
                                />
                            </Grid>
                            <Grid item>
                                <img
                                    src="./images/ched_logo.png"
                                    alt="CHED Logo"
                                    className={classes.about_images}
                                />
                            </Grid>
                            <Grid item>
                                <img
                                    src="./images/car_logo.png"
                                    alt="CAR Logo"
                                    className={classes.about_images}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default About;
