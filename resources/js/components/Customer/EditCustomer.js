import React, {Component} from 'react';
import axios from 'axios';
import NavBar_Admin from "../Admin/NavBar_Admin";

class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangeAddress = this.onChangeAddress.bind(this)
        this.state = {
            name: "",
            email: "",
            address: "",
        }
    }
    onChangeName(event) {
        this.setState({name: event.target.value});
    }
    onChangeEmail(event) {
        this.setState({email: event.target.value});
    }
    onChangeAddress(event) {
        this.setState({address: event.target.value});
    }
    componentDidMount() {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/customer/edit/' + this.props.match.params.id, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({name: response.data.name});
                this.setState({email: response.data.email});
                this.setState({address: response.data.address});
            })
    }
    onSubmit(event) {
        event.preventDefault();
        const customer = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
        }
        let token = localStorage.getItem('token');
        axios.put('http://localhost:8000/api/customer/update/' + this.props.match.params.id, customer, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                console.log(response.data)
                this.props.history.push('/customers')
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
                            Edit Customer
                            <hr/>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor=" name"> Name</label>
                                    <input type="text"
                                           className="form-control"
                                           id="name"
                                           value={this.state.name}
                                           onChange={this.onChangeName}
                                           placeholder="Enter  Name"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="text"
                                           className="form-control"
                                           id="email"
                                           value={this.state.email}
                                           onChange={this.onChangeEmail}
                                           placeholder="Enter Email"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input type="text"
                                           className="form-control"
                                           id="address"
                                           value={this.state.address}
                                           onChange={this.onChangeAddress}
                                           placeholder="Enter Address"/>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditCustomer;

