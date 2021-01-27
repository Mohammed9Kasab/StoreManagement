import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import NavBar_Admin from "../Admin/NavBar_Admin";

class ShowSuppliers extends Component {
    constructor() {
        super();
        this.state = {
            suppliers: [],
        }
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/suppliers', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({suppliers: response.data.data});
            })
    }

    onDelete(supplier_id) {
        let token = localStorage.getItem('token');
        axios.delete('http://localhost:8000/api/supplier/' + supplier_id, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                let suppliers = this.state.suppliers;
                for (let i = 0; i < suppliers.length; i++) {
                    if (suppliers[i].id == supplier_id) {
                        suppliers.splice(i, 1);
                        this.setState({suppliers: suppliers})
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
                    <div className="col-sm-4">
                        <Button className="addxx"
                                fullWidth
                                variant="contained"
                                color="primary"
                                component={Link} to={'/createSupplier'}
                        >
                            Add New Supplier
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
                                this.state.suppliers.map(supplier => {
                                    return (
                                        <tr scope={supplier.id}>
                                            <td>{supplier.name}</td>
                                            <td>{supplier.email}</td>
                                            <td>{supplier.address}</td>
                                            <td>
                                                <Link to={'/supplier/edit/' + supplier.id}>
                                                    <button
                                                        className="btn btn-warning">
                                                        Edit
                                                    </button>
                                                </Link>
                                                {" "}
                                                <button className="btn btn-danger"
                                                        onClick={this.onDelete.bind(this, supplier.id)}>
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
                <div className="row">
                </div>
            </div>
        );
    }
}

export default ShowSuppliers;


