import React from 'react';
import TransactionsTable from './TransactionsTable';
import SubmitTransaction from './SubmitTransaction'
import {Container} from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ButtonComponent from "./ButtonComponent";
import Icon from "@material-ui/core/Icon";
import SyncIcon from "@material-ui/icons/Sync";


class RequestTransaction extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            transactions: {},
            transactionRequest: {
                message: '',
                status: ''
            },
            snackBarOpen: false
        }
        this.refresh = this.refresh.bind(this)
        this.submitTransaction = this.submitTransaction.bind(this);
        this.server = 'http://localhost:8000';
    }

    // useEffect(refreshTransactions,[state])
    componentDidMount() {
        this.refresh(this);
    }

    submitTransaction = async function (jsonData) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jsonData)
        };
        let response;
        try {
            response = await fetch(this.server + '/api/transaction', requestOptions).then((res)=>res.json());
            this.setState({...this.state, transactionRequest: response, snackBarOpen: true});
        } catch (err) {
            console.log(err);
            this.setState({...this.state, transactionRequest: err, snackBarOpen: true});
        }
        this.refresh();
    }

    refresh = async function () {
        //setup userId for demo purposes
        const userId = 1;
        try {
            let data = await fetch(this.server + '/api/account/' + userId + '/transactions').then(res => res.json());

            //Convert Date
            data.map((row) => {
                const stringDate = new String(row['endDate']);
                const date = new Date(stringDate.replace('T', ' ').replace('\[UTC\]', '')).toLocaleString()
                row["date"] = date;
            })

            this.setState({
                isLoaded: true,
                transactions: data,
            })

        } catch (err) {
            console.log(err);
            this.setState({
                isLoaded: true,
                err,
            });
        }
    }

    closeSnackBar = () => {this.setState({...this.state,snackBarOpen:false})};


    render() {
            let request = this.state.transactionRequest;
            let snack;
            if (request.status === 'COMPLETED') {
                snack = <Snackbar open={this.state.snackBarOpen} autoHideDuration={6000} onClose={this.closeSnackBar}>
                    <MuiAlert  elevation={6} variant="filled" severity="success" onClose={this.closeSnackBar}>
                        {request.message}
                    </MuiAlert>
                </Snackbar>
            } else if (request.status !== '') {
                snack = <Snackbar open={this.state.snackBarOpen} autoHideDuration={6000} onClose={this.closeSnackBar}>
                    <MuiAlert elevation={6} variant="filled" severity="error" onClose={this.closeSnackBar}>
                        {request.message}
                    </MuiAlert>
                </Snackbar>

            }
            return <Container>
                <TransactionsTable transactions={this.state.transactions} isLoaded={this.state.isLoaded} refresh={this.refresh}/>
                <SubmitTransaction submit={this.submitTransaction}/>
                <ButtonComponent onClick={this.refresh} icon={<Icon><SyncIcon/></Icon>} label="Actualizar"/>
                {snack}
            </Container>
        }
    }

export default RequestTransaction;
