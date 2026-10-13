import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { neutral, statusTones } from '../../styles/tokens';

function KpiCard({ label, value, trend, trendUp = true, icon: Icon }) {
  const trendTone = trendUp ? statusTones.success : statusTones.error;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography
              variant="overline"
              color="text.tertiary"
              sx={{ minWidth: 0, lineHeight: 1.3 }}
            >
              {label}
            </Typography>
            {Icon && (
              <Box
                aria-hidden="true"
                sx={{
                  width: 36,
                  height: 36,
                  flexShrink: 0,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: '8px',
                  color: neutral.textTertiary,
                  bgcolor: neutral.surfaceSubtle,
                }}
              >
                <Icon size={18} />
              </Box>
            )}
          </Stack>

          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography
              variant="h2"
              sx={{ fontSize: '1.75rem', fontWeight: 650, letterSpacing: '-0.02em', lineHeight: 1.1 }}
            >
              {value}
            </Typography>
            {trend && (
              <Typography
                variant="caption"
                sx={{
                  px: 0.75,
                  py: 0.25,
                  fontWeight: 600,
                  borderRadius: '6px',
                  bgcolor: trendTone.fill,
                  color: trendTone.text,
                }}
              >
                {trend}
              </Typography>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default KpiCard;