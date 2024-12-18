import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoPersonSharp } from 'react-icons/io5';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';

import './userDropdown.css';
import { useGetUserQuery } from '@/services/features/user/userSlice';

interface UserType {
  response: {
    fullName: string;
    email: string;
    profileImg: string;
  };
}

export default function UserDropdown() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    setAnchorEl(null);
    navigate('/auth/login');
  };

  const userid = sessionStorage.getItem('id');

  const { data, isLoading } = useGetUserQuery(userid ? userid : '') as {
    data: UserType | undefined;
    error: undefined;
    isLoading: boolean;
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: '-3px' }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                backgroundColor: '#007BFF',
                color: 'white',
              }}
            >
              {isLoading || !data?.response.profileImg ? (
                <IoPersonSharp color="white" />
              ) : (
                <img
                  src={data?.response.profileImg}
                  alt=""
                  style={{
                    objectFit: 'contain',
                    width: '100%',
                    height: '100%',
                  }}
                />
              )}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            className: 'menu-arrow', // Apply the CSS class here
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <HelpIcon color="disabled" fontSize="medium" />
          </ListItemIcon>
          Help Center
        </MenuItem>
        <div className="logout_option">
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="medium" color="disabled" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </div>
      </Menu>
    </React.Fragment>
  );
}
