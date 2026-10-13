import { Box, Drawer, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MotionConfig, motion } from 'framer-motion';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import { motion as motionTokens } from '../styles/tokens';

const SIDEBAR_WIDTH = 248;
const SIDEBAR_WIDTH_COLLAPSED = 72;
const STORAGE_KEY = 'claimsflow.sidebarCollapsed';

// Temporary user and count. Replaced by AuthContext and the notifications service later.
const currentUser = { name: 'Priya Verma', email: 'priya.verma@example.com' };
const unreadNotifications = 3;

function readCollapsed() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function AppLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = () => {
    if (isMobile) {
      setMobileOpen(true);
      return;
    }
    const next = !collapsed;
    setCollapsed(next);
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      // Storage unavailable: the preference simply isn't remembered.
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Box
          component="a"
          href="#main-content"
          sx={{
            position: 'absolute',
            left: -9999,
            top: 8,
            zIndex: 2000,
            px: 2,
            py: 1,
            borderRadius: 1,
            color: '#fff',
            bgcolor: 'primary.main',
            '&:focus': { left: 16 },
          }}
        >
          Skip to main content
        </Box>

        {isMobile ? (
          <Drawer
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            slotProps={{ paper: { sx: { width: 280 } } }}
          >
            <Sidebar collapsed={false} onNavigate={() => setMobileOpen(false)} />
          </Drawer>
        ) : (
          <Box
            component="aside"
            sx={{
              width: collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH,
              flexShrink: 0,
              position: 'sticky',
              top: 0,
              height: '100vh',
              borderRight: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper',
              transition: `width ${motionTokens.duration.base}s ${motionTokens.cssEasing}`,
            }}
          >
            <Sidebar collapsed={collapsed} />
          </Box>
        )}

        <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <TopBar
            user={currentUser}
            unreadCount={unreadNotifications}
            isMobile={isMobile}
            collapsed={collapsed}
            onToggleSidebar={handleToggle}
          />
          <Box
            component="main"
            id="main-content"
            tabIndex={-1}
            sx={{ flex: 1, p: { xs: 2, md: 3 }, outline: 'none' }}
          >
            <Box sx={{ maxWidth: 1280, mx: 'auto' }}>
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: motionTokens.duration.base,
                  ease: motionTokens.easing.decelerate,
                }}
              >
                <Outlet />
              </motion.div>
            </Box>
          </Box>
        </Box>
      </Box>
    </MotionConfig>
  );
}

export default AppLayout;