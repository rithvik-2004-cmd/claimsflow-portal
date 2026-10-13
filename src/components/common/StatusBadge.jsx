import { Box } from '@mui/material';
import { CLAIM_STATUS_META } from '../../constants/claimStatus';
import { statusTones } from '../../styles/tokens';

function StatusBadge({ status, size = 'medium' }) {
  const meta = CLAIM_STATUS_META[status];
  if (!meta) return null;

  const tone = statusTones[meta.tone];
  const Icon = meta.icon;
  const small = size === 'small';

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        height: small ? 20 : 24,
        px: 1,
        border: 1,
        borderRadius: '6px',
        borderColor: meta.solid ? tone.text : tone.border,
        bgcolor: meta.solid ? tone.text : tone.fill,
        color: meta.solid ? '#fff' : tone.text,
        fontSize: small ? 11 : 12,
        fontWeight: 600,
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      <Icon size={small ? 12 : 14} />
      {meta.label}
    </Box>
  );
}

export default StatusBadge;