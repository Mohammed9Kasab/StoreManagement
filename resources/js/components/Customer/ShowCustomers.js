import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import NavBar_Admin from "../Admin/NavBar_Admin";

class ShowCustomers extends Component {
    constructor() {
        super();
        this.state = {
            customers: [],
        }
    }
    componentDidMount() {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/customers', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({customers: response.data.data});
            })
    }
    onDelete(customer_id) {
        let token = localStorage.getItem('token');
        axios.delete('http://localhost:8000/api/customer/' + customer_id, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                let customers = this.state.customers;
                for (let i = 0; i < customers.length; i++) {
                    if (customers[i].id == customer_id) {
                        customers.splice(i, 1);
                        this.setState({customers: customers})
                    }
                }
            })
    }
    render() {
        return (
            <div className="container">
                <NavBar_Admin/>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-3">
                        <Button className="addxx"
                            fullWidth
                            variant="contained"
                            color="primary"
                            component={Link} to={'/createCustomer'}
                        >
                            Add New Customer
                        </Button>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.customers.map(customer => {
                                return (
                                    <tr scope={customer.id}>
                                        <td>{customer.name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.address}</td>
                                        <td>
                                            <Link to={'/customer/edit/'+ customer.id}>
                                                <button
                                                        className="btn btn-warning">
                                                    Edit
                                                </button>
                                            </Link>
                                            {" "}
                                            <button className="btn btn-danger"  onClick={this.onDelete.bind(this, customer.id)}>
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
        );
    }
}

export default ShowCustomers;


