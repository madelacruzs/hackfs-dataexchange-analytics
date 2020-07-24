import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import { Identicon, EthAddress } from "ethereum-react-components";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "fit-content",
    },
    avatar: {
        width: 60,
        height: 60,
    },
    name: {
        marginTop: theme.spacing(1),
    },
}));

const Profile = (props) => {
    const { className, ...rest } = props;

    const classes = useStyles();

    const user = {
        name: "Shen Zhi",
        avatar: "/images/avatars/avatar_11.png",
        bio: "Brain Director",
    };

    return (
        <div {...rest} className={clsx(classes.root, className)}>
            {/* <div>
                <AccountItem name="Account 1" address="0x4444444444444444444444444444444444444444" />
            </div>
            <Avatar alt="Person" className={classes.avatar} component={RouterLink} src={user.avatar} to="/account" /> */}

            <div>
                <Identicon address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D" component={RouterLink} to="/account" />
            </div>
            <Typography className={classes.name} variant="h4">
                3.5 ETH
            </Typography>
            <Typography variant="body2">
                <EthAddress short address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D" />
            </Typography>
        </div>
    );
};

Profile.propTypes = {
    className: PropTypes.string,
};

export default Profile;
