import { Box, Button, Stack, Typography } from '@mui/material';
import { FolderOpen } from 'lucide-react';

function EmptyState({ title, description, actionLabel, onAction, icon: Icon = FolderOpen }) {
  return (
    <Box sx={{ textAlign: 'center', py: 6, px: 2 }}>
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: 2,
          bgcolor: 'primary.tint',
          color: 'primary.main',
          display: 'grid',
          placeItems: 'center',
          mx: 'auto',
          mb: 2,
        }}
      >
        <Icon size={24} />
      </Box>
      <Stack spacing={1} maxWidth={360} mx="auto" mb={actionLabel ? 2.5 : 0}>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Stack>
      {actionLabel && (
        <Button variant="contained" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}

export default EmptyState;