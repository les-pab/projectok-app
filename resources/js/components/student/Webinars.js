import React, { useState, useEffect } from "react";
import {
    Container,
    Grid,
    Paper,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    LinearProgress,
} from "@material-ui/core";
import { fetchWebinars } from "./Service";
import Webinar from "./Webinar";

const Webinars = ({ useStyles }) => {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);

    const [webinars, setWebinars] = useState([]);
    useEffect(() => {
        setLoading(true);

        const getWebinars = async () => {
            const response = await fetchWebinars();
            switch (response.status) {
                case 200:
                    setWebinars(response.data[0]);
                    setLoading(false);
                    break;
            }
        };

        getWebinars();
    }, []);

    return (
        <>
            <Container>
                <Card raised={true} className={classes.card}>
                    <CardContent>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography color="primary" variant="h4">
                                    Webinars
                                </Typography>
                            </Grid>
                            {loading ? (
                                <Grid item className={classes.grid_item}>
                                    <LinearProgress />
                                </Grid>
                            ) : (
                                ""
                            )}
                            <Grid item className={classes.grid_item}>
                                {webinars.length > 0 ? (
                                    <TableContainer component={Paper}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell
                                                        align="left"
                                                        variant="head"
                                                    >
                                                        <Typography
                                                            color="primary"
                                                            variant="h5"
                                                        >
                                                            Title
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        variant="head"
                                                    >
                                                        <Typography
                                                            color="primary"
                                                            variant="h5"
                                                        >
                                                            Date
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        variant="head"
                                                    >
                                                        <Typography
                                                            color="primary"
                                                            variant="h5"
                                                        >
                                                            Time
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        variant="head"
                                                    >
                                                        <Typography
                                                            color="primary"
                                                            variant="h5"
                                                        >
                                                            Link
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {webinars.map((webinar) => (
                                                    <Webinar
                                                        key={webinar._id}
                                                        webinar={webinar}
                                                    />
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                ) : (
                                    <Paper
                                        square
                                        elavation={0}
                                        className={classes.paper}
                                    >
                                        <Typography
                                            variant="h5"
                                            className={classes.paper_typography}
                                            color="textPrimary"
                                        >
                                            No webinars for today.
                                        </Typography>
                                    </Paper>
                                )}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
};

export default Webinars;
