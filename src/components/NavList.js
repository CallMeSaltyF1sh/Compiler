import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxHeight: 360,
    }
}));

const NavList = (props) => {
    const classes = useStyles();
    const { list } = props;

    return (
        <div className={classes.root}>
            <List component='nav'>
                {
                    list.map(item => (
                        <Link to={item.path} style={{ textDecoration: 'none', color: '#888' }}>
                            <ListItem button>
                                <ListItemIcon>
                                    <item.icon />
                                </ListItemIcon>
                                <ListItemText primary={item.sideBarName} />
                            </ListItem>
                        </Link>)
                    )
                }
            </List>
        </div>
    );
}

NavList.protoTypes = {
    list: PropTypes.array.isRequired
};

export default NavList;