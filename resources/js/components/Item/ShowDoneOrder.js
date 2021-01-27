import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import NavBar_Customer from "../Customer/NavBar_Customer";

class ShowDoneOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ReadyOrders: []
        }
    }
    getReadyOrder() {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/DoneOrder', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({ReadyOrders: response.data.data});
            })
    }
    componentDidMount() {
        this.getReadyOrder()
    }
    render() {
        return (
            <div className="container">
                <NavBar_Customer/>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10">
                        <div>
                            <center><h1><b>Orders</b></h1></center>
                        </div>
                        <div>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th scope="col">created_at</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.ReadyOrders.map(ReadyOrder => {
                                        return (
                                            <tr key={ReadyOrder.order_id}>
                                                <td>{ReadyOrder.order_id}</td>
                                                <td>{ReadyOrder.order_time}</td>
                                                <td>
                                                    <Link to={'/ShowAcceptedOrder/' + ReadyOrder.order_id}>
                                                        <button
                                                            className="btn btn-info">
                                                            Show Details
                                                        </button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
            ;
    }
}

export default ShowDoneOrder;

