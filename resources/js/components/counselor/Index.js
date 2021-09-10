import React from "react";
import {
    Box,
    Container,
    Button,
    Grid,
    Card,
    CardContent,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Availability from "./Availability";
// import Appointments from "./Appointments";
import Webinars from "./Webinars";

const useStyles = makeStyles((theme) => ({
    link_route: {
        color: theme.palette.primary.dark,
        "&:hover": {
            textDecoration: "none",
            color: theme.palette.primary.dark,
        },
    },
    container: {
        paddingTop: "1%",
        paddingBottom: "1%",
    },
    banner: {
        backgroundImage: `url(./images/counsellor_bg.png)`,
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
        padding: "8% 0",
    },
    welcome: {
        display: "block",
        "&:before": {
            content: "'Hello, '",
            display: "block",
            whiteSpace: "pre",
        },
    },
    date: {
        textAlign: "center",
        padding: 8,
        margin: "16px 0",
        borderTop: "2px solid",
        borderBottom: "2px solid",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    grid_container: {
        padding: "16px 16px 8px 16px",
    },
    grid_item: {
        padding: "8px 0",
    },
    card: {
        margin: "32px 0",
    },
    card_content: {
        padding: 0,
    },
    paper: {
        backgroundColor: theme.palette.common.grey,
    },
    paper_typography: {
        textAlign: "center",
        padding: 32,
    },
    label: {
        margin: 0,
    },
    table_selector: {
        borderBottom: "4px solid #fafbfc",
        "&:focus": {
            borderBottom: "4px solid #e9d700",
        },
    },
}));

const Index = ({ _id, counselor, today }) => {
    const classes = useStyles();

    return (
        <>
            <div id="banner" className={classes.banner}>
                <Container>
                    <Typography
                        color="primary"
                        variant="h1"
                        className={classes.welcome}
                    >
                        {counselor.last_name}
                        {", "}
                        {counselor.first_name}
                    </Typography>
                </Container>
            </div>
            <div id="today">
                <Container>
                    <Typography
                        color="primary"
                        className={classes.date}
                        variant="h5"
                        gutterBottom={true}
                    >
                        {today}
                    </Typography>
                </Container>
            </div>

            <div>
                <Container className={classes.container}>
                    <Box display="flex" justifyContent="center">
                        <Button>
                            <Link
                                to="/counselor/appointment"
                                className={classes.link_route}
                            >
                                <Card>
                                    <CardContent>
                                        <Grid
                                            container
                                            direction="column"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Grid
                                                item
                                                className={classes.grid_item}
                                            >
                                                <Typography
                                                    color="primary"
                                                    variant="h5"
                                                >
                                                    Appointments
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                className={classes.grid_item}
                                            >
                                                <img
                                                    src="./images/appointments_img.png"
                                                    className={classes.img}
                                                />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Button>
                    </Box>
                </Container>
            </div>

            <div id="availability">
                <Availability _id={_id} useStyles={useStyles} />
            </div>

            <div id="webinars">
                <Webinars _id={_id} useStyles={useStyles} />
            </div>
            {/* 
            <div id="appointments">
                <Appointments _id={_id} useStyles={useStyles} />
            </div>
             */}
        </>
    );
};

export default Index;
