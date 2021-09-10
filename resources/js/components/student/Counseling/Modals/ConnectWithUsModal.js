import React from "react";
import {
    Grid,
    Container,
    Card,
    CardContent,
    IconButton,
    Typography,
    Modal,
    Backdrop,
    Fade,
} from "@material-ui/core";
import { Close, ArrowForwardRounded } from "@material-ui/icons";

const ConnectWithUsModal = ({
    useStyles,
    connectWithUsModal,
    handleConnectWithUsModalClose,
    handleCounselorModalOpen,
}) => {
    const classes = useStyles();

    return (
        <Modal
            open={connectWithUsModal}
            onClose={handleConnectWithUsModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Container maxWidth="md">
                <Fade in={connectWithUsModal}>
                    <Card>
                        <CardContent className={classes.modal_card}>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid
                                    container
                                    item
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Grid
                                        container
                                        item
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        xs={11}
                                    >
                                        <Grid item>
                                            <img
                                                src="./images/projectok_logo.svg"
                                                alt="Project-OK Logo"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                className={classes.title}
                                                variant="h4"
                                                color="primary"
                                            >
                                                Online
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <IconButton
                                            onClick={
                                                handleConnectWithUsModalClose
                                            }
                                        >
                                            <Close />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    className={classes.item_middle}
                                >
                                    <Grid item className={classes.grid_item}>
                                        <Typography
                                            variant="h4"
                                            className={classes.us_typography}
                                        >
                                            CONNECT WITH
                                        </Typography>
                                    </Grid>
                                    <Grid item className={classes.grid_item}>
                                        <Typography variant="h5">
                                            EVERYTHING IS GOING TO BE ALRIGHT
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    justifyContent="flex-end"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <IconButton
                                            onClick={handleCounselorModalOpen}
                                        >
                                            <Typography
                                                variant="body1"
                                                color="primary"
                                            >
                                                CONNECT <ArrowForwardRounded />
                                            </Typography>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Fade>
            </Container>
        </Modal>
    );
};

export default ConnectWithUsModal;
