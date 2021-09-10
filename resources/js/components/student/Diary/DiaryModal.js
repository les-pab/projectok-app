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
    Tab,
    Tabs,
    IconButton,
    Dialog,
    CssBaseline,
    Typography,
    DialogActions,
    TextField,
    Snackbar,
    Modal,
    Backdrop,
    Fade,
    LinearProgress,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import CloseIcon from "@material-ui/icons/Close";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { CustomButton } from "../../../material-ui/styles";
import EntryPanel from "./EntryPanel";

const useStyles = makeStyles((theme) => ({
    grid_item: {
        padding: "2% 0",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    diary_card: {
        margin: 0,
        padding: 0,
        paddingBottom: "0 !important",
        height: 680,
    },
}));

const CustomTab = withStyles(() => ({
    root: {
        borderTop: "1px solid gray",
        borderBottom: "1px solid gray",
        marginTop: "4px",
        marginBottom: "4px",
        textTransform: "none",
    },
    wrapper: {
        alignItems: "flex-start",
    },
}))((props) => <Tab disableRipple {...props} />);

const DiaryModal = ({
    _id,
    today,
    diaryEntries,
    setDiaryEntries,
    diaryModal,
    handleDiaryModalClose,
    handleNewEntryModalOpen,
}) => {
    const classes = useStyles();

    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (e, value) => {
        setTabValue(value);
    };

    let filteredEntries = diaryEntries.filter(
        (entry) => new Date(entry.date).toDateString() === today
    );

    let tabs = [];
    let panels = [];
    diaryEntries.map((entry, index) => {
        tabs.push(
            <CustomTab
                key={index}
                value={index}
                label={
                    <Typography align="left" variant="h5">{`${new Date(
                        entry.date
                    ).toDateString()}`}</Typography>
                }
            />
        );

        panels.push(
            <EntryPanel
                key={index}
                index={index}
                value={tabValue}
                _id={_id}
                entry={entry}
                setDiaryEntries={setDiaryEntries}
                filteredEntries={filteredEntries}
                handleNewEntryModalOpen={handleNewEntryModalOpen}
            />
        );
    });

    return (
        <Modal
            open={diaryModal}
            onClose={handleDiaryModalClose}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Container maxWidth="lg">
                <Fade in={diaryModal}>
                    <Card>
                        <CardContent>
                            {diaryEntries.length > 0 ? (
                                <Box
                                    display="flex"
                                    className={classes.diary_card}
                                >
                                    <Tabs
                                        orientation="vertical"
                                        value={tabValue}
                                        onChange={handleTabChange}
                                        variant="scrollable"
                                        scrollButtons="on"
                                    >
                                        {tabs}
                                    </Tabs>
                                    {panels}
                                </Box>
                            ) : (
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    className={classes.diary_card}
                                >
                                    <Grid item className={classes.grid_item}>
                                        <Typography align="center" variant="h4">
                                            You currently have no diary entries,
                                            would you like to add one?.
                                        </Typography>
                                    </Grid>
                                    <Grid item className={classes.grid_item}>
                                        <CustomButton
                                            fullWidth
                                            background="primary"
                                            onClick={handleNewEntryModalOpen}
                                        >
                                            Add Entry
                                        </CustomButton>
                                    </Grid>
                                </Grid>
                            )}
                        </CardContent>
                    </Card>
                </Fade>
            </Container>
        </Modal>
    );
};

export default DiaryModal;
