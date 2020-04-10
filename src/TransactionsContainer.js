import React from 'react';
import TransactionsComponent from './TransactionsComponent';

class TransactionsContainer extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            transactions: {}
        }
        this.refresh = this.refresh.bind(this);
    }

    // useEffect(refreshTransactions,[state])
    componentDidMount() {
        this.refresh(this);
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     this.refreshTransactions();
    // }

    refresh = async function() {

        try {
            let data = await fetch('http://localhost:8000/api/account/1/transactions').then(res => res.json());

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

    render(){
        return <TransactionsComponent props={this.state} onClick={this.refresh} />
    }

}

export default TransactionsContainer;
