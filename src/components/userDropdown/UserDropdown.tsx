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
import SettingsIcon from '@mui/icons-material/Settings';
import { MdCancel } from 'react-icons/md';

import './userDropdown.css';
import { useGetUserQuery } from '@/services/features/user/userSlice';
import { useDispatch } from 'react-redux';
import { logout } from '@/services/features/auth/authSlice';
import Popup from '@/modals/popup/Popup';
import { AnimatePresence, motion } from 'framer-motion';
import NotificationToast from '../notificationToast/NotificationToast';

interface UserType {
  response: {
    email: string;
    profileImg: string;
    firstName: string;
    lastName: string;
  };
}

interface Props {
  darkmode: boolean;
  userData: UserType | undefined;
}

const UserDropdown: React.FC<Props> = ({ darkmode, userData }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
    navigate('/auth/login');
  };

  const userid = sessionStorage.getItem('id');

  const { data, isLoading } = useGetUserQuery(userid ? userid : '') as {
    data: UserType | undefined;
    error: undefined;
    isLoading: boolean;
  };

  const [showPopup, setShowPopup] = React.useState(false);
  const [form, setForm] = React.useState({
    name:
      userData &&
      `${userData?.response.firstName} ${userData?.response.lastName}`,
    email: userData && userData?.response?.email,
    subject: '',
    content: '',
  });

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const isFormValid =
    form.name &&
    form.email &&
    form.subject &&
    form.content &&
    form.name.length > 0 &&
    form.email.length > 0 &&
    form.subject.length > 0 &&
    form.content.length > 0;

  const [success, setIsSuccess] = React.useState(false);
  const handleSend = async () => {
    setIsSuccess(true);

    setForm({
      name: '',
      email: '',
      subject: '',
      content: '',
    });

    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="">
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
        <MenuItem
          onClick={() => navigate('/dashboard/profile/profile-settings')}
        >
          <ListItemIcon>
            <SettingsIcon color="disabled" fontSize="medium" />
          </ListItemIcon>
          Profile Settings
        </MenuItem>
        <MenuItem onClick={() => setShowPopup(true)}>
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
      <Popup popup={showPopup} darkmode={darkmode}>
        <div className="right">
          <div className="contact_us_form_title">
            Do you have further enquiries?
            <div
              className="help_centre_cancel_btn"
              onClick={() => setShowPopup(false)}
            >
              <MdCancel size={25} />
            </div>
          </div>
          <div className="contact_us_form_subTitle">
            We curated our FAQs to answer common questions, but if they didn't
            address our specific concern we're here to help.
          </div>
          <div className="contactus_form_top_section">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="contactus_form_top_section_second_input"
            />
          </div>
          <div className="contactus_form_input">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
            />
          </div>
          <textarea
            name="content"
            id=""
            className="contactus_textarea"
            placeholder="Content"
            value={form.content}
            onChange={handleChange}
          />
          <button
            disabled={!isFormValid}
            style={{
              backgroundColor: !isFormValid ? 'grey' : '',
              cursor: !isFormValid ? 'not-allowed' : 'pointer',
            }}
            onClick={handleSend}
            className="help_center_send_msg_btn"
          >
            Send Message
          </button>
        </div>
        {success && (
          <AnimatePresence>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5 }}
              className="notification-toast-wrapper"
            >
              <NotificationToast
                msg="Message sent 👍🏼! We will get back to you as soon as possible"
                toastType="info"
                cancel={() => setIsSuccess(false)}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </Popup>
    </React.Fragment>
  );
};

export default UserDropdown;
