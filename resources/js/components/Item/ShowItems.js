import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import NavBar_Admin from "../Admin/NavBar_Admin";

class ShowItems extends Component {
    constructor(props) {
        super(props);
        this.onChangeCategoryName = this.onChangeCategoryName.bind(this)
        this.onChangeOriginName = this.onChangeOriginName.bind(this)
        this.onChangeChoiceName = this.onChangeChoiceName.bind(this)
        this.onChangeSizeName = this.onChangeSizeName.bind(this)
        this.onAddCategory = this.onAddCategory.bind(this)
        this.onAddOrigin = this.onAddOrigin.bind(this)
        this.onAddChoice = this.onAddChoice.bind(this)
        this.onAddSize = this.onAddSize.bind(this)
        this.onChangeUpdateCategoryName = this.onChangeUpdateCategoryName.bind(this)
        this.onChangeUpdateOriginName = this.onChangeUpdateOriginName.bind(this)
        this.onChangeUpdateChoiceName = this.onChangeUpdateChoiceName.bind(this)
        this.onChangeUpdateSizeName = this.onChangeUpdateSizeName.bind(this)
        this.state = {
            items: [],
            category_name: "",
            origin_name: "",
            choice_name: "",
            size_name: "",
            categories: [],
            origins: [],
            choices: [],
            sizes: [],
            update_category_name: "",
            update_origin_name: "",
            update_choice_name: "",
            update_size_name: "",
        }
    }
    onChangeUpdateCategoryName(event) {
        this.setState({update_category_name: event.target.value});
    }
    onChangeUpdateOriginName(event) {
        this.setState({update_origin_name: event.target.value});
    }
    onChangeUpdateChoiceName(event) {
        this.setState({update_choice_name: event.target.value});
    }
    onChangeUpdateSizeName(event) {
        this.setState({update_size_name: event.target.value});
    }
    onChangeCategoryName(event) {
        this.setState({category_name: event.target.value});
    }
    onChangeOriginName(event) {
        this.setState({origin_name: event.target.value});
    }
    onChangeChoiceName(event) {
        this.setState({choice_name: event.target.value});
    }
    onChangeSizeName(event) {
        this.setState({size_name: event.target.value});
    }
    onAddCategory(event) {
        event.preventDefault();
        const category = {
            category_name: this.state.category_name,
        }
        let token = localStorage.getItem('token');
        axios.post('http://localhost:8000/api/category/store', category, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.getCategories();
            })
    }
    onAddOrigin(event) {
        event.preventDefault();
        const origin = {
            origin_name: this.state.origin_name,
        }
        let token = localStorage.getItem('token');

        axios.post('http://localhost:8000/api/origin/store', origin, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.getOrigins()
            })
    }
    onAddChoice(event) {
        event.preventDefault();
        const choice = {
            choice_name: this.state.choice_name,
        }
        let token = localStorage.getItem('token');
        axios.post('http://localhost:8000/api/choice/store', choice, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.getChoices()
            })
    }
    onAddSize(event) {
        event.preventDefault();
        const size = {
            size_name: this.state.size_name,
        }
        let token = localStorage.getItem('token');
        axios.post('http://localhost:8000/api/size/store', size, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.getSizes()
            })
    }
    onDeleteCategory(category_id) {
        let token = localStorage.getItem('token');
        axios.delete('http://localhost:8000/api/category/' + category_id, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                let categories = this.state.categories;
                for (let i = 0; i < categories.length; i++) {
                    if (categories[i].id == category_id) {
                        categories.splice(i, 1);
                        this.setState({categories: categories})
                    }
                }
            })
    }
    onDeleteOrigin(origin_id) {
        let token = localStorage.getItem('token');
        axios.delete('http://localhost:8000/api/origin/' + origin_id, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                let origins = this.state.origins;
                for (let i = 0; i < origins.length; i++) {
                    if (origins[i].id == origin_id) {
                        origins.splice(i, 1);
                        this.setState({origins: origins})
                    }
                }
            })
    }
    onDeleteChoice(choice_id) {
        let token = localStorage.getItem('token');
        axios.delete('http://localhost:8000/api/choice/' + choice_id, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                let choices = this.state.choices;
                for (let i = 0; i < choices.length; i++) {
                    if (choices[i].id == choice_id) {
                        choices.splice(i, 1);
                        this.setState({choices: choices})
                    }
                }
            })
    }
    onDeleteSize(size_id) {
        let token = localStorage.getItem('token');
        axios.delete('http://localhost:8000/api/size/' + size_id, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                let sizes = this.state.sizes;
                for (let i = 0; i < sizes.length; i++) {
                    if (sizes[i].id == size_id) {
                        sizes.splice(i, 1);
                        this.setState({sizes: sizes})
                    }
                }
            })
    }
    getCategories() {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/categories', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({categories: response.data.data});
            })
    }
    getChoices() {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/choices', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({choices: response.data.data});
            })
    }
    getOrigins() {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/origins', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({origins: response.data.data});
            })
    }
    getSizes() {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/sizes', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({sizes: response.data.data});
            })
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
        this.getCategories()
        this.getChoices()
        this.getOrigins()
        this.getSizes()
        this.getItems()
    }
    onDelete(item_id) {
        let token = localStorage.getItem('token');
        axios.delete('http://localhost:8000/api/item/' + item_id, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                let items = this.state.items;
                for (let i = 0; i < items.length; i++) {
                    if (items[i].id == item_id) {
                        items.splice(i, 1);
                        this.setState({items: items})
                    }
                }
            })
    }
    updateCategory(id) {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/category/edit/' + id, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({update_category_name: response.data.name});
            })
    }
    onSubmitUpdateCategory(id) {
        const category = {
            update_category_name: this.state.update_category_name,
        }
        let token = localStorage.getItem('token');
        axios.put('http://localhost:8000/api/category/update/' + id, category, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                console.log(response.data)
            })
        this.getCategories()
        this.getItems()
    }
    updateOrigin(id) {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/origin/edit/' + id, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({update_origin_name: response.data.name});
            })
    }
    onSubmitUpdateOrigin(id) {
        const Origin = {
            update_origin_name: this.state.update_origin_name,
        }
        let token = localStorage.getItem('token');
        axios.put('http://localhost:8000/api/origin/update/' + id, Origin, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
            })
        this.getOrigins()
        this.getItems()
    }
    updateChoice(id) {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/choice/edit/' + id, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({update_choice_name: response.data.name});
            })
    }
    onSubmitUpdateChoice(id) {
        const choice = {
            update_choice_name: this.state.update_choice_name,
        }
        let token = localStorage.getItem('token');
        axios.put('http://localhost:8000/api/choice/update/' + id, choice, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                console.log(response.data)
            })
        this.getChoices()
        this.getItems()
    }
    updateSize(id) {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/size/edit/' + id, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({update_size_name: response.data.name});
            })
    }
    onSubmitUpdateSize(id) {
        const size = {
            update_size_name: this.state.update_size_name,
        }
        let token = localStorage.getItem('token');
        axios.put('http://localhost:8000/api/size/update/' + id, size, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                console.log(response.data)
            })
        this.getSizes()
        this.getItems()
    }
    render() {
        return (
            <div className="container">
                <NavBar_Admin/>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10">
                        <div className="col-sm-12">
                            <ul className="nav nav-pills mb-4" id="pills-tab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="pills-items-tab" data-toggle="pill"
                                       href="#pills-items"
                                       role="tab" aria-controls="pills-items" aria-selected="true"><b>Items</b></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link " id="pills-category-tab" data-toggle="pill"
                                       href="#pills-category"
                                       role="tab" aria-controls="pills-category" aria-selected="false"><b>Categories</b></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="pills-origin-tab" data-toggle="pill"
                                       href="#pills-origin"
                                       role="tab" aria-controls="pills-origin" aria-selected="false"><b>Origins</b></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="pills-choice-tab" data-toggle="pill"
                                       href="#pills-choice"
                                       role="tab" aria-controls="pills-choice" aria-selected="false"><b>Choices</b></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="pills-size-tab" data-toggle="pill" href="#pills-size"
                                       role="tab" aria-controls="pills-size" aria-selected="false"><b>Sizes</b></a>
                                </li>
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-items" role="tabpanel"
                                     aria-labelledby="pills-items-tab">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <Button className="addxx"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                component={Link} to={'/createItem'}
                                            >
                                                Add New Item
                                            </Button>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Size</th>
                                                    <th scope="col">Category</th>
                                                    <th scope="col">Origin</th>
                                                    <th scope="col">Choice</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.items.map(item => {
                                                        return (
                                                            <tr>
                                                                <th scope="row">{item.id}</th>
                                                                <td>{item.name}</td>
                                                                <td>{item.size_name}</td>
                                                                <td>{item.category_name}</td>
                                                                <td>{item.origin_name}</td>
                                                                <td>{item.choice_name}</td>
                                                                <td>
                                                                    <Link to={'/item/edit/'+ item.id}>
                                                                        <button
                                                                            className="btn btn-warning">
                                                                            Edit
                                                                        </button>
                                                                    </Link>
                                                                    {" "}
                                                                    <button className="btn btn-danger" onClick={this.onDelete.bind(this, item.id)}>
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
                                <div className="tab-pane fade" id="pills-category" role="tabpanel"
                                     aria-labelledby="pills-category-tab">
                                    <form onSubmit={this.onAddCategory}>
                                        <input type="text" className="form-control"
                                               placeholder="Enter New Category"
                                               value={this.state.category_name}
                                               onChange={this.onChangeCategoryName}
                                               id="category"/>
                                        <br/>
                                        <button type="submit" className="btn btn-primary">Add New Category</button>
                                    </form>
                                    <br/>
                                    <div>
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.categories.map(category => {
                                                    return (
                                                        <tr>
                                                            <th scope="row">{category.id}</th>
                                                            <td>{category.name}</td>
                                                            <td>
                                                                <button type="button" className="btn btn-warning"
                                                                        data-toggle="modal"
                                                                        onClick={this.updateCategory.bind(this, category.id)}
                                                                        data-target={"#edit_category" + category.id}
                                                                        data-whatever="@mdo">Edit
                                                                </button>
                                                                <div style={{
                                                                    'position': 'absolute'
                                                                }}
                                                                     className="modal fade"
                                                                     id={"edit_category" + category.id} tabIndex="-2"
                                                                     role="dialog"
                                                                     aria-labelledby={"edit_category" + category.id}
                                                                     aria-hidden="true">
                                                                    <div className="modal-dialog" role="document">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title"
                                                                                    id={"edit_category" + category.id}>Edit
                                                                                    Category</h5>
                                                                                <button type="button" className="close"
                                                                                        data-dismiss="modal"
                                                                                        aria-label="Close">
                                                                                    <span
                                                                                        aria-hidden="true">&times;</span>
                                                                                </button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                <form>
                                                                                    <div className="form-group">
                                                                                        <label htmlFor="recipient-name"
                                                                                               className="col-form-label">Category
                                                                                            Name:</label>
                                                                                        <input type="text"
                                                                                               value={this.state.update_category_name}
                                                                                               onChange={this.onChangeUpdateCategoryName}
                                                                                               className="form-control"
                                                                                               id="recipient-name"/>
                                                                                    </div>
                                                                                    <div className="modal-footer">
                                                                                        <button type="button"
                                                                                                className="btn btn-secondary"
                                                                                                data-dismiss="modal">Close
                                                                                        </button>
                                                                                        <button type="button"
                                                                                                onClick={this.onSubmitUpdateCategory.bind(this, category.id)}
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
                                                                    onClick={this.onDeleteCategory.bind(this, category.id)}>
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
                                <div className="tab-pane fade" id="pills-origin" role="tabpanel"
                                     aria-labelledby="pills-origin-tab">
                                    <form onSubmit={this.onAddOrigin}>
                                        <input type="text" className="form-control"
                                               value={this.state.origin_name}
                                               onChange={this.onChangeOriginName}
                                               placeholder="Enter New Origin" id="origin"/>
                                        <br/>
                                        <button type="submit" className="btn btn-primary">Add New Origin</button>
                                    </form>
                                    <br/>
                                    <div>
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.origins.map(origin => {
                                                    return (
                                                        <tr>
                                                            <th scope="row">{origin.id}</th>
                                                            <td>{origin.name}</td>
                                                            <td>
                                                                <button type="button" className="btn btn-warning"
                                                                        data-toggle="modal"
                                                                        onClick={this.updateOrigin.bind(this, origin.id)}
                                                                        data-target={"#edit_origin" + origin.id}
                                                                        data-whatever="@mdo">Edit
                                                                </button>
                                                                <div style={{
                                                                    'position': 'absolute'
                                                                }}
                                                                     className="modal fade"
                                                                     id={"edit_origin" + origin.id} tabIndex="-2"
                                                                     role="dialog"
                                                                     aria-labelledby={"edit_origin" + origin.id}
                                                                     aria-hidden="true">
                                                                    <div className="modal-dialog" role="document">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title"
                                                                                    id={"edit_origin" + origin.id}>Edit
                                                                                    Origin</h5>
                                                                                <button type="button" className="close"
                                                                                        data-dismiss="modal"
                                                                                        aria-label="Close">
                                                                                    <span
                                                                                        aria-hidden="true">&times;</span>
                                                                                </button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                <form>
                                                                                    <div className="form-group">
                                                                                        <label htmlFor="recipient-name"
                                                                                               className="col-form-label">Origin
                                                                                            Name:</label>
                                                                                        <input type="text"
                                                                                               value={this.state.update_origin_name}
                                                                                               onChange={this.onChangeUpdateOriginName}
                                                                                               className="form-control"
                                                                                               id="recipient-name"/>
                                                                                    </div>
                                                                                    <div className="modal-footer">
                                                                                        <button type="button"
                                                                                                className="btn btn-secondary"
                                                                                                data-dismiss="modal">Close
                                                                                        </button>
                                                                                        <button type="button"
                                                                                                onClick={this.onSubmitUpdateOrigin.bind(this, origin.id)}
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
                                                                    onClick={this.onDeleteOrigin.bind(this, origin.id)}>
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
                                <div className="tab-pane fade" id="pills-choice" role="tabpanel"
                                     aria-labelledby="pills-choice-tab">
                                    <form onSubmit={this.onAddChoice}>
                                        <input type="text" className="form-control"
                                               value={this.state.choice_name}
                                               onChange={this.onChangeChoiceName}
                                               placeholder="Enter New choice" id="choice"/>
                                        <br/>
                                        <button type="submit" className="btn btn-primary">Add New Choice</button>
                                    </form>
                                    <br/>
                                    <div>
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.choices.map(choice => {
                                                    return (
                                                        <tr>
                                                            <th scope="row">{choice.id}</th>
                                                            <td>{choice.name}</td>
                                                            <td>
                                                                <button type="button" className="btn btn-warning"
                                                                        data-toggle="modal"
                                                                        onClick={this.updateChoice.bind(this, choice.id)}
                                                                        data-target={"#edit_choice" + choice.id}
                                                                        data-whatever="@mdo">Edit
                                                                </button>
                                                                <div style={{
                                                                    'position': 'absolute'
                                                                }}
                                                                     className="modal fade"
                                                                     id={"edit_choice" + choice.id} tabIndex="-2"
                                                                     role="dialog"
                                                                     aria-labelledby={"edit_choice" + choice.id}
                                                                     aria-hidden="true">
                                                                    <div className="modal-dialog" role="document">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title"
                                                                                    id={"edit_choice" + choice.id}>Edit
                                                                                    Choice</h5>
                                                                                <button type="button" className="close"
                                                                                        data-dismiss="modal"
                                                                                        aria-label="Close">
                                                                                    <span
                                                                                        aria-hidden="true">&times;</span>
                                                                                </button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                <form>
                                                                                    <div className="form-group">
                                                                                        <label htmlFor="recipient-name"
                                                                                               className="col-form-label">Choice
                                                                                            Name:</label>
                                                                                        <input type="text"
                                                                                               value={this.state.update_choice_name}
                                                                                               onChange={this.onChangeUpdateChoiceName}
                                                                                               className="form-control"
                                                                                               id="recipient-name"/>
                                                                                    </div>
                                                                                    <div className="modal-footer">
                                                                                        <button type="button"
                                                                                                className="btn btn-secondary"
                                                                                                data-dismiss="modal">Close
                                                                                        </button>
                                                                                        <button type="button"
                                                                                                onClick={this.onSubmitUpdateChoice.bind(this, choice.id)}
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
                                                                    onClick={this.onDeleteChoice.bind(this, choice.id)}>
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
                                <div className="tab-pane fade" id="pills-size" role="tabpanel"
                                     aria-labelledby="pills-size-tab">
                                    <form onSubmit={this.onAddSize}>
                                        <input type="text" className="form-control"
                                               value={this.state.size_name}
                                               onChange={this.onChangeSizeName}
                                               placeholder="Enter New Size" id="size"/>
                                        <br/>
                                        <button type="submit" className="btn btn-primary">Add New Size</button>
                                    </form>
                                    <br/>
                                    <div>
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.sizes.map(size => {
                                                    return (
                                                        <tr>
                                                            <th scope="row">{size.id}</th>
                                                            <td>{size.name}</td>
                                                            <td>
                                                                <button type="button" className="btn btn-warning"
                                                                        data-toggle="modal"
                                                                        onClick={this.updateSize.bind(this, size.id)}
                                                                        data-target={"#edit_size" + size.id}
                                                                        data-whatever="@mdo">Edit
                                                                </button>
                                                                <div style={{
                                                                    'position': 'absolute'
                                                                }}
                                                                     className="modal fade" id={"edit_size" + size.id}
                                                                     tabIndex="-2" role="dialog"
                                                                     aria-labelledby={"edit_size" + size.id}
                                                                     aria-hidden="true">
                                                                    <div className="modal-dialog" role="document">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title"
                                                                                    id={"edit_size" + size.id}>Edit
                                                                                    Size</h5>
                                                                                <button type="button" className="close"
                                                                                        data-dismiss="modal"
                                                                                        aria-label="Close">
                                                                                    <span
                                                                                        aria-hidden="true">&times;</span>
                                                                                </button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                <form>
                                                                                    <div className="form-group">
                                                                                        <label htmlFor="recipient-name"
                                                                                               className="col-form-label">Size
                                                                                            Name:</label>
                                                                                        <input type="text"
                                                                                               value={this.state.update_size_name}
                                                                                               onChange={this.onChangeUpdateSizeName}
                                                                                               className="form-control"
                                                                                               id="recipient-name"/>
                                                                                    </div>
                                                                                    <div className="modal-footer">
                                                                                        <button type="button"
                                                                                                className="btn btn-secondary"
                                                                                                data-dismiss="modal">Close
                                                                                        </button>
                                                                                        <button type="button"
                                                                                                onClick={this.onSubmitUpdateSize.bind(this, size.id)}
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
                                                                    onClick={this.onDeleteSize.bind(this, size.id)}>
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

            </div>
        );
    }
}

export default ShowItems;
