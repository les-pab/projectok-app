import React from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import Testimony from "./Testimony";

const Testimonies = ({ useStyles }) => {
    const classes = useStyles();

    var students = [
        {
            name: "Nessie Gislebert",
            avatar: "https://robohash.org/nequeautemfuga.png?size=50x50&set=set1",
            testimony:
                "“Things I was ashamed of and felt guilt for were common in the group. It was a profound and powerful experience.”",
        },
        {
            name: "Dorree Jee",
            avatar: "https://robohash.org/delectuspraesentiumasperiores.png?size=50x50&set=set1",
            testimony:
                "“Project OK is doing an excellent job by creating a platform where students feel comfortable in expressing themselves.”",
        },
        {
            name: "Kendricks Penni",
            avatar: "https://robohash.org/sequiestet.png?size=50x50&set=set1",
            testimony:
                "“It might sound silly but, sharing my thoughts with someone was super empowering.”",
        },
    ];

    return (
        <div id="testimonies" className={classes.testimonies}>
            <Container maxWidth="md">
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item className={classes.grid_item}>
                        <Typography color="primary" variant="h3">
                            Testimonies from students
                        </Typography>
                    </Grid>
                    <Grid item className={classes.grid_item}>
                        <Carousel
                            timeout={1000}
                            interval={6000}
                            navButtonsAlwaysInvisible={true}
                        >
                            {students.map((student, key) => (
                                <Testimony
                                    key={key}
                                    student={student}
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

export default Testimonies;
