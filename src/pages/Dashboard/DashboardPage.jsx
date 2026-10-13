
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FilePlus2,
  FileText,
  ShieldAlert,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import EmptyState from '../../components/common/EmptyState';
import KpiCard from '../../components/common/KpiCard';
import NextActionBanner from '../../components/common/NextActionBanner';
import StatusBadge from '../../components/common/StatusBadge';
import { ROUTES } from '../../constants/routes';
import useAsync from '../../hooks/useAsync';
import { getClaimStats, getClaims } from '../../services/claimService';
import { getPolicies } from '../../services/policyService';
import {
  formatCurrency,
  formatRelativeTime,
} from '../../utils/formatters';

function loadDashboard() {
  return Promise.all([
    getClaimStats(),
    getClaims(),
    getPolicies(),
  ]);
}

function DashboardPage() {
  const navigate = useNavigate();
  const { data, loading, error } = useAsync(loadDashboard);

  if (loading) {
    return (
      <Typography color="text.secondary">
        Loading dashboard...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography color="error">
        {error.message}
      </Typography>
    );
  }

  const [stats, claims, policies] = data;

  const activeClaims = claims.filter(
    (claim) =>
      claim.nextAction ||
      claim.status === 'documents_pending'
  );

  const actionItem = activeClaims[0]
    ? {
        claimId: activeClaims[0].id,
        title: 'Action required on claim',
        description: activeClaims[0].nextAction,
        buttonText: 'View details',
      }
    : null;

  return (
    <Stack
      spacing={{ xs: 2.5, md: 3 }}
      sx={{ width: '100%', minWidth: 0 }}
    >
      {/* Dashboard Header */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        gap={2}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h1">
            Good morning, Priya
          </Typography>

          <Typography color="text.secondary" variant="body1">
            Here is your claims and policy summary for today.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<FilePlus2 size={16} />}
          onClick={() => navigate(ROUTES.NEW_CLAIM)}
          sx={{
            display: { xs: 'none', sm: 'inline-flex' },
            flexShrink: 0,
          }}
        >
          File a claim
        </Button>
      </Stack>

      {/* Action Required Banner */}
      <NextActionBanner
        actionItem={actionItem}
        onAction={() =>
          activeClaims[0] &&
          navigate(`/app/claims/${activeClaims[0].id}`)
        }
      />

      {/* Dashboard Statistics */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            md: 'repeat(4, minmax(0, 1fr))',
          },
          gap: { xs: 1.5, md: 2 },
          minWidth: 0,
        }}
      >
        <KpiCard
          icon={Clock}
          label="Active Claims"
          value={stats.open}
        />

        <KpiCard
          icon={CheckCircle2}
          label="Approved Claims"
          value={stats.approved}
        />

        <KpiCard
          icon={FileText}
          label="Total Settlement"
          value={formatCurrency(stats.settlementValue)}
        />

        <KpiCard
          icon={ShieldAlert}
          label="Active Policies"
          value={policies.length}
        />
      </Box>

      {/* Recent Claims and My Policies */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            lg: 'minmax(0, 2fr) minmax(0, 1fr)',
          },
          gap: { xs: 2, md: 3 },
          alignItems: 'start',
          minWidth: 0,
        }}
      >
        {/* Recent Claims */}
        <Card sx={{ minWidth: 0, width: '100%' }}>
          <CardContent
            sx={{
              p: { xs: 2, sm: 3 },
              '&:last-child': {
                pb: { xs: 2, sm: 3 },
              },
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              gap={1}
              mb={2.5}
            >
              <Typography variant="h2">
                Recent Claims
              </Typography>

              <Button
                variant="text"
                size="small"
                endIcon={<ArrowRight size={14} />}
                onClick={() => navigate(ROUTES.CLAIMS)}
                sx={{ flexShrink: 0 }}
              >
                View all
              </Button>
            </Stack>

            {claims.length === 0 ? (
              <EmptyState
                title="No claims filed yet"
                description="When you file insurance claims, they will appear here with live status tracking."
                actionLabel="File your first claim"
                onAction={() => navigate(ROUTES.NEW_CLAIM)}
              />
            ) : (
              <Stack spacing={2.5} divider={<Divider />}>
                {claims.slice(0, 4).map((claim) => (
                  <Stack
                    key={claim.id}
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems={{
                      xs: 'flex-start',
                      sm: 'center',
                    }}
                    spacing={1}
                    sx={{
                      cursor: 'pointer',
                      py: 0.5,
                      minWidth: 0,
                      '&:hover': { opacity: 0.85 },
                    }}
                    onClick={() =>
                      navigate(`/app/claims/${claim.id}`)
                    }
                  >
                    <Stack
                      spacing={0.75}
                      sx={{
                        minWidth: 0,
                        flex: 1,
                        width: '100%',
                      }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1.5}
                        flexWrap="wrap"
                        useFlexGap
                      >
                        <Typography
                          variant="h4"
                          sx={{
                            fontFamily: 'monospace',
                            overflowWrap: 'anywhere',
                          }}
                        >
                          {claim.id}
                        </Typography>

                        <StatusBadge
                          status={claim.status}
                          size="small"
                        />
                      </Stack>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {claim.title}
                      </Typography>
                    </Stack>

                    <Stack
                      alignItems={{
                        xs: 'flex-start',
                        sm: 'flex-end',
                      }}
                      spacing={0.25}
                      sx={{ flexShrink: 0 }}
                    >
                      <Typography variant="h4">
                        {formatCurrency(claim.claimedAmount)}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.tertiary"
                      >
                        {formatRelativeTime(claim.updatedAt)}
                      </Typography>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>

        {/* Active Policies */}
        <Card sx={{ minWidth: 0, width: '100%' }}>
          <CardContent
            sx={{
              p: { xs: 2, sm: 3 },
              '&:last-child': {
                pb: { xs: 2, sm: 3 },
              },
            }}
          >
            {/* My Policies heading — active count removed */}
            <Box sx={{ mb: 2.5 }}>
              <Typography variant="h2">
                My Policies
              </Typography>
            </Box>

            {policies.length === 0 ? (
              <EmptyState
                title="No active policies"
                description="Your insurance policies will appear here when available."
              />
            ) : (
              <Stack spacing={2.5} divider={<Divider />}>
                {policies.map((policy) => (
                  <Stack
                    key={policy.policyNumber}
                    spacing={0.75}
                    sx={{
                      py: 0.5,
                      minWidth: 0,
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      gap={1}
                      sx={{ minWidth: 0 }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          flex: 1,
                          minWidth: 0,
                          overflowWrap: 'anywhere',
                        }}
                      >
                        {policy.productName}
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{
                          fontFamily: 'monospace',
                          color: 'text.secondary',
                          flexShrink: 0,
                          textAlign: 'right',
                        }}
                      >
                        {policy.policyNumber}
                      </Typography>
                    </Stack>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ overflowWrap: 'anywhere' }}
                    >
                      {policy.insuredItem}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
}

export default DashboardPage;
