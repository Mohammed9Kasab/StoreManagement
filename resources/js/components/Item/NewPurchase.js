import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import NavBar_Admin from "../Admin/NavBar_Admin";

class NewPurchase extends Component {
    constructor(props) {
        super(props);
        this.onChangeVendor = this.onChangeVendor.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.onChangeSearch = this.onChangeSearch.bind(this)
        this.onChangeQty = this.onChangeQty.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            vendors: [],
            items: [],
            search: "",
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

    onChangeVendor(event) {
        this.setState({update_category_name: event.target.value});
    }

    onChangeSearch(event) {
        this.setState({search: event.target.value});
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

    componentDidMount() {
        this.getVendors()
        this.getItems()
    }

    onSearch(event) {
        event.preventDefault();
        const searchWord = {
            word: this.state.search
        }
        let token = localStorage.getItem('token');
        axios.post('http://localhost:8000/api/searchForItems', searchWord, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({items: response.data.data});
            })
    }

    onChangeQty(event) {
        this.setState({qty: event.target.value});
    }

    onSubmit(id, event) {
        event.preventDefault();
        const basket = {
            item_id: id,
            qty: this.state.qty,
        }
        let token = localStorage.getItem('token');
        axios.post('http://localhost:8000/api/basket/store', basket, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({qty: ' '});
            })
    }

    render() {
        return (
            <div className="container">
                <NavBar_Admin/>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-2 ">
                        <Link to={'/purchase_cart'}>
                            <button
                                className="btn btn-primary">
                                Your Purchase
                            </button>
                        </Link>
                    </div>
                    <div className="col-sm-3">
                    </div>
                    <div className="col-sm-5 ">
                        <form onSubmit={this.onSearch}>
                            <div className="form-group">
                                <input type="text"
                                       className="form-control"
                                       id="name"
                                       value={this.state.search}
                                       onChange={this.onChangeSearch}
                                       placeholder="Search"/>
                            </div>
                            <div className="form-check-inline">
                                <label className="form-check-label">
                                    <input type="radio" className="form-check-input" name="optradio"/>Name
                                </label>
                            </div>
                            <div className="form-check-inline">
                                <label className="form-check-label">
                                    <input type="radio" className="form-check-input" name="optradio"/>Size
                                </label>
                            </div>
                            <div className="form-check-inline">
                                <label className="form-check-label">
                                    <input type="radio" className="form-check-input" name="optradio"/>Choice
                                </label>
                            </div>
                            <div className="form-check-inline">
                                <label className="form-check-label">
                                    <input type="radio" className="form-check-input" name="optradio"/>Origin
                                </label>
                            </div>
                            <div className="form-check-inline">
                                <label className="form-check-label">
                                    <input type="radio" className="form-check-input" name="optradio"/>Category
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary">Search</button>
                        </form>
                    </div>
                </div>
                <hr/>
                <br/>
                <div>
                    {
                        this.state.items.map(item => {
                            return (
                                <div>
                                    <div className='row' style={{'paddingBottom': '20px'}} key={item.id}>
                                        <div className='col-sm-2'></div>
                                        <div className='col-sm-5'>
                                            <div>
                                                <b><h3>{item.name}</h3></b>
                                                <br/>
                                            </div>
                                            <b><h6>Size : {item.size_name}</h6></b>
                                            <br/>
                                            <b><h6>Origin : {item.origin_name}</h6></b>
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
                                                placeholder="QTY"/>
                                                <br/>
                                                <br/>
                                                <button id={"button_" + item.id} type="submit"
                                                        className="btn btn-primary">Add
                                                </button>
                                            </form>
                                        </div>
                                        <div className='col-sm-4'>
                                            <img width="500" height="300"
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

export default NewPurchase;

