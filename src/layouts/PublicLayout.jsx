import { Box, Stack, Typography } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const links = [
  ['Landing', ROUTES.LANDING],
  ['Login', ROUTES.LOGIN],
  ['Open customer app', ROUTES.DASHBOARD],
];

// Temporary shell. Step 5 builds the real public header and footer.
function PublicLayout() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Stack
        direction="row"
        spacing={3}
        sx={{
          px: 3,
          py: 1.5,
          alignItems: 'center',
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h3">ClaimsFlow</Typography>
        {links.map(([label, to]) => (
          <Box
            key={to}
            component={NavLink}
            to={to}
            end
            sx={{
              color: 'text.secondary',
              textDecoration: 'none',
              '&.active': { color: 'primary.main', fontWeight: 600 },
            }}
          >
            {label}
          </Box>
        ))}
      </Stack>
      <Box component="main" sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default PublicLayout;