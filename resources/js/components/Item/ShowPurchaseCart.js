import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import NavBar_Admin from "../Admin/NavBar_Admin";

class ShowPurchaseCart extends Component {
    constructor() {
        super();
        this.onChangeQty = this.onChangeQty.bind(this)
        this.updateQuantity = this.updateQuantity.bind(this)
        this.onUpdateQty = this.onUpdateQty.bind(this)
        this.state = {
            baskets: [],
            quantity: 0,
            vendors: [],
            vendor_id: 0
        }
    }

    onChangeQty(event) {
        this.setState({quantity: event.target.value});
    }

    onChangeVendor(event) {
        let vendor_id = event.target.value;
        localStorage.setItem('vendor_id', vendor_id);
    }

    updateQuantity(id) {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/basket/edit/' + id, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({quantity: response.data.quantity});
            })
    }

    onUpdateQty(id) {
        const basket = {
            quantity: this.state.quantity,
        }
        let token = localStorage.getItem('token');
        axios.put('http://localhost:8000/api/basket/update/' + id, basket, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                console.log(response.data)
            })
        this.getBasket()
    }

    onDeleteBasket(basket_id) {
        let token = localStorage.getItem('token');
        axios.delete('http://localhost:8000/api/basket/' + basket_id, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                let baskets = this.state.baskets;
                for (let i = 0; i < baskets.length; i++) {
                    if (baskets[i].id == basket_id) {
                        baskets.splice(i, 1);
                        this.setState({baskets: baskets})
                    }
                }
                this.getBasket()
            })
    }

    getBasket() {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/purchaseItems', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({baskets: response.data.data});
            })
    }

    componentDidMount() {
        this.getBasket()
        this.getVendors()
    }

    getVendors() {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/suppliers', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({vendors: response.data.data});
            })
    }

    MakePurchase() {

    }
    getCartsAndGoToOrders() {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/xx', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({baskets: response.data.data});
            })
    }
    render() {
        return (
            <div className="container">
                <NavBar_Admin/>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-4">
                        <label htmlFor="size">Vendor Name</label>
                        <select
                            className="form-control"
                            onChange={this.onChangeVendor}
                        >
                            <option>select the vendor</option>
                            {
                                this.state.vendors.map(vendor => {
                                    return (
                                        <option value={vendor.id}>{vendor.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="col-sm-3"></div>
                    <div className="col-sm-2 ">
                        {/*<Link to={'/cart'}>*/}
                            <button
                                onClick={this.MakePurchase}
                                style={{'width': '150px', 'height': '50px'}}
                                className="btn btn-primary">
                                Place Purchase
                            </button>
                        {/*</Link>*/}
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Size</th>
                                <th scope="col">Category</th>
                                <th scope="col">Origin</th>
                                <th scope="col">Choice</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.baskets.map(basket => {
                                    return (
                                        <tr scope={basket.basket_id}>
                                            <td>{basket.basket_id}</td>
                                            <td>{basket.name}</td>
                                            <td>{basket.size_name}</td>
                                            <td>{basket.category_name}</td>
                                            <td>{basket.origin_name}</td>
                                            <td>{basket.choice_name}</td>
                                            <td>{basket.quantity}</td>
                                            <td>
                                                <button type="button" className="btn btn-warning"
                                                        data-toggle="modal"
                                                        onClick={this.updateQuantity.bind(this, basket.basket_id)}
                                                        data-target={"#edit_quantity" + basket.basket_id}
                                                        data-whatever="@mdo">Edit Quantity
                                                </button>
                                                <div style={{
                                                    position: 'relative'
                                                }}
                                                     className="modal fade" id={"edit_quantity" + basket.basket_id}
                                                     tabIndex="-2" role="dialog"
                                                     aria-labelledby={"edit_quantity" + basket.basket_id}
                                                     aria-hidden="true">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title"
                                                                    id={"edit_quantity" + basket.basket_id}>Edit
                                                                    Quantity</h5>
                                                                <button type="button" className="close"
                                                                        data-dismiss="modal"
                                                                        aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <form>
                                                                    <div className="form-group">
                                                                        <label htmlFor="recipient-name"
                                                                               className="col-form-label">Quantity:</label>
                                                                        <input type="text"
                                                                               value={this.state.quantity}
                                                                               onChange={this.onChangeQty}
                                                                               className="form-control"
                                                                               id="recipient-name"/>
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <button type="button"
                                                                                className="btn btn-secondary"
                                                                                data-dismiss="modal">Close
                                                                        </button>
                                                                        <button type="button"
                                                                                onClick={this.onUpdateQty.bind(this, basket.basket_id)}
                                                                                className="btn btn-primary"
                                                                                data-dismiss="modal">update
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {" "}
                                                <button className=" btn btn-danger"
                                                        onClick={this.onDeleteBasket.bind(this, basket.basket_id)}>
                                                    Delete
                                                </button>
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
        )
            ;
    }
}

export default ShowPurchaseCart;

