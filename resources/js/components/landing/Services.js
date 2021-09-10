import React from "react";
import {
    Grid,
    Card,
    CardContent,
    Container,
    Typography,
} from "@material-ui/core";
import { Forum, PeopleAlt, MenuBook } from "@material-ui/icons";
const Services = ({ useStyles }) => {
    const classes = useStyles();

    return (
        <div id="services" className={classes.services}>
            <Container>
                <Grid container direction="column" alignItems="center">
                    <Grid item>
                        <Typography color="secondary" variant="h2">
                            Services
                        </Typography>
                    </Grid>
                    <Grid item className={classes.grid_item}>
                        <Typography variant="h5">
                            These services were created with the concern for
                            students in mind
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            {/* <Grid
                                item
                                xs={12}
                                md={4}
                                lg={4}
                                className={classes.grid_item}
                            >
                                <Card className={classes.card_forums}>
                                    <CardContent>
                                        <Grid
                                            container
                                            direction="column"
                                            justifyContent="center"
                                            alignItems="center"
                                            spacing={4}
                                        >
                                            <Grid item>
                                                <Forum
                                                    className={classes.logo}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="h5">
                                                    Forums
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="h6">
                                                    A space to ask questions,
                                                    share experiences and
                                                    support each other.
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid> */}
                            <Grid
                                item
                                item
                                xs={12}
                                md={4}
                                lg={4}
                                className={classes.grid_item}
                            >
                                <Card className={classes.card_private_session}>
                                    <CardContent>
                                        <Grid
                                            container
                                            direction="column"
                                            justifyContent="center"
                                            alignItems="center"
                                            spacing={4}
                                        >
                                            <Grid item>
                                                <PeopleAlt
                                                    className={classes.logo}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="h5">
                                                    Private Session
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="h6">
                                                    A safe, compassionate and
                                                    confidential setting to get
                                                    professional care.
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid
                                item
                                item
                                xs={12}
                                md={4}
                                lg={4}
                                className={classes.grid_item}
                            >
                                <Card id="diary" className={classes.card_diary}>
                                    <CardContent>
                                        <Grid
                                            container
                                            direction="column"
                                            justifyContent="center"
                                            alignItems="center"
                                            spacing={4}
                                        >
                                            <Grid item>
                                                <MenuBook
                                                    className={classes.logo}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="h5">
                                                    Diary
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="h6">
                                                    It's simply writing down
                                                    your thoughts and feelings
                                                    to understand them more
                                                    clearly.
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Services;
