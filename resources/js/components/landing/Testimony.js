import React from "react";
import { Grid, Card, CardContent, Typography, Avatar } from "@material-ui/core";

const Testimony = ({ student, useStyles }) => {
    const classes = useStyles();

    return (
        <Card className={classes.card} variant="outlined">
            <CardContent>
                <Grid container direction="row">
                    <Grid item xs={4}>
                        <Avatar
                            alt={student.name}
                            src="./images/broken_image.png"
                            className={classes.avatar}
                        />
                    </Grid>
                    <Grid
                        item
                        container
                        direction="column"
                        justifyContent="space-evenly"
                        alignItems="flex-start"
                        xs={8}
                    >
                        <Grid item>
                            <Typography color="secondary" component="h6" variant="h3">
                                {student.name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography color="primary" component="span" variant="h6">
                                {student.testimony}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Testimony;
