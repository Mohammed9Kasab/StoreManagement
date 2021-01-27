import React, {Component} from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from "moment";
import NavBar_StoreManager from "./NavBar_StoreManager";

class ListingInstruction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }
    componentDidMount() {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/InstructionForManager', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                this.setState({posts: response.data.data});
            })
    }
    ChangeDateFormate(x){
        let v= moment(x).format('DD/MM/YYYY , hh:mm:ss A');
        return v;
    }
    render() {
        return (
            <div className="container">
                <NavBar_StoreManager/>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-8">
                        <center><h1>Notes</h1></center>
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
                                                        <br/><br/>
                                                        Published at: {this.ChangeDateFormate(post.created_at)}
                                                    </Typography>
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

export default ListingInstruction;

