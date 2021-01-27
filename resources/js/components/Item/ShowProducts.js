import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import NavBar_Customer from "../Customer/NavBar_Customer";

class ShowProducts extends Component {
    constructor(props) {
        super(props);
        this.onChangeQty = this.onChangeQty.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            items: [],
            categories: [],
            origins: [],
            choices: [],
            sizes: [],
            qty: '',
        }
    }

    getItems() {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/items', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({items: response.data.data});
            })
    }

    componentDidMount() {
        this.getItems()
    }

    onChangeQty(event) {
        this.setState({qty: event.target.value});
    }

    onSubmit(id, event) {
        event.preventDefault();
        const cart = {
            item_id: id,
            qty: this.state.qty,
        }
        let token = localStorage.getItem('token');
        axios.post('http://localhost:8000/api/cart/store', cart, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                console.log(response.data)
                this.setState({qty: ' '});
            })
    }

    render() {
        return (
            <div className="container">
                <NavBar_Customer/>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-8">
                        <center><b><h1>Products</h1></b></center>
                    </div>
                    <div className="col-sm-2 ">
                        <Link to={'/cart'}>
                            <button style={{'width': '150px', 'height': '50px'}}
                                    className="btn btn-primary">
                                Your Cart
                            </button>
                        </Link>
                    </div>
                </div>
                <hr/>
                <br/>
                <div>
                    {
                        this.state.items.map(item => {
                            return (
                                <div key={item.id}>
                                    <div className='row' style={{'paddingBottom': '20px'}} key={item.id}>
                                        <div className='col-sm-2'></div>
                                        <div className='col-sm-5'>
                                            <div>
                                                <b><h3>{item.name}</h3></b>
                                                <br/>
                                            </div>
                                            <b><h6>Size : {item.size_name}</h6></b>
                                            <br/>
                                            <b><h6>Country of Origin : {item.origin_name}</h6></b>
                                            <br/>
                                            <b><h6>Category : {item.category_name}</h6></b>
                                            <br/>
                                            <form id={"form_" + item.id}
                                                  onSubmit={(e) => this.onSubmit(item.id, e)}>
                                                <input id={"item_id_" + item.id} name="item_id"
                                                       type="hidden" value={item.id}
                                                />
                                                Quantity: <input
                                                id={"quantity_" + item.id}
                                                type="number"
                                                onChange={this.onChangeQty}
                                                min="1"
                                                max={item.quantity}
                                                placeholder="QTY"/>
                                                <br/>
                                                <br/>
                                                <button id={"button_" + item.id} type="submit"
                                                        className="btn btn-primary">Add To Cart
                                                </button>
                                            </form>
                                        </div>
                                        <div className='col-sm-3'>
                                            <img width="400" height="300"
                                                 src={'http://localhost:8000/item_images/' + item.image_path} alt=""/>
                                        </div>
                                        <br/>
                                        <hr/>
                                    </div>
                                    <hr/>
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

export default ShowProducts;

