import { Box, CircularProgress } from '@mui/material';

// Shown while the first page is being loaded.
// Replaced by skeleton screens in a later step.
function PageLoader() {
  return (
    <Box sx={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
      <CircularProgress size={28} aria-label="Loading" />
    </Box>
  );
}

export default PageLoader;