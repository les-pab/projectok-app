import React from "react";
import {
    Grid,
    Container,
    Card,
    CardContent,
    IconButton,
    TextField,
    Modal,
    Fade,
    Backdrop,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

const CustomTextfield = withStyles(() => ({
    root: {
        "& .MuiOutlinedInput-root": {
            fontSize: 24,
            lineHeight: 1.4,
        },
    },
}))((props) => <TextField {...props} />);

const ViewNoteModal = ({
    useStyles,
    selectedAppointment,
    viewNoteModal,
    handleCloseViewNoteModal,
}) => {
    const classes = useStyles();

    return (
        <Modal
            open={viewNoteModal}
            onClose={handleCloseViewNoteModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Container maxWidth="md">
                <Fade in={viewNoteModal}>
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
                                            onClick={handleCloseViewNoteModal}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <CustomTextfield
                                        fullWidth
                                        disabled={true}
                                        id="note"
                                        label="Note"
                                        multiline
                                        name="note"
                                        maxRows={10}
                                        value={
                                            selectedAppointment.note
                                                ? selectedAppointment.note
                                                : "Empty"
                                        }
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Fade>
            </Container>
        </Modal>
    );
};

export default ViewNoteModal;
