import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
    content: {
        paddingTop: 150,
        textAlign: "center",
    },
    image: {
        marginTop: 50,
        display: "inline-block",
        maxWidth: "100%",
        width: 560,
    },
}));

const NoMetamask = (props) => {
    const classes = useStyles();

    const onClick = () => {
        window.location.reload(true);
    };

    return (
        <div className={classes.root}>
            <Grid container justify="center" spacing={4}>
                <Grid item lg={6} xs={12}>
                    <div className={classes.content}>
                        <Typography variant="h1">MetaMask is not connected!</Typography>

                        <Typography variant="subtitle2">
                            <Button color="primary" variant="contained" onClick={onClick}>
                                Connect Wallet
                            </Button>
                        </Typography>

                        <img alt="Under development" className={classes.image} src="/images/not_found.png" />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default NoMetamask;
