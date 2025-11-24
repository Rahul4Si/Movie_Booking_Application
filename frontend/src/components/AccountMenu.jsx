import * as React from 'react'; 
import Box from '@mui/material/Box'; 
import Avatar from '@mui/material/Avatar'; 
import Menu from '@mui/material/Menu'; 
import MenuItem from '@mui/material/MenuItem'; 
import ListItemIcon from '@mui/material/ListItemIcon'; 
import Divider from '@mui/material/Divider'; 
import IconButton from '@mui/material/IconButton'; 
import Typography from '@mui/material/Typography'; 
import Tooltip from '@mui/material/Tooltip'; 
import PersonAdd from '@mui/icons-material/PersonAdd'; 
import Settings from '@mui/icons-material/Settings'; 
import Logout from '@mui/icons-material/Logout'; 
import { BookOpenTextIcon } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
 
export default function AccountMenu() { 
  const [anchorEl, setAnchorEl] = React.useState(null); 
  const navigate = useNavigate();
  const open = Boolean(anchorEl); 
  const handleClick = (event) => { 
    setAnchorEl(event.currentTarget); 
  }; 
  const handleClose = () => { 
    setAnchorEl(null); 
  };
  
  const handleLogout = () => { 
    localStorage.clear(); 
    window.location.href = "/"; 
  };


  return ( 
    <React.Fragment> 
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}> 
        <Tooltip title="Account settings"> 
          <IconButton 
            onClick={handleClick} 
            size="small" 
            sx={{ ml: 2 }} 
            aria-controls={open ? 'account-menu' : undefined} 
            aria-haspopup="true" 
            aria-expanded={open ? 'true' : undefined} 
          > 
            <Avatar sx={{ width: 28, height: 28, fontSize: '1rem' }}>M</Avatar> 
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
              '&::before': { 
                content: '""', 
                display: 'block', 
                position: 'absolute', 
                top: 0, 
                right: 14, 
                width: 10, 
                height: 10, 
                bgcolor: 'background.paper', 
                transform: 'translateY(-50%) rotate(45deg)', 
                zIndex: 0, 
              }, 
            }, 
          }, 
        }} 
        transformOrigin={{ horizontal: 'right', vertical: 'top' }} 
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} 
      > 
        <MenuItem sx={{ fontSize: '0.9rem', minHeight: 36 }}> 
          <Avatar sx={{ width: 24, height: 24, fontSize: '0.9rem' }} /> Profile 
        </MenuItem> 
        <MenuItem onClick={() => navigate("/mybookings")} sx={{ fontSize: '0.9rem', minHeight: 36 }}> 
          <BookOpenTextIcon size={20} style={{ marginRight: 8 }} className='text-gray-400' /> My Bookings 
        </MenuItem> 
        <Divider /> 
        <MenuItem onClick={handleLogout} sx={{ fontSize: '0.9rem', minHeight: 36 }}> 
          <ListItemIcon sx={{ minWidth: 30 }}> 
            <Logout fontSize="small" /> 
          </ListItemIcon> 
          Logout 
        </MenuItem> 
      </Menu> 
    </React.Fragment> 


  ); 


} 
