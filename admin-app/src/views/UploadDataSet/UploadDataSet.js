import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Card, CardHeader, CardContent, CardActions, Divider, Grid, Button, TextField } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import ReactFileReader from "react-file-reader";

// import fs from "fs";

// const ipfsAPI = require("ipfs-http-client");
const ipfsAPI = require("ipfs-api");

const ipfs = ipfsAPI({ host: "ipfs.infura.io", port: "5001", protocol: "https" });
const { BufferList } = require("bl");
// const fs = require("fs");
const FormData = require("form-data");

// import { Budget, TotalUsers, TasksProgress, TotalProfit, LatestSales, UsersByDevice, LatestProducts, LatestOrders } from "./components";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
}));

const getFromIPFS = async (hashToGet) => {
    for await (const file of ipfs.get(hashToGet)) {
        console.log(file.path);
        if (!file.content) continue;
        const content = new BufferList();
        for await (const chunk of file.content) {
            content.append(chunk);
        }
        console.log(content);
        return content;
    }
};

const addToIPFS = async (fileToUpload) => {
    const fileReader = new FileReader();
    let content = null;

    fileReader.readAsArrayBuffer(fileToUpload);

    fileReader.onloadend = function(event) {
        // The file's text will be printed here
        content = fileReader.result;
        console.log("IMAGE LOADED 1: ", fileReader.result);

        const files = [
            {
                path: fileToUpload.name,
                content: Buffer.from(fileReader.result),
            },
        ];

        console.log("IMAGE LOADED : ", content);

        ipfs.files.add(files, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
            return result;
        });
    };

    // for await (const result of ipfs.add("elkike")) {
    //     return result;
    // }
};

const UploadDataSet = () => {
    const classes = useStyles();

    const [data, setData] = useState();
    const [file, setFile] = useState();
    const [sending, setSending] = useState();
    const [loading, setLoading] = useState();
    const [ipfsHash, setIpfsHash] = useState();
    const [ipfsContents, setIpfsContents] = useState();
    const [attestationContents, setAttestationContents] = useState();

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
                                        <DropzoneArea
                                            filesLimit={1}
                                            onChange={(files) => {
                                                //readFile(files[0]);
                                                const file = files[0];
                                                setFile(file);

                                                // console.log(contents);
                                                // setData(contents);
                                                // console.log("cambio...", reader.readAsText(files[0]));
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    onClick={async () => {
                                        console.log("UPLOADING...");
                                        setSending(true);
                                        setIpfsHash();
                                        setIpfsContents();

                                        const result = await addToIPFS(file);
                                        if (result && result.path) {
                                            setIpfsHash(result.path);
                                        }
                                        setSending(false);
                                        console.log("RESULT:", result);
                                    }}
                                >
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
