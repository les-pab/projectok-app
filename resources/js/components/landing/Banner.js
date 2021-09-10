import React from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import { CustomButton } from "../../material-ui/styles";
import { Phone } from "@material-ui/icons";

const Banner = ({ useStyles }) => {
    const classes = useStyles();

    return (
        <div id="banner" className={classes.banner}>
            <Container>
                <Grid container direction="column" alignItems="flex-start">
                    <Grid
                        className={classes.grid_item}
                        container
                        item
                        direction="column"
                    >
                        <Grid item>
                            <Typography variant="h2">Kumusta ka?</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h2">Kumusta na?</Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        className={classes.grid_item}
                        container
                        item
                        direction="column"
                    >
                        <Grid item>
                            <Typography component="span" variant="h5">
                                Feel free to express yourself.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography component="span" variant="h5">
                                Talk to us
                            </Typography>
                        </Grid>
                    </Grid>
                    {/* <Grid
                        className={classes.grid_item}
                        container
                        item
                        direction="column"
                    >
                        <Grid item>
                            <Typography component="span" variant="h6">
                                Do you need immediate consultation?
                            </Typography>
                        </Grid>
                        <Grid item>
                            <CustomButton
                                startIcon={<Phone />}
                                texttransform="none"
                                radius="32px"
                            >
                                I need help now!
                            </CustomButton>
                        </Grid>
                    </Grid> */}
                </Grid>
            </Container>
        </div>
    );
};

export default Banner;
