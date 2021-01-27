import React, {Component} from 'react';
import axios from 'axios';
import NavBar_Customer from "../Customer/NavBar_Customer";

class ShowCart extends Component {
    constructor(props) {
        super(props);
        this.onChangeQty = this.onChangeQty.bind(this)
        this.updateQuantity = this.updateQuantity.bind(this)
        this.onUpdateQty = this.onUpdateQty.bind(this)
        this.MakeOrder = this.MakeOrder.bind(this)
        this.clearCart = this.clearCart.bind(this)
        this.state = {
            carts: [],
            quantity: ""
        }
    }
    onChangeQty(event) {
        this.setState({quantity: event.target.value});
    }
    getCarts() {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/carts', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({carts: response.data.data});
            })
    }
    componentDidMount() {
        this.getCarts()
    }
    updateQuantity(id) {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/cart/edit/' + id, {
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
        const cart = {
            quantity: this.state.quantity,
        }
        let token = localStorage.getItem('token');
        axios.put('http://localhost:8000/api/cart/update/' + id, cart, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                console.log(response.data)
            })
        this.getCarts()
    }
    onDeleteCart(cart_id) {
        let token = localStorage.getItem('token');
        axios.delete('http://localhost:8000/api/cart/' + cart_id, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                let carts = this.state.carts;
                for (let i = 0; i < carts.length; i++) {
                    if (carts[i].id == cart_id) {
                        carts.splice(i, 1);
                        this.setState({carts: carts})
                    }
                }
                this.getCarts()
            })
    }
    getCartsAndGoToOrders() {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/carts', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({carts: response.data.data});
            })
    }
    clearCart() {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/carts', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                let cartsArray = response.data.data;
                console.log(cartsArray)
                for (let i = 0; i < cartsArray.length; i++) {
                    let token = localStorage.getItem('token');
                    let x = cartsArray[i].cart_id;
                    console.log(x)
                    axios.delete('http://localhost:8000/api/cart/' + x, {
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': 'Bearer ' + token // token
                        }
                    })
                        .then(response => {
                            this.getCarts()
                        })
                }
            })
    }
    MakeOrder() {
        let token = localStorage.getItem('token');
        let customer_id = localStorage.getItem('user_id')
        const order = {
            customer: customer_id,
            state: false
        }
        axios.post('http://localhost:8000/api/order/store', order, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                console.log(response.data)
                localStorage.setItem('order_id', response.data.order.id);
                let order_id = localStorage.getItem('order_id')
                let carts = this.state.carts;
                for (let i = 0; i < carts.length; i++) {
                    let x = carts[i].item_id
                    let y = carts[i].quantity
                    const item_order = {
                        order: order_id,
                        item: x,
                        qty: y,
                        state: 0
                    }
                    axios.post('http://localhost:8000/api/item_order/store', item_order, {
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': 'Bearer ' + token // token
                        }
                    })
                        .then(response => {
                            console.log(response.data)
                        })
                    axios.delete('http://localhost:8000/api/cart/' + carts[i].cart_id, {
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': 'Bearer ' + token // token
                        }
                    })
                        .then(response => {
                            console.log(response.data)
                        })
                }
                this.getCartsAndGoToOrders()
            })
    }
    render() {
        return (
            <div className="container">
                <NavBar_Customer/>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-8">
                        <div className="col-sm-3">
                            <button style={{'width': '150px', 'height': '40px'}}
                                    className="btn btn-primary" onClick={this.MakeOrder}>
                                Place Order
                            </button>
                        </div>
                        <br/>
                        <div className="col-sm-3">
                            <button style={{'width': '150px', 'height': '40px'}}
                                    className="btn btn-primary" onClick={this.clearCart}>
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10">
                        <center><b><h1>Your Cart</h1></b></center>
                    </div>
                </div>
                <div>
                    {
                        this.state.carts.map(cart => {
                            return (
                                <div className="row" key={cart.cart_id}>
                                    <div className="col-sm-2"></div>
                                    <div className="col-sm-5">
                                        <b><h1>Name : {cart.name}</h1></b>
                                        <br/>
                                        <b><h6>Category : {cart.category_name}</h6></b>
                                        <br/>
                                        <b><h6>Origin : {cart.origin_name}</h6></b>
                                        <br/>
                                        <b><h6>Size : {cart.size_name}</h6></b>
                                        <br/>
                                        <b><h6>Quantity : {cart.quantity}</h6></b>
                                        <br/>
                                        <button type="button" className="btn btn-warning"
                                                data-toggle="modal"
                                                onClick={this.updateQuantity.bind(this, cart.cart_id)}
                                                data-target={"#edit_quantity" + cart.cart_id}
                                                data-whatever="@mdo">Edit Quantity
                                        </button>
                                        <div style={{
                                            position: 'relative'
                                        }}
                                             className="modal fade" id={"edit_quantity" + cart.cart_id}
                                             tabIndex="-2" role="dialog"
                                             aria-labelledby={"edit_quantity" + cart.cart_id}
                                             aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title"
                                                            id={"edit_quantity" + cart.cart_id}>Edit
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
                                                                        onClick={this.onUpdateQty.bind(this, cart.cart_id)}
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
                                        <button className="btn btn-danger"
                                                onClick={this.onDeleteCart.bind(this, cart.cart_id)}>
                                            Delete
                                        </button>
                                        <br/>
                                        <hr/>
                                    </div>
                                    <div className='col-sm-5'>
                                        <img width="500" height="300"
                                             src={'http://localhost:8000/item_images/' + cart.image_path}
                                             alt=""/>
                                    </div>
                                    <br/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
            ;
    }
}

export default ShowCart;

