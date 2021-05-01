import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import SubjectOutlinedIcon from '@material-ui/icons/SubjectOutlined'
import { format } from "date-fns"

import React from 'react'
import { useHistory, useLocation } from 'react-router'
import { AppBar, Avatar, Toolbar } from '@material-ui/core'

const drawerWidth = 240

const useStyles = makeStyles( theme => {
    return{
        page:{
            backgroundColor:'#F9F9F9',
            width:'100%',
            padding:theme.spacing(3)
        },
        drawer:{
            width:drawerWidth
        },
        drawerPaper:{
            width:drawerWidth
        },
        root:{
            display:"flex"
        },
        active:{
            backgroundColor:'#F4F4F4'
        },
        title:{
            padding: theme.spacing(2)
        },
        appbar:{
            width:`calc(100% - ${drawerWidth}px)`
        },
        toolbar: theme.mixins.toolbar,
        date:{
            flexGrow: 1
        },
        avatar:{
            marginLeft: theme.spacing(2)
        }
    }
})

const Layout = ({ children }) => {

    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()

    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlinedIcon color="secondary"/>,
            path: '/'
        },
        {
            text: 'Create Notes',
            icon: <AddCircleOutlineOutlinedIcon color="secondary"/>,
            path: '/create'
        }
    ]

    return (
        <div className={classes.root}>

            <AppBar
                className={classes.appbar}
                elevation={0}
            >
                <Toolbar>
                    <Typography className={classes.date}>
                       Today is the {format(new Date(), 'do MMMM Y')}
                    </Typography>
                    <Typography>
                        Mario
                    </Typography>
                    <Avatar src="/mario-av.png" className={classes.avatar}/>
                </Toolbar>
            </AppBar>

            <Drawer 
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{ paper: classes.drawerPaper }}
                >

                <div>
                    <Typography variant="h5" className={classes.title}>
                        Nija notes
                    </Typography>
                </div>

                <List>
                    {menuItems.map( item => 
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => history.push(item.path)}
                            className={location.pathname === item.path ? classes.active : null}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItem>
                    )}
                </List>

            </Drawer>

            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>

        </div>
    )
}

export default Layout
