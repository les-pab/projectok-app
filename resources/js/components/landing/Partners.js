import React, { useState, useEffect } from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import { fetchPartners } from "./Service.js";
import Carousel from "react-material-ui-carousel";
import Partner from "./Partner.js";

const Partners = ({ useStyles }) => {
    const classes = useStyles();

    const [partners, setPartners] = useState([]);
    useEffect(() => {
        const getPartners = async () => {
            const response = await fetchPartners();
            switch (response.status) {
                case 200:
                    setPartners(response.data);
                    break;
            }
        };

        getPartners();
    }, []);

    return (
        <div id="partner-universities" className={classes.partners}>
            <Container>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item className={classes.grid_item}>
                        <Typography color="primary" variant="h3">
                            Available for students from 57 Higher Education
                            Institutions in CAR
                        </Typography>
                    </Grid>
                    <Grid item className={classes.grid_item}>
                        <Carousel
                            timeout={1000}
                            interval={6000}
                            navButtonsAlwaysInvisible={true}
                        >
                            {partners.map((partner, key) => (
                                <Partner
                                    key={key}
                                    partner={partner}
                                    useStyles={useStyles}
                                />
                            ))}
                        </Carousel>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Partners;
