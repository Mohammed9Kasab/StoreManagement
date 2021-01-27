import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import NavBar_Admin from "./NavBar_Admin";

class EmployeePage extends Component {
    constructor() {
        super();
        this.state = {
            managers: [],
            members: [],
            branches: [],
        }
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
        axios.get('http://localhost:8000/api/members', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({members: response.data.data});
            })
        axios.get('http://localhost:8000/api/branches', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({branches: response.data.data});
            })
    }
    onDeleteManager(manager_id) {
        let token = localStorage.getItem('token');
        axios.delete('http://localhost:8000/api/manager/' + manager_id, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                let managers = this.state.managers;
                for (let i = 0; i < managers.length; i++) {
                    if (managers[i].id == manager_id) {
                        managers.splice(i, 1);
                        this.setState({managers: managers})
                    }
                }
            })
    }
    onDeleteMember(member_id) {
        let token = localStorage.getItem('token');
        axios.delete('http://localhost:8000/api/member/' + member_id, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                let members = this.state.members;
                for (let i = 0; i < members.length; i++) {
                    if (members[i].id == member_id) {
                        members.splice(i, 1);
                        this.setState({members: members})
                    }
                }
            })
    }
    onDeleteBranch(branch_id) {
        let token = localStorage.getItem('token');
        axios.delete('http://localhost:8000/api/branch/' + branch_id, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                let branches = this.state.branches;
                for (let i = 0; i < branches.length; i++) {
                    if (branches[i].id == branch_id) {
                        branches.splice(i, 1);
                        this.setState({branches: branches})
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
                    <div className="col-sm-10">
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home"
                                   role="tab" aria-controls="pills-home" aria-selected="true"><b>Branches</b></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile"
                                   role="tab" aria-controls="pills-profile" aria-selected="false"><b>Managers</b></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact"
                                   role="tab" aria-controls="pills-contact" aria-selected="false"><b>Members</b></a>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                                 aria-labelledby="pills-home-tab">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <Button className="addxx"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            component={Link} to={'/createBranch'}
                                        >
                                            Add New Branch
                                        </Button>
                                    </div>
                                </div>
                                <br/>
                                <div>
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Manager Name</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.branches.map(branch => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{branch.id}</th>
                                                        <td>{branch.name}</td>
                                                        <td>{branch.address}</td>
                                                        <td>{branch.manager_name}</td>
                                                        <td>
                                                            <Link to={'/branch/edit/'+ branch.id}>
                                                                <button
                                                                    className="btn btn-warning">
                                                                    Edit
                                                                </button>
                                                            </Link>
                                                            {" "}
                                                            <button className="btn btn-danger" onClick={this.onDeleteBranch.bind(this, branch.id)}>
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
                            <div className="tab-pane fade" id="pills-profile" role="tabpanel"
                                 aria-labelledby="pills-profile-tab">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <Button className="addxx"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            component={Link} to={'/createManager'}
                                        >
                                            Add New Manager
                                        </Button>
                                    </div>
                                </div>
                                <br/>
                                <div>
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
                                            this.state.managers.map(manager => {
                                                return (
                                                    <tr scope={manager.id}>
                                                        <td>{manager.name}</td>
                                                        <td>{manager.email}</td>
                                                        <td>{manager.address}</td>
                                                        <td>
                                                            <Link to={'/manager/edit/'+ manager.id}>
                                                                <button
                                                                    className="btn btn-warning">
                                                                    Edit
                                                                </button>
                                                            </Link>
                                                            {" "}
                                                            <button className="btn btn-danger"
                                                                onClick={this.onDeleteManager.bind(this, manager.id)}>
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
                            <div className="tab-pane fade" id="pills-contact" role="tabpanel"
                                 aria-labelledby="pills-contact-tab">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <Button className="addxx"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            component={Link} to={'/createMember'}
                                        >
                                            Add New Member
                                        </Button>
                                    </div>
                                </div>
                                <br/>
                                <div>
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
                                            this.state.members.map(member => {
                                                return (
                                                    <tr scope={member.id}>
                                                        <td>{member.name}</td>
                                                        <td>{member.email}</td>
                                                        <td>{member.address}</td>
                                                        <td>
                                                            <Link to={'/member/edit/'+ member.id}>
                                                                <button
                                                                    className="btn btn-warning">
                                                                    Edit
                                                                </button>
                                                            </Link>
                                                            {" "}
                                                            <button className="btn btn-danger" onClick={this.onDeleteMember.bind(this, member.id)}>
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
                    </div>
                </div>
            </div>
        );
    }
}

export default EmployeePage;

