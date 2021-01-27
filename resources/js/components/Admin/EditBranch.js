import React, {Component} from 'react';
import axios from 'axios';
import NavBar_Admin from "./NavBar_Admin";

class EditBranch extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeAddress = this.onChangeAddress.bind(this)
        this.onChangeManager = this.onChangeManager.bind(this)
        this.state = {
            name: "",
            address: "",
            manager_id: 0,
            managers: []
        }
    }
    onChangeName(event) {
        this.setState({name: event.target.value});
    }
    onChangeAddress(event) {
        this.setState({address: event.target.value});
    }
    onChangeManager(event) {
        this.setState({manager_id: event.target.value});
    }
    componentDidMount() {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/managers', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({managers: response.data.data});
            })
        axios.get('http://localhost:8000/api/branch/edit/' + this.props.match.params.id, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({name: response.data.name});
                this.setState({address: response.data.address});
                this.setState({manager_id: response.data.manager_id});
            })
    }
    onSubmit(event) {
        event.preventDefault();
        const branch = {
            name: this.state.name,
            address: this.state.address,
            manager_id: this.state.manager_id,
        }
        let token = localStorage.getItem('token');
        axios.put('http://localhost:8000/api/branch/update/' + this.props.match.params.id, branch, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.props.history.push('/employees')
            })
    }
    render() {
        return (
            <div className="container">
                <NavBar_Admin/>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10">
                        Edit Branch
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
                                    <label htmlFor="address">Address</label>
                                    <input type="text"
                                           className="form-control"
                                           id="address"
                                           value={this.state.address}
                                           onChange={this.onChangeAddress}
                                           placeholder="Enter Address"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="manager">Manager Name</label>
                                    <select id="manager" value={this.state.manager_id}
                                            onChange={this.onChangeManager}
                                            className="form-control">
                                        {
                                            this.state.managers.map(manager => {
                                                return (
                                                    <option selected value={manager.id}>{manager.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                </div>
            </div>
        );
    }
}
export default EditBranch;


