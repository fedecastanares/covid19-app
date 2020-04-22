import React, {useContext} from 'react';
import {Menu, MenuItem} from '@material-ui/core';
import {DataContext} from '../context/dataContext.js';

const UserMenu = () => {

    const { anchorEl, setAnchorEl } = useContext(DataContext);

    const handleClose = () => {
        setAnchorEl(null);
      };

    return ( 
        <Menu
            id="user-menu"
            anchorEl={anchorEl}
            keepMounted 
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
     );
}
 
export default UserMenu;