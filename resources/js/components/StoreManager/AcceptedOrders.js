import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Pusher from "pusher-js";
import NavBar_StoreManager from "./NavBar_StoreManager";

class AcceptedOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AcceptOrders: [],
            AcceptOrdersAndRead: [],
            AcceptOrdersAndDone: []
        }
    }

    getAcceptOrder() {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/acceptOrder', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({AcceptOrders: response.data.data});
                let AcceptOrders = this.state.AcceptOrders;
                for (let i = 0; i < AcceptOrders.length; i++) {
                    let order_id = AcceptOrders[i].order_id
                    let token = localStorage.getItem('token');
                    const order = {
                        status: 3
                    }
                    axios.put('http://localhost:8000/api/updateAcceptOrders/' + order_id, order, {
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': 'Bearer ' + token // token
                        }
                    })
                        .then(response => {
                            console.log(response.data)
                        })
                }
            })
    }

    getAcceptOrderAndRead() {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/acceptOrderAndRead', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({AcceptOrdersAndRead: response.data.data});
            })
    }

    getAcceptOrderAndDone() {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/acceptOrderAndDone', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({AcceptOrdersAndDone: response.data.data});
            })
    }

    componentDidMount() {
        this.getAcceptOrder();
        this.getAcceptOrderAndRead()
        this.getAcceptOrderAndDone()
        let pusher = new Pusher('64b0688286b9900e5b10', {
            cluster: 'ap2',
            forceTLS: true,
            encrypted: true
        });
        let channel = pusher.subscribe('store-management');
        channel.bind('send_order_to_store', function (data) {

            console.log(data['order'])
        })
    }

    render() {
        return (
            <div className="container">
                <NavBar_StoreManager/>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10">
                        <div>
                            <center><h1><b>Received Orders</b></h1></center>
                        </div>
                        <div>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Customer Name</th>
                                    <th scope="col">Customer Email</th>
                                    <th scope="col">Created_at</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.AcceptOrders.map(AcceptOrder => {
                                        return (
                                            <tr key={AcceptOrder.order_id}>
                                                <td scope="row">{AcceptOrder.order_id}</td>
                                                <td>{AcceptOrder.customer_name}</td>
                                                <td>{AcceptOrder.customer_email}</td>
                                                <td>{AcceptOrder.order_time}</td>
                                                <td>
                                                    <Link to={'/ShowAcceptedOrder/' + AcceptOrder.order_id}>
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
                        <hr/>
                        <div>
                            <center><h1><b>Orders Ready To Pick-up</b></h1></center>
                        </div>
                        <div>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Customer Name</th>
                                    <th scope="col">Customer Email</th>
                                    <th scope="col">Created_at</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.AcceptOrdersAndDone.map(AcceptOrderAndDone => {
                                        return (
                                            <tr key={AcceptOrderAndDone.order_id}>
                                                <td scope="row">{AcceptOrderAndDone.order_id}</td>
                                                <td>{AcceptOrderAndDone.customer_name}</td>
                                                <td>{AcceptOrderAndDone.customer_email}</td>
                                                <td>{AcceptOrderAndDone.order_time}</td>
                                                <td>
                                                    <Link to={'/ShowAcceptedOrder/' + AcceptOrderAndDone.order_id}>
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

export default AcceptedOrders;


