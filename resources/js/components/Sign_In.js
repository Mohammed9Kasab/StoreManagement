import React, {useContext} from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ReactDOM from 'react-dom';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log("entered makesignrequest");
    async function makeSignRequest() {
        console.log("entssssered makesignrequest");
        const Datato_Send = {
            email: email,
            password: password
        }
        if (password == '' || email == '') {
            alert('insert a valid value');
        }
        let res = await axios.post('http://localhost:8000/api/login', Datato_Send).catch(error => console.log(error));
        if (res.data != '') {
            if (res.data.data.token != null) {
                localStorage.setItem('isloggedin', true);
                localStorage.setItem('user_id', res.data.data.id);
                localStorage.setItem('user_name', res.data.data.name);
                localStorage.setItem('token', res.data.data.token);
                localStorage.setItem('role', res.data.data.user_role);
                let token = localStorage.getItem('token');
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            } else {
                alert("login failed");
                history.push('/login');
            }
            if (res.data.data.user_role == "admin") {
                history.push('/homepage_admin');
            }
            if (res.data.data.user_role == "customer") {
                history.push('/homepage_customer');
            }
            if (res.data.data.user_role == "moderator") {
                history.push('/homepage_manager');
            }
        } else {
            history.push('/login');
        }
    }
    function GoToRegisterPage() {
        history.push('/register');
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={makeSignRequest}
                    >
                        Sign In
                    </Button><br></br><br></br>
                    Sign Up for Your Own Organization !<br></br><br></br>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={GoToRegisterPage}>
                        Register
                    </Button>
                    <Grid container>
                        <Grid item>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
ReactDOM.render(<SignIn/>, document.getElementById('root'));



