import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import { Plus, ShieldCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_SECTIONS } from '../../constants/navigation';
import { ROUTES } from '../../constants/routes';
import { colors, motion, neutral } from '../../styles/tokens';

function isItemActive(item, pathname) {
  if (pathname === item.to) return true;
  const isChild = pathname.startsWith(`${item.to}/`);
  const isExcluded = (item.excludes ?? []).some((path) => pathname.startsWith(path));
  return isChild && !isExcluded;
}

function NavItem({ item, active, collapsed, onNavigate }) {
  const Icon = item.icon;

  const button = (
    <ListItemButton
      component={Link}
      to={item.to}
      onClick={onNavigate}
      selected={active}
      aria-current={active ? 'page' : undefined}
      aria-label={collapsed ? item.label : undefined}
      sx={{
        position: 'relative',
        minHeight: 36,
        mb: 0.25,
        px: 1.5,
        borderRadius: '8px',
        justifyContent: collapsed ? 'center' : 'flex-start',
        color: neutral.textSecondary,
        transition: `background-color ${motion.duration.fast}s ${motion.cssEasing}`,
        '&:hover': { backgroundColor: neutral.surfaceSubtle },
        '&.Mui-selected, &.Mui-selected:hover': {
          backgroundColor: colors.primary.tint,
          color: colors.primary.main,
        },
        '&.Mui-selected::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 8,
          bottom: 8,
          width: 3,
          borderRadius: 2,
          backgroundColor: colors.primary.main,
        },
      }}
    >
      <ListItemIcon
        sx={{ minWidth: collapsed ? 0 : 32, color: 'inherit', justifyContent: 'center' }}
      >
        <Icon size={18} strokeWidth={active ? 2.25 : 1.75} />
      </ListItemIcon>
      {!collapsed && (
        <ListItemText
          primary={item.label}
          slotProps={{ primary: { sx: { fontSize: 14, fontWeight: active ? 600 : 500 } } }}
        />
      )}
    </ListItemButton>
  );

  return collapsed ? (
    <Tooltip title={item.label} placement="right">
      {button}
    </Tooltip>
  ) : (
    button
  );
}

function Sidebar({ collapsed = false, onNavigate }) {
  const { pathname } = useLocation();

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      {/* Brand */}
      <Box
        component={Link}
        to={ROUTES.DASHBOARD}
        onClick={onNavigate}
        aria-label="ClaimsFlow home"
        sx={{
          height: 56,
          flexShrink: 0,
          px: collapsed ? 0 : 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          gap: 1.25,
          textDecoration: 'none',
          color: 'text.primary',
        }}
      >
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: '8px',
            display: 'grid',
            placeItems: 'center',
            color: '#fff',
            bgcolor: 'primary.main',
          }}
        >
          <ShieldCheck size={16} />
        </Box>
        {!collapsed && <Typography variant="h3">M&M Insurance</Typography>}
      </Box>

      {/* Primary action */}
      <Box sx={{ px: 1.5, pb: 1.5, display: 'flex', justifyContent: 'center' }}>
        {collapsed ? (
          <Tooltip title="File a claim" placement="right">
            <IconButton
              component={Link}
              to={ROUTES.NEW_CLAIM}
              onClick={onNavigate}
              aria-label="File a claim"
              sx={{
                width: 36,
                height: 36,
                borderRadius: '8px',
                color: '#fff',
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' },
              }}
            >
              <Plus size={18} />
            </IconButton>
          </Tooltip>
        ) : (
          <Button
            component={Link}
            to={ROUTES.NEW_CLAIM}
            onClick={onNavigate}
            variant="contained"
            fullWidth
            startIcon={<Plus size={16} />}
          >
            File a claim
          </Button>
        )}
      </Box>

      {/* Navigation */}
      <Box component="nav" aria-label="Main navigation" sx={{ flex: 1, overflowY: 'auto', px: 1.5, pb: 2 }}>
        {NAV_SECTIONS.map((section, index) => (
          <Box key={section.id} sx={{ mt: index === 0 ? 0 : 1.5 }}>
            {collapsed ? (
              index > 0 && <Divider sx={{ mb: 1.5 }} />
            ) : (
              <Typography variant="overline" color="text.tertiary" sx={{ px: 1.5, display: 'block', mb: 0.5 }}>
                {section.label}
              </Typography>
            )}
            <List disablePadding>
              {section.items.map((item) => (
                <NavItem
                  key={item.to}
                  item={item}
                  active={isItemActive(item, pathname)}
                  collapsed={collapsed}
                  onNavigate={onNavigate}
                />
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Sidebar;