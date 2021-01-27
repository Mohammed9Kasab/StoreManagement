import React, {Component} from 'react';
import axios from 'axios';
import NavBar_Admin from "../Admin/NavBar_Admin";

class ShowDetailsOrder extends Component {
    constructor(props) {
        super(props);
        this.readOrder = this.readOrder.bind(this)
        this.acceptOrder = this.acceptOrder.bind(this)
        this.state = {
            items_order: [],
        }
    }
    readOrder(event) {
        event.preventDefault();
        let order_id = this.props.match.params.id
        let token = localStorage.getItem('token');
        const order = {
            status: 1
        }
        axios.put('http://localhost:8000/api/updateOrderStatusToOne/' + order_id, order, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                console.log(response.data)
                this.props.history.push('/orders')
            })
    }
    acceptOrder(event) {
        event.preventDefault();
        let order_id = this.props.match.params.id
        let token = localStorage.getItem('token');
        const order = {
            status: 2
        }
        axios.put('http://localhost:8000/api/updateOrderStatusToTwo/' + order_id, order, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.props.history.push('/orders')
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
                <NavBar_Admin/>
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
                                                <td scope="row">{item_order.id}</td>
                                                <td scope="row">{item_order.name}</td>
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
                            <form onSubmit={this.acceptOrder}>
                                <button style={{'height': '50px', 'width': '150px'}} className="btn btn-primary"
                                        type="submit">Accept & Send
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowDetailsOrder;


