import React, {useState} from 'react';
import clsx from 'clsx';
import {makeStyles, withStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import PeopleIcon from '@material-ui/icons/People';
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
import GroupIcon from '@material-ui/icons/Group';
import Pusher from "pusher-js";
import axios from "axios";
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import SettingsPowerIcon from '@material-ui/icons/SettingsPower';
import NotesIcon from '@material-ui/icons/Notes';
import AssessmentIcon from '@material-ui/icons/Assessment';

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

export default function NavBar_admin() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const [countNewOrders, setCountNewOrders] = useState(0)
    let pusher = new Pusher('64b0688286b9900e5b10', {
        cluster: 'ap2',
        forceTLS: true,
        encrypted: true
    });

    getCountOrders()

    let channel = pusher.subscribe('store-management');
    channel.bind('new-order', function (data) {
        getCountOrders()
    })

    function getCountOrders() {
        let token = localStorage.getItem('token');
        axios.get('http://localhost:8000/api/getUnreadOrdersCount', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token // token
            }
        })
            .then(response => {
                setCountNewOrders(response.data.count);
                console.log(response.data.count)
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
                        Welcome {localStorage.getItem('user_name')} (Admin)
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
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem button selected={selectedIndex === 0}
                                  onClick={(event) => {handleListItemClick(event, 0)
                                      history.push('/posts')}}>
                            <ListItemIcon>
                                <NotesIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Notes"/>
                        </ListItem>
                        <ListItem button selected={selectedIndex === 1}
                                  onClick={(event) => {handleListItemClick(event, 1)
                                      history.push('/customers')}}>
                            <ListItemIcon>
                                <PeopleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Customers"/>
                        </ListItem>
                        <ListItem button selected={selectedIndex === 2}
                                  onClick={(event) => {handleListItemClick(event, 2)
                                      history.push('/suppliers')}}>
                            <ListItemIcon>
                                <PeopleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Suppliers"/>
                        </ListItem>
                        <ListItem button selected={selectedIndex === 3}
                                  onClick={(event) => {handleListItemClick(event, 3)
                                      history.push('/employees')}}>
                            <ListItemIcon>
                                <GroupIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Employees"/>
                        </ListItem>
                        <ListItem button
                                  selected={selectedIndex === 4}
                                  onClick={(event) => {handleListItemClick(event, 4)
                                      history.push('/items')}}>
                            <ListItemIcon>
                                <FormatListBulletedIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Items"/>
                        </ListItem>
                        <ListItem button  selected={selectedIndex === 5}
                                  onClick={(event) => {handleListItemClick(event, 5)
                                      setCountNewOrders(0);
                                      history.push('/orders')}}>
                            <ListItemIcon>
                                <ShoppingCartIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Orders"/>
                            {countNewOrders === 0 ? '' :
                                <ListItemIcon>
                                <span className="MuiIconButton-label float-lg-right text-danger">
                                <svg className="MuiSvgIcon-root"
                                     aria-hidden="true">
                                    <path
                                        d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path></svg><span
                                    className="MuiBadge-badge MuiBadge-anchorOriginTopRightRectangle MuiBadge-colorSecondary">
                                {countNewOrders === 0 ? '' : countNewOrders}
                            </span>
                            </span>
                                </ListItemIcon>
                            }
                        </ListItem>

                        <ListItem button selected={selectedIndex === 6}
                                  onClick={(event) => {handleListItemClick(event, 6)
                                      history.push('/purchases')}}>
                            <ListItemIcon>
                                <AddShoppingCartIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Purchases"/>
                        </ListItem>
                        <ListItem button  selected={selectedIndex === 7}
                                  onClick={(event) => {handleListItemClick(event, 7)
                                      history.push('/reports')}}>
                            <ListItemIcon>
                                <AssessmentIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Reports"/>
                        </ListItem>
                        <ListItem button  selected={selectedIndex === 8}
                                  onClick={(event) => {handleListItemClick(event, 8)
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
