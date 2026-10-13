import {
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FilePlus2, Search, X } from 'lucide-react';
import { useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import EmptyState from '../../components/common/EmptyState';
import ClaimsTable from '../../components/tables/ClaimsTable';
import { CLAIM_CATEGORIES } from '../../constants/claimCategories';
import { CLAIM_STATUS, CLAIM_STATUS_META } from '../../constants/claimStatus';
import { ROUTES } from '../../constants/routes';
import useAsync from '../../hooks/useAsync';
import useDebounce from '../../hooks/useDebounce';
import { getClaims } from '../../services/claimService';

const selectSx = {
  width: { xs: '100%', md: 190 },
  '& .MuiOutlinedInput-input': { py: 1 },
};

function ClaimsHistoryPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const debouncedSearch = useDebounce(search);

  const { data: claims, loading } = useAsync(
    () => getClaims({ status, category, search: debouncedSearch }),
    [status, category, debouncedSearch],
  );

  const hasFilters = Boolean(search || status || category);
  const clearFilters = () => {
    setSearch('');
    setStatus('');
    setCategory('');
  };
  const openClaim = (claim) =>
    navigate(generatePath(ROUTES.CLAIM_DETAILS, { claimId: claim.id }));

  const emptyState = hasFilters ? (
    <EmptyState
      title="No claims found"
      description="No claims match your current filters. Try changing or clearing them."
      actionLabel="Clear filters"
      onAction={clearFilters}
    />
  ) : (
    <EmptyState
      title="No claims filed yet"
      description="When you file a claim, it will appear here with live status tracking."
      actionLabel="File your first claim"
      onAction={() => navigate(ROUTES.NEW_CLAIM)}
    />
  );

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}
      >
        <Box>
          <Typography variant="h1">My Claims</Typography>
          <Typography color="text.secondary">
            View, filter and track all your insurance claims.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<FilePlus2 size={16} />}
          onClick={() => navigate(ROUTES.NEW_CLAIM)}
        >
          File a claim
        </Button>
      </Stack>

      <Card sx={{ overflow: 'hidden' }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={1.5}
          sx={{ p: 2, alignItems: { md: 'center' }, borderBottom: 1, borderColor: 'divider' }}
        >
          <TextField
            placeholder="Search by claim ID, title or policy"
            size="small"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            sx={{ flex: 1, minWidth: 0, '& .MuiOutlinedInput-input': { py: 1 } }}
            slotProps={{
              htmlInput: { 'aria-label': 'Search claims' },
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={16} />
                  </InputAdornment>
                ),
                endAdornment: search && (
                  <InputAdornment position="end">
                    <IconButton size="small" aria-label="Clear search" onClick={() => setSearch('')}>
                      <X size={14} />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            select
            size="small"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            sx={selectSx}
            slotProps={{ select: { displayEmpty: true } }}
          >
            <MenuItem value="">All statuses</MenuItem>
            {Object.values(CLAIM_STATUS).map((value) => (
              <MenuItem key={value} value={value}>
                {CLAIM_STATUS_META[value].label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            size="small"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            sx={selectSx}
            slotProps={{ select: { displayEmpty: true } }}
          >
            <MenuItem value="">All categories</MenuItem>
            {CLAIM_CATEGORIES.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
          {hasFilters && (
            <Button variant="text" size="small" onClick={clearFilters} sx={{ flexShrink: 0 }}>
              Clear filters
            </Button>
          )}
        </Stack>

        <ClaimsTable
          claims={claims}
          loading={loading}
          onRowClick={openClaim}
          emptyState={emptyState}
        />
      </Card>
    </Stack>
  );
}

export default ClaimsHistoryPage;