import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
            minWidth: 250,
            display: theme.display,
        },
    }
))

function ButtonComponent(props){

    const classes = useStyles();

    return  <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={props.icon}
        onClick = {props.onClick}
    block> {props.label}
    </Button>
}

export default ButtonComponent;

