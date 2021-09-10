import React from "react";
import { Button, TableCell, TableRow } from "@material-ui/core";
import { makeStyles, withStyles, createTheme } from "@material-ui/core/styles";
import "@fontsource/comfortaa/300.css";
import "@fontsource/comfortaa/400.css";
import "@fontsource/comfortaa/500.css";
import "@fontsource/comfortaa/700.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/700.css";

export const theme = createTheme({
    palette: {
        type: "light",
        common: {
            black: "#35363a",
            white: "#fafbfc",
            grey: "#E0E0E0",
        },
        primary: {
            main: "#289672",
            light: "#29BB89",
            dark: "#1C694F",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#e9d700",
            light: "#EDDF33",
            dark: "#FFCE89",
        },
        background: {
            default: "#fafbfc",
        },
    },
    text: {
        primary: "#35363A",
        secondary: "#fafbfc",
    },
    typography: {
        htmlFontSize: 16,
        fontFamily: "Comfortaa",
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        button: {
            fontSize: "1.2rem",
            fontWeight: 500,
            letterSpacing: "0.11em",
        },
    },
    props: {
        MuiAppBar: {
            color: "default",
        },
        MuiButtonBase: {
            disableRipple: true,
        },
    },
});

const buttonStyles = makeStyles((theme) => ({
    root: {
        width: (props) => props.width,
        color: (props) =>
            props.background === "primary"
                ? theme.palette.common.white
                : theme.palette.primary.main,
        background: (props) =>
            props.background === "primary"
                ? theme.palette.primary.main
                : theme.palette.secondary.main,
        borderRadius: (props) => props.radius,
        textTransform: (props) => props.texttransform,
        "&:hover": {
            background: (props) =>
                props.background === "primary"
                    ? theme.palette.primary.light
                    : theme.palette.secondary.dark,
        },
    },
    label: {
        padding: "4px 16px",
    },
}));

export const CustomButton = (props) => {
    const { width, background, radius, texttransform, ...other } = props;

    const classes = buttonStyles(props);

    return <Button className={`${classes.root} ${classes.label}`} {...other} />;
};

export const CustomTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.common.grey,
        },
    },
}))(TableRow);

export const CustomHeaderTableCell = withStyles((theme) => ({
    body: {
        fontSize: 16,
    },
}))(TableCell);

export const CustomTableCell = withStyles((theme) => ({
    body: {
        fontSize: 16,
    },
}))(TableCell);
