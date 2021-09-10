import React, { useState } from "react";
import {
    Grid,
    Container,
    Card,
    CardContent,
    IconButton,
    TextField,
    Typography,
    Modal,
    Fade,
    Backdrop,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { CustomButton } from "../../../../material-ui/styles";
import { updateAppointment } from "../../Service";

const CustomTextfield = withStyles(() => ({
    root: {
        "& .MuiOutlinedInput-root": {
            fontSize: 24,
            lineHeight: 1.4,
        },
    },
}))((props) => <TextField {...props} />);

const NoteModal = ({
    useStyles,
    setAppointments,
    selectedAppointment,
    counselor,
    noteModal,
    handleCloseNoteModal,
}) => {
    const classes = useStyles();

    const [form, setForm] = useState({
        note: selectedAppointment.note,
    });
    const handleFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const [fieldError, setFieldError] = useState({
        note: null,
    });

    const [loading, setLoading] = useState(false);
    const handleOnSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        let formData = {
            counselor_id: counselor._id,
            appointment_id: selectedAppointment._id,
            note: form.note,
            type: "note",
        };

        const response = await updateAppointment(formData);
        switch (response.status) {
            case 200:
                setAppointments(response.data[0]);
                setForm({
                    note: "",
                });
                setFieldError({
                    note: null,
                });
                setLoading(false);
                handleCloseNoteModal();
                break;
            case 422:
                setLoading(false);
                setFieldError(response.data.errors);
                break;
        }
    };
    return (
        <Modal
            open={noteModal}
            onClose={handleCloseNoteModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Container maxWidth="md">
                <Fade in={noteModal}>
                    <Card>
                        <CardContent>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                wrap="nowrap"
                            >
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    justifyContent="flex-end"
                                    alignItems="center"
                                    wrap="nowrap"
                                >
                                    <Grid item>
                                        <IconButton
                                            onClick={handleCloseNoteModal}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                {fieldError.note ? (
                                    <Grid item className={classes.grid_item}>
                                        <Typography
                                            color="error"
                                            variant="h6"
                                            className={classes.typography_red}
                                        >
                                            {fieldError.note}
                                        </Typography>
                                    </Grid>
                                ) : (
                                    ""
                                )}
                                <Grid item>
                                    <form
                                        autoComplete="off"
                                        onSubmit={handleOnSubmit}
                                    >
                                        <Grid container direction="column">
                                            <Grid
                                                item
                                                className={classes.grid_item}
                                            >
                                                <CustomTextfield
                                                    autoFocus
                                                    disabled={loading}
                                                    error={
                                                        fieldError.note
                                                            ? true
                                                            : false
                                                    }
                                                    fullWidth
                                                    helperText={
                                                        fieldError.note
                                                            ? fieldError.note
                                                            : ""
                                                    }
                                                    id="note"
                                                    label="Note"
                                                    multiline
                                                    name="note"
                                                    onChange={handleFormChange}
                                                    maxRows={10}
                                                    value={form.note}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                container
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                wrap="nowrap"
                                            >
                                                <Grid item>
                                                    <CustomButton
                                                        disabled={loading}
                                                        onClick={
                                                            handleCloseNoteModal
                                                        }
                                                    >
                                                        Cancel
                                                    </CustomButton>
                                                </Grid>
                                                <Grid item>
                                                    <CustomButton
                                                        type="submit"
                                                        background="primary"
                                                        disabled={loading}
                                                    >
                                                        Save
                                                    </CustomButton>
                                                </Grid>
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

export default NoteModal;
