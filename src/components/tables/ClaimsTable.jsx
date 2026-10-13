import {
  Box,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { ChevronRight } from 'lucide-react';
import { CLAIM_CATEGORIES } from '../../constants/claimCategories';
import { neutral } from '../../styles/tokens';
import { formatCurrency, formatDateTime, formatRelativeTime } from '../../utils/formatters';
import StatusBadge from '../common/StatusBadge';

const MONO = 'ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace';
const SKELETON_ROWS = 5;

const COLUMNS = [
  { id: 'claim', label: 'Claim' },
  { id: 'category', label: 'Category' },
  { id: 'status', label: 'Status' },
  { id: 'amount', label: 'Claimed', align: 'right' },
  { id: 'updated', label: 'Updated' },
  { id: 'open', label: '', width: 40 },
];

const headCellSx = {
  py: 1.25,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: neutral.textTertiary,
  bgcolor: neutral.surfaceSubtle,
  whiteSpace: 'nowrap',
};

const formatAmount = (value) => (value ? formatCurrency(value) : '-');

function CategoryLabel({ value }) {
  const category = CLAIM_CATEGORIES.find((item) => item.value === value);
  if (!category) return <Typography variant="body2">{value}</Typography>;
  const Icon = category.icon;

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
      <Icon size={16} />
      <Typography variant="body2" color="inherit">
        {category.label}
      </Typography>
    </Box>
  );
}

function ClaimsTable({ claims, loading, onRowClick, emptyState }) {
  const handleKeyDown = (event, claim) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onRowClick(claim);
    }
  };

  if (!loading && (!claims || claims.length === 0)) {
    return <Box sx={{ p: 4 }}>{emptyState}</Box>;
  }

  return (
    <>
      {/* Desktop table */}
      <TableContainer sx={{ display: { xs: 'none', md: 'block' } }}>
        <Table aria-label="Claims">
          <TableHead>
            <TableRow>
              {COLUMNS.map((column) => (
                <TableCell key={column.id} align={column.align} sx={headCellSx} style={{ width: column.width }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from({ length: SKELETON_ROWS }).map((_, index) => (
                  <TableRow key={index}>
                    {COLUMNS.map((column) => (
                      <TableCell key={column.id} sx={{ py: 2 }}>
                        {column.label && <Skeleton width={column.id === 'claim' ? '80%' : '60%'} />}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : claims.map((claim) => (
                  <TableRow
                    key={claim.id}
                    hover
                    tabIndex={0}
                    onClick={() => onRowClick(claim)}
                    onKeyDown={(event) => handleKeyDown(event, claim)}
                    sx={{
                      cursor: 'pointer',
                      '&:last-child td': { borderBottom: 0 },
                      '&.MuiTableRow-hover:hover': { bgcolor: '#F9FBFC' },
                    }}
                  >
                    <TableCell sx={{ py: 1.75, maxWidth: 320 }}>
                      <Typography variant="h4" sx={{ fontFamily: MONO, fontSize: 13 }}>
                        {claim.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {claim.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <CategoryLabel value={claim.category} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={claim.status} />
                    </TableCell>
                    <TableCell align="right" sx={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
                      {formatAmount(claim.claimedAmount)}
                    </TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }} title={formatDateTime(claim.updatedAt)}>
                      <Typography variant="body2" color="text.secondary">
                        {formatRelativeTime(claim.updatedAt)}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ color: neutral.textTertiary }}>
                      <ChevronRight size={16} />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Mobile cards */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Box key={index} sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Skeleton width="50%" />
                <Skeleton width="80%" />
                <Skeleton width="35%" />
              </Box>
            ))
          : claims.map((claim) => (
              <Box
                key={claim.id}
                role="button"
                tabIndex={0}
                onClick={() => onRowClick(claim)}
                onKeyDown={(event) => handleKeyDown(event, claim)}
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  borderBottom: 1,
                  borderColor: 'divider',
                  '&:last-child': { borderBottom: 0 },
                }}
              >
                <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                  <Typography variant="h4" sx={{ fontFamily: MONO, fontSize: 13 }}>
                    {claim.id}
                  </Typography>
                  <StatusBadge status={claim.status} size="small" />
                </Stack>
                <Typography variant="body2" color="text.secondary" noWrap sx={{ mt: 0.5 }}>
                  {claim.title}
                </Typography>
                <Stack direction="row" sx={{ mt: 1.25, alignItems: 'center', justifyContent: 'space-between' }}>
                  <CategoryLabel value={claim.category} />
                  <Typography variant="h4" sx={{ fontVariantNumeric: 'tabular-nums' }}>
                    {formatAmount(claim.claimedAmount)}
                  </Typography>
                </Stack>
                <Typography variant="caption" color="text.tertiary">
                  Updated {formatRelativeTime(claim.updatedAt)}
                </Typography>
              </Box>
            ))}
      </Box>

      {/* Footer */}
      {!loading && (
        <Box sx={{ px: 2, py: 1.25, borderTop: 1, borderColor: 'divider', bgcolor: neutral.surfaceSubtle }}>
          <Typography variant="caption" color="text.tertiary">
            {claims.length} {claims.length === 1 ? 'claim' : 'claims'}
          </Typography>
        </Box>
      )}
    </>
  );
}

export default ClaimsTable;