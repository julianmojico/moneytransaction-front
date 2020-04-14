import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from "@material-ui/core/Icon";
import SendIcon from "@material-ui/icons/Send";
import ButtonComponent from "./ButtonComponent";
import Button from "@material-ui/core/Button";
import {makeStyles} from '@material-ui/core/styles';
import {Input} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import styles from './styles.module.css'


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default function SubmitTransaction(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const [inputs, setInputs] = React.useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        let eventInfo = {
            ...inputs,
            [name]: event.target.value,
        }
        setInputs(eventInfo)
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.checkValidity()
        props.submit.bind(this,inputs).call();
        handleClose();
    }

    return (
        <div>
            <ButtonComponent onClick={handleClickOpen} icon={<Icon><SendIcon/></Icon>} label={"Nueva"}/>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Nueva Transaccion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Complete los datos
                    </DialogContentText>
                    <form id="form" className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Cuenta de origen"
                            type="number"
                            fullWidth
                            name='sourceAccount'
                            value={inputs.sourceAccount || ''}
                            required={"true"}
                            onChange={handleChange}
                            placeholder={"1 es la cuenta por defecto"}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="destAccount"
                            value={inputs.destAccount || ''}
                            label="Cuenta destino"
                            type="number"
                            fullWidth
                            onChange={handleChange}
                            required={"true"}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Monto a enviar"
                            type="number"
                            fullWidth
                            name='amount'
                            value={inputs.amount || ''}
                            onChange={handleChange}
                            required={"true"}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Descripción"
                            type="text"
                            fullWidth
                            name='description'
                            value={inputs.description || ''}
                            onChange={handleChange}
                            required={"true"}
                        />
                        <label>Tipo</label>
                        <select name="type"  value={inputs.type} required onChange={handleChange}>
                            <option></option>
                            <option value={'DEBIT'}>Débito</option>
                            <option value={'CREDIT'}>Crédito</option>
                        </select>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button form="form"  type="submit" value="Submit" color="primary">
                        Listo
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}
