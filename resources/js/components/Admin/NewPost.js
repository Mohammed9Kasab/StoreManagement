import React, {Component} from 'react';
import axios from 'axios';
import NavBar_Admin from "./NavBar_Admin";

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeTitle = this.onChangeTitle.bind(this)
        this.onChangeBody = this.onChangeBody.bind(this)
        this.state = {
            title: "",
            body: "",
        }
    }
    onChangeTitle(event) {
        this.setState({title: event.target.value});
    }
    onChangeBody(event) {
        this.setState({body: event.target.value});
    }
    onSubmit(event) {
        event.preventDefault();
        const post = {
            title: this.state.title,
            body: this.state.body,
        }
        let token = localStorage.getItem('token');
        axios.post('http://localhost:8000/api/post/store',post, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.props.history.push('/posts')
            })
    }
    render() {
        return (
            <div className="container">
                <NavBar_Admin/>
                <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                    New Note
                    <div>
                        <hr/>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="post title">Note Title</label>
                                <input type="text"
                                       className="form-control"
                                       id="post_title"
                                       value={this.state.title}
                                       onChange={this.onChangeTitle}
                                       placeholder="Enter Title"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Note Body</label>
                                <textarea  placeholder="Enter your Note"
                                           className="form-control"
                                           id="post_body"
                                           value={this.state.body}
                                           onChange={this.onChangeBody}
                                           rows="3">

                                </textarea>
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

export default NewPost;


