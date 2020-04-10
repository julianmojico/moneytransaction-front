import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ButtonComponent from './ButtonComponent';
import SyncIcon from "@material-ui/icons/Sync";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import {Container} from '@material-ui/core';

//function TransactionsComponent(props) {
class TransactionsComponent extends React.Component {

    render() {
        if (!this.props.props.isLoaded) {
            return <Container>
                     return <p>Loading Transactions...</p>
                </Container>
        } else {
            return <Container>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Transaccion Nº</TableCell>
                                <TableCell align="right">Remitente</TableCell>
                                <TableCell align="right">Destinatario</TableCell>
                                <TableCell align="right">Fecha</TableCell>
                                <TableCell align="right">Monto</TableCell>
                                <TableCell align="right">Método</TableCell>
                                <TableCell align="right">Descripcion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.props.transactions.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell align="right">{row.id}</TableCell>
                                    <TableCell align="right">{row.sourceAccount}</TableCell>
                                    <TableCell align="right">{row.destAccount}</TableCell>
                                    <TableCell align="right">{row.date}</TableCell>
                                    <TableCell align="right">{row.amount}</TableCell>
                                    <TableCell align="right">{row.type}</TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <ButtonComponent onClick={this.props.onClick} icon={<Icon><SyncIcon/></Icon>} label="Actualizar"/>
                <ButtonComponent icon={<Icon><SendIcon/></Icon>} label={"Nueva"}/>
            </Container>
        }
    }
}

export default TransactionsComponent;