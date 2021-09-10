import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import Header from "../shared/Header";
import Banner from "./Banner.js";
import About from "./About.js";
import GetStarted from "./GetStarted.js";
import Services from "./Services.js";
import Testimonies from "./Testimonies.js";
import Partners from "./Partners.js";
import Footer from "../shared/Footer";

const useStyles = makeStyles((theme) => ({
    grid_item: {
        padding: "32px 24px",
    },
    link: {
        "&:hover": {
            textDecoration: "none",
        },
    },
    banner: {
        backgroundImage: "url(./images/banner-background.png)",
        backgroundSize: "100% auto",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        padding: "5% 0",
        color: theme.palette.common.white,
    },
    about: {
        padding: "2% 0",
        textAlign: "center",
    },
    about_text: {
        "&:after": {
            color: theme.palette.secondary.main,
            content: "' Project OK?'",
        },
    },
    about_images: {
        width: "158.33px",
        height: "auto",
    },
    get_started: {
        backgroundImage: "url(./images/get_started_bg.png)",
        backgroundSize: "100% auto",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        padding: "9% 0",
    },
    services: {
        backgroundImage: `url(./images/footer_bg.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "fit-content",
        padding: "28px 16px",
        textAlign: "center",
        padding: "4% 0",
        color: theme.palette.common.white,
    },
    logo: {
        width: "80px",
        height: "auto",
    },
    card_forums: {
        width: "310px",
        height: "400px",
        borderRadius: "20px",
        padding: "0 16px",
        color: theme.palette.primary.main,
        boxShadow: "-12px 12px 0px 0px rgba(41, 187, 137, 0.75)",
    },
    card_private_session: {
        width: "310px",
        height: "400px",
        borderRadius: "20px",
        padding: "0 16px",
        color: theme.palette.primary.main,
        boxShadow: "0px 12px 0px 0px rgba(41, 187, 137, 0.75)",
    },
    card_diary: {
        width: "310px",
        height: "400px",
        borderRadius: "20px",
        padding: "0 16px",
        color: theme.palette.primary.main,
        boxShadow: "12px 12px 0px 0px rgba(41, 187, 137, 0.75)",
    },
    testimonies: {
        padding: "2% 0",
    },
    avatar: {
        width: "240px",
        height: "auto",
    },
    partners: {
        padding: "2% 0",
        textAlign: "center",
    },
    partner_logo: {
        width: "190px",
        height: "auto",
    },
}));

const Index = () => {
    const auth = useAuth();
    let location;
    if (auth.user.isLoggedIn && auth.user.data.type === "student") {
        location = {
            pathname: "/student",
        };
    } else {
        location = {
            pathname: "/counselor",
        };
    }

    return (
        <>
            {auth.user.isLoggedIn ? (
                <Redirect to={location} />
            ) : (
                <>
                    <Header />
                    <Banner useStyles={useStyles} />
                    <About useStyles={useStyles} />
                    <GetStarted useStyles={useStyles} />
                    <Services useStyles={useStyles} />
                    <Testimonies useStyles={useStyles} />
                    <Partners useStyles={useStyles} />
                    <Footer />
                </>
            )}
        </>
    );
};

export default Index;
