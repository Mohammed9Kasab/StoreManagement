import React, {useState} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {useHistory} from 'react-router-dom';
import Pusher from "pusher-js";
import axios from "axios";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import SettingsPowerIcon from "@material-ui/icons/SettingsPower";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: theme,
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function NavBar_customer() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const [countDoneOrders,setCountDoneOrders]=useState(0)
    let pusher = new Pusher('64b0688286b9900e5b10', {
        cluster: 'ap2',
        forceTLS: true,
        encrypted: true
    });

    getCountOrders()

    let channel = pusher.subscribe('store-management');
    channel.bind('Send_DoneOrder_to_customer', function(data) {
        getCountOrders()
    })
    function getCountOrders(){
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/getDoneOrdersCount',{
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                setCountDoneOrders(response.data.count);
            })
    }
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Welcome {localStorage.getItem('user_name')} (Customer)
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <Divider/>
                <List  component="nav" aria-label="main mailbox folders">
                    <ListItem button selected={selectedIndex === 0}
                              onClick={(event) => {handleListItemClick(event, 0)
                                  history.push('/products')}}>
                        <ListItemIcon>
                            <FormatListBulletedIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Products"/>
                    </ListItem>
                    <ListItem button  selected={selectedIndex === 1}
                              onClick={(event) => {handleListItemClick(event, 1)
                                  setCountDoneOrders(0);
                                  history.push('/DoneOrders')}}>
                        <ListItemIcon>
                            <ShoppingCartIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Ready To Pick-up"/>
                        {countDoneOrders === 0 ? '' :
                            <ListItemIcon>
                                <span className="MuiIconButton-label float-lg-right text-danger">
                                <svg className="MuiSvgIcon-root"
                                     aria-hidden="true">
                                    <path
                                        d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path></svg><span
                                    className="MuiBadge-badge MuiBadge-anchorOriginTopRightRectangle MuiBadge-colorSecondary">
                                {countDoneOrders === 0 ? '' : countDoneOrders}
                            </span>
                            </span>
                            </ListItemIcon>
                        }
                    </ListItem>
                    {/*<ListItem button selected={selectedIndex === 1}*/}
                    {/*          onClick={(event) => {setCountDoneOrders(0);*/}
                    {/*              handleListItemClick(event, 1)*/}
                    {/*              history.push('/DoneOrders')}}>*/}
                    {/*    <ListItemIcon>*/}
                    {/*        <ShoppingCartIcon/>*/}
                    {/*    </ListItemIcon>*/}
                    {/*    <ListItemText primary="Ready To Pick-up"/>*/}
                    {/*    {countDoneOrders === 0 ?'':*/}
                    {/*        <ListItemIcon>*/}
                    {/*            <span className="MuiIconButton-label float-lg-right text-danger">*/}
                    {/*            <svg className="MuiSvgIcon-root"*/}
                    {/*                 aria-hidden="true">*/}
                    {/*                <path*/}
                    {/*                    d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path></svg><span*/}
                    {/*                className="MuiBadge-badge MuiBadge-anchorOriginTopRightRectangle MuiBadge-colorSecondary">*/}
                    {/*            {countDoneOrders === 0 ? '' : countDoneOrders}*/}
                    {/*        </span>*/}
                    {/*        </span>*/}
                    {/*        </ListItemIcon>*/}
                    {/*    }*/}
                    {/*</ListItem>*/}
                    <ListItem button selected={selectedIndex === 2}
                              onClick={(event) => {handleListItemClick(event, 2)
                                  history.push('/logout')}}>
                        <ListItemIcon>
                            <SettingsPowerIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Logout"/>
                    </ListItem>
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader}/>
            </main>
        </div>
    );
}
