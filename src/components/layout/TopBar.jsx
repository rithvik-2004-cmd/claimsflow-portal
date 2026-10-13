import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  InputAdornment,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Bell,
  LogOut,
  Menu as MenuIcon,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function TopBar({ user, unreadCount = 0, isMobile, collapsed, onToggleSidebar }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const closeMenu = () => setAnchorEl(null);
  const goTo = (path) => {
    closeMenu();
    navigate(path);
  };

  let ToggleIcon = MenuIcon;
  if (!isMobile) ToggleIcon = collapsed ? PanelLeftOpen : PanelLeftClose;

  let toggleLabel = 'Open navigation';
  if (!isMobile) toggleLabel = collapsed ? 'Expand sidebar' : 'Collapse sidebar';

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        height: 56,
        px: { xs: 1.5, md: 3 },
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'saturate(180%) blur(8px)',
      }}
    >
      <Tooltip title={toggleLabel}>
        <IconButton onClick={onToggleSidebar} aria-label={toggleLabel} size="small">
          <ToggleIcon size={18} />
        </IconButton>
      </Tooltip>

      <TextField
        placeholder="Search claims, policies, documents"
        size="small"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: 340,
          '& .MuiOutlinedInput-input': { py: 1 },
        }}
        slotProps={{
          htmlInput: { 'aria-label': 'Search' },
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search size={16} />
              </InputAdornment>
            ),
          },
        }}
      />

      <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Tooltip title="Notifications">
          <IconButton
            component={Link}
            to={ROUTES.NOTIFICATIONS}
            aria-label={`Notifications, ${unreadCount} unread`}
            size="small"
          >
            <Badge badgeContent={unreadCount} color="accent">
              <Bell size={18} />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="Account">
          <IconButton
            onClick={(event) => setAnchorEl(event.currentTarget)}
            aria-label="Open account menu"
            aria-haspopup="menu"
            aria-expanded={menuOpen ? 'true' : undefined}
            size="small"
            sx={{ ml: 0.5 }}
          >
            <Avatar sx={{ width: 32, height: 32, fontSize: 13, fontWeight: 600, bgcolor: 'primary.main' }}>
              {getInitials(user.name)}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={closeMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { mt: 1, minWidth: 220 } } }}
      >
        <Box sx={{ px: 2, py: 1.25 }}>
          <Typography variant="h4">{user.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={() => goTo(ROUTES.PROFILE)}>
          <ListItemIcon><User size={16} /></ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => goTo(ROUTES.SETTINGS)}>
          <ListItemIcon><Settings size={16} /></ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => goTo(ROUTES.LOGIN)}>
          <ListItemIcon><LogOut size={16} /></ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default TopBar;