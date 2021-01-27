import React, {Component} from 'react';
import axios from 'axios';
import NavBar_StoreManager from "./NavBar_StoreManager";

class ShowOrderDetailsInsideStore extends Component {
    constructor(props) {
        super(props);
        this.readAcceptedOrder = this.readAcceptedOrder.bind(this)
        this.DoneAcceptedOrder = this.DoneAcceptedOrder.bind(this)
        this.state = {
            items_order: [],
        }
    }

    readAcceptedOrder(event) {
        event.preventDefault();
        let order_id = this.props.match.params.id
        let token = localStorage.getItem('token');
        const order = {
            status: 4
        }
        axios.put('http://localhost:8000/api/updateAcceptOrderToRead/' + order_id, order, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.props.history.push('/AcceptedOrders')
            })
    }

    DoneAcceptedOrder(event) {
        event.preventDefault();
        let order_id = this.props.match.params.id
        let token = localStorage.getItem('token');
        const order = {
            status: 5
        }
        axios.put('http://localhost:8000/api/updateAcceptOrderToDone/' + order_id, order, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.props.history.push('/AcceptedOrders')
            })
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/showOrderById/' + this.props.match.params.id, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({items_order: response.data.data});
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
                            <center><h1><b> Order Details</b></h1></center>
                        </div>
                        <div>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Item ID</th>
                                    <th scope="col">Item name</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Origin</th>
                                    <th scope="col">Choice</th>
                                    <th scope="col">Size</th>
                                    <th scope="col">Quantity</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.items_order.map(item_order => {
                                        return (
                                            <tr key={item_order.id}>
                                                <td>{item_order.id}</td>
                                                <td>{item_order.name}</td>
                                                <td>{item_order.category_name}</td>
                                                <td>{item_order.origin_name}</td>
                                                <td>{item_order.choice_name}</td>
                                                <td>{item_order.size_name}</td>
                                                <td>{item_order.item_quantity}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                            <form onSubmit={this.DoneAcceptedOrder}>
                                <button style={{'height': '50px', 'width': '200px'}} className="btn btn-primary"
                                        type="submit">Mark As Ready Order
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowOrderDetailsInsideStore;


