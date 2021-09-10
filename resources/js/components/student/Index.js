import React, { useState, useEffect } from "react";
import {
    Box,
    Grid,
    ThemeProvider,
    Container,
    Card,
    CardContent,
    CardHeader,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    CssBaseline,
    Typography,
    DialogActions,
    Snackbar,
    Modal,
    Backdrop,
    Fade,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { CustomButton } from "../../material-ui/styles";
import { fetchAppointments, fetchDiary, fetchAvailability } from "./Service";
import Banner from "./Counseling/Banner";
// import Appointment from "./Appointment";
import Webinars from "./Webinars";
import DiaryModal from "./Diary/DiaryModal";
import NewEntryModal from "./Diary/NewEntryModal";
import banner_bg from "../../../images/student_banner_bg.png";

const useStyles = makeStyles((theme) => ({
    date: {
        textAlign: "center",
        padding: 8,
        margin: "16px 0",
        borderTop: "2px solid",
        borderBottom: "2px solid",
    },
    typography: {
        color: theme.palette.common.white,
    },
    typography_green: {
        padding: "2% 8%",
        backgroundColor: "rgba(41, 187, 137, 0.17)",
    },
    link_route: {
        color: theme.palette.primary.dark,
        "&:hover": {
            textDecoration: "none",
            color: theme.palette.primary.dark,
        },
    },
    item_top_padding: {
        paddingTop: "2%",
    },
    img: {
        width: "256px",
    },
    grid_item: {
        padding: "2% 0",
    },
    banner: {
        backgroundImage: `url(${banner_bg})`,
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
        padding: "8% 0",
    },
    banner_card: {
        color: theme.palette.primary.main,
        textAlign: "center",
        borderRadius: "20px",
        boxShadow: "-8px 8px 0px 0px rgba(41, 187, 137, 0.75)",
    },
    banner_card_icon: {
        width: "64px",
        height: "64px",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    modal_card: {
        color: theme.palette.common.white,
        backgroundImage: `url(./images/cunselling_bg.png)`,
        backgroundSize: "80% auto",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        padding: "2%",
    },
    us_typography: {
        "&:after": {
            color: theme.palette.secondary.main,
            content: "' US.'",
        },
    },
    title: {
        "&:after": {
            color: theme.palette.secondary.main,
            content: "'Kumustahan'",
        },
    },
    item_middle: {
        padding: "24% 0",
    },
    counselor: {
        padding: "0 68px",
    },
    avatar: {
        width: "160px",
        height: "160px",
    },
    card: {
        margin: "2% 0",
    },
    paper: {
        backgroundColor: theme.palette.common.grey,
    },
    paper_typography: {
        textAlign: "center",
        padding: 32,
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    counselor_card: {
        maxHeight: "724px",
    },
    tab_logo: {
        width: "32px",
        height: "auto",
    },
    diary_card: {
        margin: "0",
        padding: "0",
        paddingBottom: "0 !important",
        height: "512px",
    },
    diary_background: {
        backgroundImage: `url(./images/diary_bg.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        padding: "2% 0",
        height: "500px",
    },
    entry: {
        padding: "6%",
    },
}));

const Index = ({ _id, student, date, today }) => {
    const classes = useStyles();
    
    const [diaryEntries, setDiaryEntries] = useState([]);
    useEffect(() => {
        const getDiary = async () => {
            const response = await fetchDiary(_id);
            switch (response.status) {
                case 200:
                    setDiaryEntries(response.data[0]);
                    break;
            }
        };

        getDiary();
    }, []);

    const [diaryModal, setDiaryModal] = useState(false);
    const handleDiaryModalOpen = () => {
        setDiaryModal(true);
    };
    const handleDiaryModalClose = () => {
        setDiaryModal(false);
    };

    const [newEntryModal, setNewEntryModal] = useState(false);
    const handleNewEntryModalOpen = () => {
        setDiaryModal(false);
        setNewEntryModal(true);
    };
    const handleNewEntryModalClose = () => {
        setNewEntryModal(false);
        setDiaryModal(true);
    };

    return (
        <>
            <>
                <Banner
                    useStyles={useStyles}
                    _id={_id}
                    name={`${student.last_name}, ${student.first_name}`}
                    date={date}
                />

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

                <div id="diary">
                    <Container>
                        <Grid
                            container
                            direction="row"
                            wrap="nowrap"
                            justifyContent="space-evenly"
                            alignItems="center"
                        >
                            <Grid item className={classes.grid_item}>
                                <Button onClick={handleDiaryModalOpen}>
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
                                                    className={
                                                        classes.grid_item
                                                    }
                                                >
                                                    <Typography
                                                        color="primary"
                                                        variant="h5"
                                                    >
                                                        Diary
                                                    </Typography>
                                                </Grid>
                                                <Grid
                                                    item
                                                    className={
                                                        classes.grid_item
                                                    }
                                                >
                                                    <img
                                                        src="./images/diary_img.png"
                                                        className={classes.img}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Button>
                            </Grid>
                            <Grid item className={classes.grid_item}>
                                <Button>
                                    <Link
                                        to="/student/appointment"
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
                                                        className={
                                                            classes.grid_item
                                                        }
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
                                                        className={
                                                            classes.grid_item
                                                        }
                                                    >
                                                        <img
                                                            src="./images/appointments_img.png"
                                                            className={
                                                                classes.img
                                                            }
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </div>

                <div id="webinars">
                    <Webinars useStyles={useStyles} />
                </div>
            </>

            <DiaryModal
                _id={_id}
                today={today}
                diaryEntries={diaryEntries}
                setDiaryEntries={setDiaryEntries}
                diaryModal={diaryModal}
                handleDiaryModalClose={handleDiaryModalClose}
                handleNewEntryModalOpen={handleNewEntryModalOpen}
                handleNewEntryModalOpen={handleNewEntryModalOpen}
            />

            <NewEntryModal
                _id={_id}
                date={date}
                today={today}
                newEntryModal={newEntryModal}
                handleNewEntryModalClose={handleNewEntryModalClose}
                setDiaryEntries={setDiaryEntries}
            />
        </>
    );
};

export default Index;
