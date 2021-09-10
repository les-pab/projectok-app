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
import CloseIcon from "@material-ui/icons/Close";
import { CustomButton } from "../../../../material-ui/styles";
import { updateAppointment } from "../../Service";

const CancelModal = ({
    useStyles,
    setAppointments,
    selectedAppointment,
    counselor,
    cancelModal,
    handleCloseCancelModal,
}) => {
    const classes = useStyles();

    const [form, setForm] = useState({
        reason: "",
    });
    const handleFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const [fieldError, setFieldError] = useState({
        reason: null,
    });

    const [loading, setLoading] = useState(false);
    const handleOnSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        let formData = {
            counselor_id: counselor._id,
            appointment_id: selectedAppointment._id,
            slot_id: selectedAppointment.slot_id,
            reason: form.reason,
            type: "cancel",
        };

        const response = await updateAppointment(formData);
        switch (response.status) {
            case 200:
                setAppointments(response.data[0]);
                setForm({
                    reason: "",
                });
                setFieldError({
                    reason: null,
                });
                setLoading(false);
                handleCloseCancelModal();
                break;
            case 422:
                setLoading(false);
                setFieldError(response.data.errors);
                break;
        }
    };

    return (
        <Modal
            open={cancelModal}
            onClose={handleCloseCancelModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Container maxWidth="sm">
                <Fade in={cancelModal}>
                    <Card>
                        <CardContent>
                            <Grid container direction="column">
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Typography variant="h4">
                                            Cancel
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton
                                            onClick={handleCloseCancelModal}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Grid item className={classes.grid_item}>
                                    <form
                                        autoComplete="off"
                                        onSubmit={handleOnSubmit}
                                    >
                                        <Grid
                                            container
                                            direction="column"
                                            justifyContent="flex-start"
                                        >
                                            <Grid
                                                item
                                                className={classes.grid_item}
                                            >
                                                <TextField
                                                    autoFocus
                                                    id="reason"
                                                    maxRows={8}
                                                    minRows={6}
                                                    multiline
                                                    disabled={loading}
                                                    error={
                                                        fieldError.reason
                                                            ? true
                                                            : false
                                                    }
                                                    fullWidth
                                                    helperText={
                                                        fieldError.reason
                                                            ? fieldError.reason
                                                            : ""
                                                    }
                                                    label="Reason"
                                                    name="reason"
                                                    onChange={handleFormChange}
                                                    value={form.reason}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                className={classes.grid_item}
                                            >
                                                <CustomButton
                                                    type="submit"
                                                    disabled={loading}
                                                    background="primary"
                                                    width="100%"
                                                >
                                                    Cancel Request
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

export default CancelModal;
