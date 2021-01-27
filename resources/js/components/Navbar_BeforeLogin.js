import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';
import NavBar_admin from "./Admin/NavBar_Admin";
import {useEffect} from 'react';
import {useContext} from 'react';
import {UserContext} from './UserContext';
import NavBar_customer from "./Customer/NavBar_Customer";
import NavBar_StoreManager from "./StoreManager/NavBar_StoreManager";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Navbar_BeforeLogin() {
    const classes = useStyles();
    let isloggedin = localStorage.getItem('isloggedin');
    let current_role = localStorage.getItem('role');
    const {user} = useContext(UserContext);
    useEffect(() => {
    }, [user]);
    if (user != "true" ) {
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Welcome
                        </Typography>
                        <Button color="inherit" component={Link} to={'/login'}>Login</Button>
                        <Button color="inherit" component={Link} to={'/register'}>Register</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    } else if (user == "true" && current_role == 'admin') {
        return (<NavBar_admin/>);
    } else if (isloggedin == "true" && current_role == 'moderator') {
        return (<NavBar_StoreManager/>);
    }else if (isloggedin == "true" && current_role == 'customer') {
        return (<NavBar_customer/>);
    }
}
