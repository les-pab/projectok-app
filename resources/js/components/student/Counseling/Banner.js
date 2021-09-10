import React, { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Container,
    Card,
    CardContent,
    Typography,
} from "@material-ui/core";
import { PermPhoneMsg } from "@material-ui/icons";
import { CustomButton } from "../../../material-ui/styles";
import { fetchAvailability, fetchAvailableCounselor } from "../Service";
import { format, isAfter, isBefore } from "date-fns";
import ConnectWithUsModal from "./Modals/ConnectWithUsModal";
import CounselorModal from "./Modals/CounselorModal";

const Banner = ({ useStyles, _id, name, date }) => {
    const classes = useStyles();

    const [counselors, setCounselors] = useState([]);
    useEffect(() => {
        const getAvailableCounselors = async () => {
            const response = await fetchAvailableCounselor();
            switch (response.status) {
                case 200:
                    setCounselors(response.data[0]);
                    break;
            }
        };

        getAvailableCounselors();
    }, []);

    let availableCounselors = [];
    if (counselors.length > 0) {
        counselors.map((counselor) => {
            const filter = counselor.appointment.filter(
                (apt) =>
                    `${format(new Date(apt.date), "MM/dd/yyyy")}` ===
                    `${format(date, "MM/dd/yyyy")}`
            );

            if (filter.length >= 0) {
                availableCounselors.push(counselor);
            }
        });
    }

    const [connectWithUsModal, setConnectWithUsModal] = useState(false);
    const [counselorModal, setCounselorModal] = useState(false);
    const handleConnectWithUsModalOpen = () => {
        setCounselorModal(false);
        setConnectWithUsModal(true);
    };
    const handleConnectWithUsModalClose = () => {
        setConnectWithUsModal(false);
        setCounselorModal(false);
    };
    const handleCounselorModalOpen = () => {
        setConnectWithUsModal(false);
        setCounselorModal(true);
    };
    const handleCounselorModalClose = () => {
        setConnectWithUsModal(false);
        setCounselorModal(false);
    };

    //FOR APPOINTMENT REQUEST

    return (
        <>
            <div id="banner" className={classes.banner}>
                <Container>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid
                            item
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="flex-start"
                            xs={6}
                        >
                            <Grid item>
                                <Typography
                                    variant="h2"
                                    className={classes.typography}
                                >
                                    Kumusta ka,
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h2" color="secondary">
                                    {name}
                                </Typography>
                            </Grid>
                            <Grid item className={classes.item_top_padding}>
                                <Typography
                                    variant="h5"
                                    className={classes.typography}
                                >
                                    We hope you are doing okay.
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="h5"
                                    className={classes.typography}
                                >
                                    Connect with us and share your stories.
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <Card className={classes.banner_card}>
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
                                            <PermPhoneMsg
                                                className={
                                                    classes.banner_card_icon
                                                }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            className={classes.grid_item}
                                        >
                                            <Typography variant="h6">
                                                Need someone to talk to?
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            className={classes.grid_item}
                                        >
                                            <Typography variant="h6">
                                                You don't have to fight your
                                                battles alone.
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            className={classes.grid_item}
                                        >
                                            <CustomButton
                                                background="secondary"
                                                texttransform="initial"
                                                onClick={
                                                    handleConnectWithUsModalOpen
                                                }
                                            >
                                                Connect with us
                                            </CustomButton>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </div>

            <ConnectWithUsModal
                useStyles={useStyles}
                connectWithUsModal={connectWithUsModal}
                handleConnectWithUsModalClose={handleConnectWithUsModalClose}
                handleCounselorModalOpen={handleCounselorModalOpen}
            />

            <CounselorModal
                useStyles={useStyles}
                counselorModal={counselorModal}
                handleCounselorModalClose={handleCounselorModalClose}
                _id={_id}
                counselors={counselors}
                date={date}
            />
        </>
    );
};

export default Banner;
