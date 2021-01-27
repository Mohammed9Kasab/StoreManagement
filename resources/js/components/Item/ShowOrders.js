import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Pusher from "pusher-js"
import NavBar_Admin from "../Admin/NavBar_Admin";

class ShowOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UnreadOrders: [],
            AcceptOrders: []
        }
    }
    getUnReadOrders() {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/UnreadOrder', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({UnreadOrders: response.data.data});
                let UnreadOrders = this.state.UnreadOrders;
                for (let i = 0; i < UnreadOrders.length; i++) {
                    let order_id = UnreadOrders[i].order_id
                    let token = localStorage.getItem('token');
                    const order = {
                        status: 0
                    }
                    axios.put('http://localhost:8000/api/updateOrderStatusToZero/' + order_id, order, {
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
            })
    }

    componentDidMount() {
        this.getUnReadOrders();
        this.getAcceptOrder();
        let pusher = new Pusher('64b0688286b9900e5b10', {
            cluster: 'ap2',
            forceTLS: true,
            encrypted: true
        });
        let channel = pusher.subscribe('store-management');
        channel.bind('new-order', function (data) {

            console.log(data['order'])
        })
    }

    render() {
        return (
            <div className="container">
                <NavBar_Admin/>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10">
                        <div>
                            <center><h1><b>New Orders</b></h1></center>
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
                                    this.state.UnreadOrders.map(UnreadOrders => {
                                        return (
                                            <tr key={UnreadOrders.order_id}>
                                                <td scope="row">{UnreadOrders.order_id}</td>
                                                <td>{UnreadOrders.customer_name}</td>
                                                <td>{UnreadOrders.customer_email}</td>
                                                <td>{UnreadOrders.order_time}</td>
                                                <td>
                                                    <Link to={'/ShowOrder/' + UnreadOrders.order_id}>
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
                            <center><h1><b>Accepted & Sent Orders</b></h1></center>
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
                                                    <Link to={'/ShowOrder/' + AcceptOrder.order_id}>
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

export default ShowOrders;

