import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'
import NavBar_Admin from "./NavBar_Admin";
class Listing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }
    componentDidMount() {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/posts', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({posts: response.data.data});
            })
    }
    onDelete(post_id) {
        let token = localStorage.getItem('token');
        axios.delete('http://localhost:8000/api/post/' + post_id, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                let posts = this.state.posts;
                for (let i = 0; i < posts.length; i++) {
                    if (posts[i].id == post_id) {
                        posts.splice(i, 1);
                        this.setState({posts: posts})
                    }
                }
            })
    }
    ChangeDateFormate(x){
       let v= moment(x).format('DD/MM/YYYY , hh:mm:ss A');
       return v;
    }
    render() {
        return (
            <div className="container">
                <NavBar_Admin/>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-8">
                        <Button className="addxx"
                            fullWidth
                            variant="contained"
                            color="primary"
                            component={Link} to={'/createPost'}
                        >
                            Create New Note
                        </Button>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-8">
                        <div>
                            {
                                this.state.posts.map(post => {
                                    return (
                                        <div key={post.id}>
                                            <Card>
                                                <CardContent>
                                                    <Typography color="textSecondary" gutterBottom>
                                                    </Typography>
                                                    <Typography color="textSecondary">
                                                        {post.title}
                                                    </Typography>
                                                    <Typography variant="body2" component="p">
                                                        {post.body}
                                                        <br/>
                                                        <br/>
                                                        <b>Published at :</b> {this.ChangeDateFormate(post.created_at)
                                                        }
                                                    </Typography>
                                                </CardContent>
                                                <CardContent>
                                                    <Link to={'/post/edit/'+ post.id}>
                                                        <button
                                                            className="btn btn-warning">
                                                            Edit
                                                        </button>
                                                    </Link>
                                                    {" "}
                                                    <button className="btn btn-danger" onClick={this.onDelete.bind(this, post.id)}>
                                                              Delete
                                                    </button>
                                                </CardContent>
                                                <br/>
                                            </Card>
                                            <br/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Listing;

