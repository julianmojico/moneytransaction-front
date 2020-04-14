import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import styles from './styles.module.css';

class TransactionsTable extends React.Component {

    render() {
        if (!this.props.isLoaded) {
            return <p>Loading Transactions...</p>
        } else {
            return <TableContainer className={styles.table} component={Paper}>
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
                            {this.props.transactions.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell align="right">{row.id}</TableCell>
                                    <TableCell align="right">{row.sourceAccount}</TableCell>
                                    <TableCell align="right">{row.destAccount}</TableCell>
                                    <TableCell align="right">{row.date}</TableCell>
                                    <TableCell align="right">{row.amount}</TableCell>
                                    <TableCell align="right">
                                        <Chip label={row.type} color={row.type==="DEBIT"?"primary":"secondary"}/>
                                    </TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        }
    }
}

export default TransactionsTable;