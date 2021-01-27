import React, {Component} from 'react';
import axios from 'axios';
import NavBar_Admin from "../Admin/NavBar_Admin";

class NewItem extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeOrigin = this.onChangeOrigin.bind(this)
        this.onChangeChoice = this.onChangeChoice.bind(this)
        this.onChangeSize = this.onChangeSize.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeCategory = this.onChangeCategory.bind(this)
        this.getFile = this.getFile.bind(this)
        this.state = {
            name: "",
            category_id: 0,
            categories: [],
            origin_id: 0,
            origins: [],
            choice_id: 0,
            size_id: 0,
            choices: [],
            sizes: [],
            selectedFile: {},
        }
    }
    getFile(event) {
        this.setState({selectedFile: event.target.files[0]})
        // console.log(event.target.files[0])
    }
    onChangeName(event) {
        this.setState({name: event.target.value});
    }
    onChangeCategory(event) {
        this.setState({category_id: event.target.value});
    }
    onChangeOrigin(event) {
        this.setState({origin_id: event.target.value});
    }
    onChangeChoice(event) {
        this.setState({choice_id: event.target.value});
    }
    onChangeSize(event) {
        this.setState({size_id: event.target.value});
    }
    componentDidMount() {
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
        axios.get('http://localhost:8000/api/choices', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({choices: response.data.data});
            })
        axios.get('http://localhost:8000/api/sizes', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({sizes: response.data.data});
            })
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
    onSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        const file = document.getElementById('product_image').files
        formData.append('name', this.state.name);
        formData.append('category_id', this.state.category_id);
        formData.append('origin_id', this.state.origin_id);
        formData.append('choice_id', this.state.choice_id);
        formData.append('size_id', this.state.size_id);
        formData.append('file', file[0]);
        // const item = {
        //     name: this.state.name,
        //     category_id: this.state.category_id,
        //     origin_id: this.state.origin_id,
        //     choice_id: this.state.choice_id,
        //     size_id: this.state.size_id,
        //     file:this.state.selectedFile
        // }
        let token = localStorage.getItem('token');
        axios.post('http://localhost:8000/api/item/store', formData, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.props.history.push('/items')
            })
    }
    render() {
        return (
            <div className="container">
                <NavBar_Admin/>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10">
                        New Item
                        <div>
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
                                    <label htmlFor="category">Category</label>
                                    <select id="category" value={this.state.category_id}
                                            onChange={this.onChangeCategory}
                                            className="form-control">
                                        <option>select a category</option>
                                        {
                                            this.state.categories.map(category => {
                                                return (
                                                    <option value={category.id}>{category.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="origin">Country of Origin</label>
                                    <select id="origin" value={this.state.origin_id}
                                            onChange={this.onChangeOrigin}
                                            className="form-control">
                                        <option>select the origin</option>
                                        {
                                            this.state.origins.map(origin => {
                                                return (
                                                    <option value={origin.id}>{origin.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="choice">Choice </label>
                                    <select id="choice" value={this.state.choice_id}
                                            onChange={this.onChangeChoice}
                                            className="form-control">
                                        <option>select the choice</option>
                                        {
                                            this.state.choices.map(choice => {
                                                return (
                                                    <option value={choice.id}>{choice.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="size">Size </label>
                                    <select id="size" value={this.state.size_id}
                                            onChange={this.onChangeSize}
                                            className="form-control">
                                        <option>select the size</option>
                                        {
                                            this.state.sizes.map(size => {
                                                return (
                                                    <option value={size.id}>{size.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input className='form-control'
                                           id={'product_image'}
                                           type="file"
                                           onChange={this.getFile}
                                    />
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

export default NewItem;


