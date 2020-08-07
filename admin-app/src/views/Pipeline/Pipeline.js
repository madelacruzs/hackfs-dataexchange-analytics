import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Card, CardHeader, CardContent, CardActions, Divider, Grid, Button, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ["Identify dataset content", "Select AI Model", "Training algorithm", "Generate visualization"];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return "Identify dataset content...";
        case 1:
            return "Select AI Model";
        case 2:
            return "Training algorithm";
        case 3:
            return "Generate visualization";
        default:
            return "Unknown step";
    }
}

const Pipeline = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

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
                                        <Stepper activeStep={activeStep}>
                                            {steps.map((label, index) => {
                                                const stepProps = {};
                                                const labelProps = {};
                                                if (isStepOptional(index)) {
                                                    labelProps.optional = <Typography variant="caption">Optional</Typography>;
                                                }
                                                if (isStepSkipped(index)) {
                                                    stepProps.completed = false;
                                                }
                                                return (
                                                    <Step key={label} {...stepProps}>
                                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                                    </Step>
                                                );
                                            })}
                                        </Stepper>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <div>
                                    {activeStep === steps.length ? (
                                        <div>
                                            <Typography className={classes.instructions}>All steps completed - you&apos;re finished</Typography>
                                            <Button onClick={handleReset} className={classes.button}>
                                                Reset
                                            </Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                            <div>
                                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                                    Back
                                                </Button>
                                                {isStepOptional(activeStep) && (
                                                    <Button variant="contained" color="primary" onClick={handleSkip} className={classes.button}>
                                                        Skip
                                                    </Button>
                                                )}

                                                <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                                                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardActions>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default Pipeline;
