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
    Switch,
    FormControl,
    FormGroup,
    FormControlLabel,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { CustomButton } from "../../../../material-ui/styles";
import { updateAppointment } from "../../Service";

const AcceptModal = ({
    useStyles,
    setAppointments,
    selectedAppointment,
    counselor,
    acceptModal,
    handleCloseAcceptModal,
}) => {
    const classes = useStyles();

    const [form, setForm] = useState({
        link: "",
        email: false,
        contact: false,
    });
    const handleFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const handleSliderCheck = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.checked,
        });
    };

    const [fieldError, setFieldError] = useState({
        link: null,
    });

    const [loading, setLoading] = useState(false);
    const handleOnSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        let formData = {
            counselor_id: counselor._id,
            appointment_id: selectedAppointment._id,
            link: form.link,
            email: form.email,
            contact: form.contact,
            type: "accept",
        };

        const response = await updateAppointment(formData);
        switch (response.status) {
            case 200:
                setAppointments(response.data[0]);
                setForm({ link: "", email: false, contact: false });
                setFieldError({
                    link: null,
                });
                setLoading(false);
                handleCloseAcceptModal();
                break;
            case 422:
                setLoading(false);
                setFieldError(response.data.errors);
                break;
        }
    };

    return (
        <Modal
            open={acceptModal}
            onClose={handleCloseAcceptModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Container maxWidth="sm">
                <Fade in={acceptModal}>
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
                                            Accept
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton
                                            onClick={handleCloseAcceptModal}
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
                                                    id="link"
                                                    disabled={loading}
                                                    error={
                                                        fieldError.link
                                                            ? true
                                                            : false
                                                    }
                                                    fullWidth
                                                    helperText={
                                                        fieldError.link
                                                            ? fieldError.link
                                                            : ""
                                                    }
                                                    label="Meeting Link"
                                                    name="link"
                                                    onChange={handleFormChange}
                                                    value={form.link}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                className={classes.grid_item}
                                            >
                                                <FormControl component="fieldset">
                                                    <FormGroup>
                                                        <FormControlLabel
                                                            control={
                                                                <Switch
                                                                    color="primary"
                                                                    disabled={
                                                                        counselor
                                                                            .email
                                                                            .length >
                                                                        0
                                                                            ? false
                                                                            : true
                                                                    }
                                                                    checked={
                                                                        form.email
                                                                    }
                                                                    onChange={
                                                                        handleSliderCheck
                                                                    }
                                                                    name="email"
                                                                />
                                                            }
                                                            label="Share email address"
                                                        />
                                                        <FormControlLabel
                                                            control={
                                                                <Switch
                                                                    color="primary"
                                                                    disabled={
                                                                        counselor
                                                                            .contact
                                                                            .length >
                                                                        0
                                                                            ? false
                                                                            : true
                                                                    }
                                                                    checked={
                                                                        form.contact
                                                                    }
                                                                    onChange={
                                                                        handleSliderCheck
                                                                    }
                                                                    name="contact"
                                                                />
                                                            }
                                                            label="Share phone/contact number"
                                                        />
                                                    </FormGroup>
                                                </FormControl>
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
                                                    Accept Request
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

export default AcceptModal;
