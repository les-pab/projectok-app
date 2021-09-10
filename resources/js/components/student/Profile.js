import React, { useState, useEffect } from "react";
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Avatar,
    TextField,
    Badge,
    Backdrop,
    Modal,
    Fade,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import {
    PhoneAndroid,
    Email,
    Home,
    Work,
    Domain,
    AddAPhoto,
    AssignmentInd,
    VpnKey,
} from "@material-ui/icons";
import { updateProfile, updatePhoto } from "./Service";
import { CustomButton } from "../../material-ui/styles";
import bg from "../../../images/profile_bg.png";
import broken_img from "../../../images/broken_image.png";

const useStyles = makeStyles((themes) => ({
    banner: {
        backgroundImage: `url(${bg})`,
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
        padding: "8% 0",
        color: themes.palette.common.white,
    },
    avatar: {
        width: "220px",
        height: "220px",
    },
    badge: {
        cursor: "pointer",
    },
    information: {
        // backgroundImage: `url(${ibg})`,
        // backgroundSize: "100% auto",
        // backgroundRepeat: "no-repeat",
        padding: "4% 0",
    },
    card: {
        backgroundColor: themes.palette.common.grey,
        margin: "4% 0",
    },
    item: {
        padding: "1% 0",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));

const ProfilePicture = ({ _id, profile, setProfile }) => {
    const classes = useStyles();

    const [modalState, setModalState] = useState(false);

    const handleAddPhoto = () => {
        setModalState(!modalState);
    };

    const form = React.createRef();

    const handleProfilePhoto = (response) => {
        setProfile({
            ...profile,
            profile_picture: `../storage/${response.data.path}`,
        });
        setModalState(false);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", form.current.files[0]);

        const response = await updatePhoto(formData, _id);
        console.log(response);
        switch (response.status) {
            case 200:
                handleProfilePhoto(response);
                break;
            case 422:
                break;
        }
    };

    return (
        <Container>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={4}
            >
                <Grid item>
                    <>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            badgeContent={<AddAPhoto />}
                            onClick={handleAddPhoto}
                            className={classes.badge}
                        >
                            <Avatar
                                className={classes.avatar}
                                src={`../storage/${profile.profile_picture}`}
                            />
                        </Badge>

                        <Modal
                            open={modalState}
                            onClose={handleAddPhoto}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                            className={classes.modal}
                        >
                            <Container maxWidth="md">
                                <Fade in={modalState}>
                                    <Card>
                                        <CardContent>
                                            <form
                                                autoComplete="off"
                                                onSubmit={handleOnSubmit}
                                            >
                                                <Grid
                                                    container
                                                    direction="column"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    spacing={2}
                                                >
                                                    <Grid item>
                                                        <input
                                                            type="file"
                                                            ref={form}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <CustomButton
                                                            type="submit"
                                                            background="primary"
                                                        >
                                                            Update Photo
                                                        </CustomButton>
                                                    </Grid>
                                                </Grid>
                                            </form>
                                        </CardContent>
                                    </Card>
                                </Fade>
                            </Container>
                        </Modal>
                    </>
                </Grid>
                <Grid item>
                    <Typography variant="h2">
                        {profile.last_name}, {profile.first_name}{" "}
                        {profile.middle_name}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

const BasicInformation = ({
    isEnabled,
    form,
    handleFormChange,
    fieldError,
}) => {
    const classes = useStyles();

    return (
        <Container>
            <Card className={classes.card}>
                <CardContent>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                    >
                        <Grid item>
                            <Typography variant="h5">
                                BASIC INFORMATION
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            item
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            className={classes.item}
                        >
                            <Grid item xs={6} md={6}>
                                <Typography color="primary">
                                    Last Name
                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <TextField
                                    autoFocus
                                    id="last_name"
                                    disabled={isEnabled}
                                    error={fieldError.last_name ? true : false}
                                    fullWidth
                                    helperText={
                                        fieldError.last_name
                                            ? fieldError.last_name
                                            : ""
                                    }
                                    name="last_name"
                                    onChange={handleFormChange}
                                    value={form.last_name}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            className={classes.item}
                        >
                            <Grid item xs={6} md={6}>
                                <Typography color="primary">
                                    First Name
                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <TextField
                                    autoFocus
                                    id="first_name"
                                    disabled={isEnabled}
                                    error={fieldError.first_name ? true : false}
                                    fullWidth
                                    helperText={
                                        fieldError.first_name
                                            ? fieldError.first_name
                                            : ""
                                    }
                                    name="first_name"
                                    onChange={handleFormChange}
                                    value={form.first_name}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            className={classes.item}
                        >
                            <Grid item xs={6} md={6}>
                                <Typography color="primary">
                                    Middle Name
                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <TextField
                                    autoFocus
                                    id="middle_name"
                                    disabled={isEnabled}
                                    error={
                                        fieldError.middle_name ? true : false
                                    }
                                    fullWidth
                                    helperText={
                                        fieldError.middle_name
                                            ? fieldError.middle_name
                                            : ""
                                    }
                                    name="middle_name"
                                    onChange={handleFormChange}
                                    value={form.middle_name}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            className={classes.item}
                        >
                            <Grid item xs={6} md={6}>
                                <Typography color="primary">Age</Typography>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <TextField
                                    autoFocus
                                    id="age"
                                    disabled={isEnabled}
                                    error={fieldError.age ? true : false}
                                    fullWidth
                                    helperText={
                                        fieldError.age ? fieldError.age : ""
                                    }
                                    name="age"
                                    onChange={handleFormChange}
                                    value={form.age}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            className={classes.item}
                        >
                            <Grid item xs={6} md={6}>
                                <Typography color="primary">Gender</Typography>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <TextField
                                    autoFocus
                                    id="gender"
                                    disabled={isEnabled}
                                    error={fieldError.gender ? true : false}
                                    fullWidth
                                    helperText={
                                        fieldError.gender
                                            ? fieldError.gender
                                            : ""
                                    }
                                    name="gender"
                                    onChange={handleFormChange}
                                    value={form.gender}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            className={classes.item}
                        >
                            <Grid item xs={6} md={6}>
                                <Typography color="primary">Email</Typography>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <TextField
                                    autoFocus
                                    id="email"
                                    disabled={isEnabled}
                                    error={fieldError.email ? true : false}
                                    fullWidth
                                    helperText={
                                        fieldError.email ? fieldError.email : ""
                                    }
                                    name="email"
                                    onChange={handleFormChange}
                                    value={form.email}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};

const SecurityInformation = ({
    isEnabled,
    form,
    handleFormChange,
    fieldError,
}) => {
    const classes = useStyles();

    return (
        <Container>
            <Card className={classes.card}>
                <CardContent>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                    >
                        <Grid item>
                            <Typography variant="h5">
                                CONTACT INFORMATION
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            item
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            className={classes.item}
                        >
                            <Grid item xs={6} md={6}>
                                <Typography color="primary">
                                    <PhoneAndroid /> Contact Number
                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <TextField
                                    autoFocus
                                    id="contact"
                                    disabled={isEnabled}
                                    error={fieldError.contact ? true : false}
                                    fullWidth
                                    helperText={
                                        fieldError.contact
                                            ? fieldError.contact
                                            : ""
                                    }
                                    name="contact"
                                    onChange={handleFormChange}
                                    value={form.contact}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            className={classes.item}
                        >
                            <Grid item xs={6} md={6}>
                                <Typography color="primary">
                                    <Email /> Email Address
                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <TextField
                                    autoFocus
                                    id="email"
                                    disabled={isEnabled}
                                    error={fieldError.email ? true : false}
                                    fullWidth
                                    helperText={
                                        fieldError.email ? fieldError.email : ""
                                    }
                                    name="email"
                                    onChange={handleFormChange}
                                    value={form.email}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};

const Profile = ({ _id, profile, setProfile }) => {
    const history = useHistory();

    const classes = useStyles();

    const [form, setForm] = useState({
        last_name: profile.last_name,
        first_name: profile.first_name,
        middle_name: profile.middle_name,
        age: profile.age,
        gender: profile.gender,
        email: profile.email,
    });
    const handleFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const [edit, setEdit] = useState(false);
    const [isEnabled, setIsEnabled] = useState(true);

    const [fieldError, setFieldError] = useState({
        last_name: null,
        first_name: null,
        middle_name: null,
        age: null,
        gender: null,
        email: null,
    });

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        console.log(form);

        const response = await updateProfile(form, _id);
        switch (response.status) {
            case 200:
                setProfile(response.data[0]);
                setEdit(!edit);
                setIsEnabled(!isEnabled);
                history.goBack();
                break;
            case 422:
                setFieldError(response.data.errors);
                break;
        }
    };

    const handleOnEdit = (e) => {
        setForm({
            last_name: profile.last_name,
            first_name: profile.first_name,
            middle_name: profile.middle_name,
            age: profile.age,
            gender: profile.gender,
            email: profile.email,
        });
        setEdit(!edit);
        setIsEnabled(!isEnabled);
    };

    return (
        <>
            <div className={classes.banner}>
                <ProfilePicture
                    profile={profile}
                    _id={_id}
                    setProfile={setProfile}
                />
            </div>
            <div className={classes.information}>
                <form autoComplete="off" onSubmit={handleOnSubmit}>
                    <div>
                        <BasicInformation
                            isEnabled={isEnabled}
                            form={form}
                            handleFormChange={handleFormChange}
                            fieldError={fieldError}
                        />
                    </div>

                    {/* <div>
                        <ContactInformation
                            isEnabled={isEnabled}
                            form={form}
                            handleFormChange={handleFormChange}
                            fieldError={fieldError}
                        />
                    </div> */}

                    <div>
                        <Container>
                            {!edit ? (
                                <CustomButton
                                    background="primary"
                                    onClick={handleOnEdit}
                                >
                                    Edit Profile
                                </CustomButton>
                            ) : (
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <CustomButton
                                            background="primary"
                                            onClick={handleOnEdit}
                                        >
                                            Cancel
                                        </CustomButton>
                                    </Grid>
                                    <Grid item>
                                        <CustomButton
                                            type="submit"
                                            background="primary"
                                        >
                                            Update Profile
                                        </CustomButton>
                                    </Grid>
                                </Grid>
                            )}
                        </Container>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Profile;
