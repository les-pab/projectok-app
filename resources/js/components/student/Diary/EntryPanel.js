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
import Carousel from "react-material-ui-carousel";
import { updateEntry } from "../Service";
import { CustomButton } from "../../../material-ui/styles";

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
            fontSize: 32,
            lineHeight: 1.4,
        },
    },
}))((props) => <TextField {...props} />);

const EntryPanel = ({
    value,
    index,
    _id,
    entry,
    setDiaryEntries,
    filteredEntries,
    handleNewEntryModalOpen,
}) => {
    const classes = useStyles();

    const [onEdit, setOnEdit] = useState(true);
    const handleOnEdit = () => {
        setOnEdit(!onEdit);
    };

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        date: `${entry.date}`,
        title: `${entry.title}`,
        content: `${entry.content}`,
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
            entry_id: entry._id,
            title: form.title,
            content: form.content,
            date: form.date,
        };

        const response = await updateEntry(formData);
        switch (response.status) {
            case 200:
                setDiaryEntries(response.data[0]);
                setLoading(false);
                handleOnEdit();
                break;
            case 422:
                setLoading(false);
                setFieldError(response.data.errors);
                break;
        }
    };

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            flexGrow={10}
        >
            {value === index && (
                <Grid container direction="row" wrap="nowrap" spacing={1}>
                    <Grid item></Grid>
                    <Grid item container direction="column" wrap="nowrap">
                        <Grid item>
                            <form autoComplete="off" onSubmit={handleOnSubmit}>
                                <Grid item container direction="column">
                                    <Grid item className={classes.grid_item}>
                                        <ContentTextfield
                                            autoFocus
                                            id="title"
                                            disabled={loading || onEdit}
                                            error={
                                                fieldError.title ? true : false
                                            }
                                            fullWidth
                                            helperText={
                                                fieldError.title
                                                    ? fieldError.title
                                                    : ""
                                            }
                                            label="Title"
                                            name="title"
                                            onChange={handleFormChange}
                                            value={form.title}
                                            variant="outlined"
                                        />
                                    </Grid>

                                    <Grid item className={classes.grid_item}>
                                        <ContentTextfield
                                            autoFocus
                                            disabled={loading || onEdit}
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
                                                maxLength: 1000
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

                                    {onEdit ? (
                                        <Grid
                                            item
                                            className={classes.grid_item}
                                        >
                                            <CustomButton
                                                background="primary"
                                                onClick={handleOnEdit}
                                            >
                                                Edit
                                            </CustomButton>
                                        </Grid>
                                    ) : (
                                        <Grid
                                            item
                                            container
                                            direction="row"
                                            justifyContent="space-between"
                                            className={classes.grid_item}
                                        >
                                            <Grid item>
                                                <CustomButton
                                                    background="secondary"
                                                    onClick={handleOnEdit}
                                                >
                                                    Cancel
                                                </CustomButton>
                                            </Grid>
                                            <Grid item>
                                                <CustomButton
                                                    type="submit"
                                                    background="primary"
                                                    radius="32px"
                                                    disabled={loading}
                                                >
                                                    Update
                                                </CustomButton>
                                            </Grid>
                                        </Grid>
                                    )}
                                </Grid>
                            </form>
                        </Grid>
                        {filteredEntries.length <= 0 ? (
                            <Grid item container>
                                <Grid item>
                                    <CustomButton
                                        background="primary"
                                        onClick={handleNewEntryModalOpen}
                                    >
                                        Add entry for today
                                    </CustomButton>
                                </Grid>
                            </Grid>
                        ) : (
                            ""
                        )}
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default EntryPanel;
