import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { AlertTriangle, ArrowRight } from 'lucide-react';

function NextActionBanner({ actionItem, onAction }) {
  if (!actionItem) {
    return (
      <Card
        sx={{
          bgcolor: 'success.fill',
          borderColor: 'success.border',
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: 'success.main',
                color: '#fff',
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0,
              }}
            >
              ✓
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h3" color="success.dark">
                You're all caught up
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No active claims require your attention right now.
                All submissions are proceeding smoothly.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        bgcolor: '#FFFBEB',
        border: '1px solid #FDE68A',
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -40,
          right: -40,
          width: 160,
          height: 160,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(245,158,11,0.15) 0%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <CardContent
        sx={{
          p: { xs: 2, sm: 2.5 },
          '&:last-child': { pb: { xs: 2, sm: 2.5 } },
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', md: 'center' }}
          spacing={2}
          sx={{ position: 'relative', minWidth: 0 }}
        >
          {/* Icon and claim information */}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ flex: 1, minWidth: 0 }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                minWidth: 48,
                borderRadius: '50%',
                bgcolor: '#FEF3C7',
                color: '#B45309',
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0,
              }}
            >
              <AlertTriangle size={24} />
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              {/* Title and claim ID */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={{ xs: 0.5, sm: 1.5 }}
                sx={{ minWidth: 0, mb: 0.5 }}
              >
                <Typography
                  variant="h3"
                  color="#78350F"
                  sx={{
                    minWidth: 0,
                    overflowWrap: 'anywhere',
                  }}
                >
                  {actionItem.title}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    color: '#92400E',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {actionItem.claimId}
                </Typography>
              </Stack>

              <Typography
                variant="body2"
                color="#92400E"
                sx={{ overflowWrap: 'anywhere' }}
              >
                {actionItem.description}
              </Typography>
            </Box>
          </Stack>

          {/* Action button */}
          <Button
            variant="contained"
            color="accent"
            endIcon={<ArrowRight size={16} />}
            onClick={onAction}
            sx={{
              flexShrink: 0,
              alignSelf: { xs: 'flex-start', md: 'center' },
              whiteSpace: 'nowrap',
              minHeight: 44,
              px: 2.5,
            }}
          >
            {actionItem.buttonText ?? 'Resolve now'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default NextActionBanner;