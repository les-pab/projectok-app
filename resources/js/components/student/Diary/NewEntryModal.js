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
import { storeEntry } from "../Service";

const useStyles = makeStyles((theme) => ({
    grid_item: {
        padding: "2% 0",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));

const ContentTextfield = withStyles(() => ({
    root: {
        "& .MuiOutlinedInput-root": {
            fontSize: 24,
            lineHeight: 1.4,
        },
    },
}))((props) => <TextField {...props} />);

const NewEntryModal = ({
    _id,
    date,
    today,
    newEntryModal,
    handleNewEntryModalClose,
    setDiaryEntries,
}) => {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        title: "",
        content: "",
    });
    const handleFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const [fieldError, setFieldError] = useState({
        title: null,
        content: null,
    });

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        let formData = {
            student_id: _id,
            title: form.title,
            content: form.content,
            date: date,
        };

        const response = await storeEntry(formData);
        switch (response.status) {
            case 200:
                setDiaryEntries(response.data[0]);
                handleNewEntryModalClose();
                break;
            case 422:
                setLoading(false);
                setFieldError(response.data.errors);
                break;
        }
    };

    return (
        <Modal
            open={newEntryModal}
            onClose={handleNewEntryModalClose}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Container maxWidth="md">
                <Fade in={newEntryModal}>
                    <Card>
                        <CardContent>
                            <Grid container direction="column" wrap="nowrap">
                                {loading ? (
                                    <Grid
                                        item
                                        xs={12}
                                        md={12}
                                        lg={12}
                                        className={classes.grid_item}
                                    >
                                        <LinearProgress />
                                    </Grid>
                                ) : (
                                    ""
                                )}
                                <Grid item className={classes.grid_item}>
                                    <Typography variant="h5">
                                        Date: {today}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <form
                                        autoComplete="off"
                                        onSubmit={handleOnSubmit}
                                    >
                                        <Grid container direction="column">
                                            <Grid item>
                                                <TextField
                                                    autoFocus
                                                    disabled={loading}
                                                    error={
                                                        fieldError.title
                                                            ? true
                                                            : false
                                                    }
                                                    fullWidth
                                                    helperText={
                                                        fieldError.title
                                                            ? fieldError.title
                                                            : ""
                                                    }
                                                    id="title"
                                                    label="Title"
                                                    name="title"
                                                    onChange={handleFormChange}
                                                    value={form.title}
                                                    variant="outlined"
                                                ></TextField>
                                            </Grid>
                                            <Grid
                                                item
                                                className={classes.grid_item}
                                            >
                                                <ContentTextfield
                                                    autoFocus
                                                    disabled={loading}
                                                    error={
                                                        fieldError.content
                                                            ? true
                                                            : false
                                                    }
                                                    fullWidth
                                                    helperText={
                                                        fieldError.content
                                                            ? fieldError.content
                                                            : ""
                                                    }
                                                    id="content"
                                                    inputProps={{
                                                        maxLength: 1000,
                                                    }}
                                                    label="Content"
                                                    multiline
                                                    name="content"
                                                    onChange={handleFormChange}
                                                    minRows={8}
                                                    maxRows={10}
                                                    value={form.content}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item>
                                                <CustomButton
                                                    type="submit"
                                                    background="primary"
                                                    radius="32px"
                                                    disabled={loading}
                                                >
                                                    Add Entry
                                                </CustomButton>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Fade>
            </Container>
        </Modal>
    );
};

export default NewEntryModal;
