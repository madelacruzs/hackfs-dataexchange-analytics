import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Card, CardHeader, CardContent, CardActions, Divider, Grid, Button, TextField } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";

// import { Budget, TotalUsers, TasksProgress, TotalProfit, LatestSales, UsersByDevice, LatestProducts, LatestOrders } from "./components";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
}));

const UploadDataSet = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={4}>
                <Grid item lg={12} sm={12} xl={12} xs={12}>
                    <Card>
                        <form autoComplete="off" noValidate>
                            <CardHeader
                                subheader="Select a dataset that you want to sell what you want to do some analysis"
                                title="Upload Datasets"
                            />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item md={12} xs={12}>
                                        <DropzoneArea filesLimit="1" />
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Button color="primary" variant="outlined">
                                    Submit
                                </Button>
                            </CardActions>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default UploadDataSet;
