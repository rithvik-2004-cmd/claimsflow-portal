import { Box, Button, Card, CardContent, Divider, Stack, Tab, Tabs, Typography } from '@mui/material';
import { AlertTriangle, ArrowLeft, CheckCircle, FileText, Upload } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StatusBadge from '../../components/common/StatusBadge';
import { ROUTES } from '../../constants/routes';
import useAsync from '../../hooks/useAsync';
import { getClaimById } from '../../services/claimService';
import { formatCurrency, formatDateTime } from '../../utils/formatters';

function ClaimDetailsPage() {
  const { claimId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);

  const { data: claim, loading, error } = useAsync(() => getClaimById(claimId), [claimId]);

  if (loading) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography color="text.secondary">Loading claim workspace...</Typography>
      </Box>
    );
  }
  
  if (error || !claim) {
    return (
      <Stack spacing={2} sx={{ maxWidth: 480, mt: 4 }}>
        <Typography variant="h2">Claim not found</Typography>
        <Typography color="text.secondary" variant="body2">
          Claim reference {claimId} could not be retrieved or does not exist.
        </Typography>
        <Button variant="outlined" onClick={() => navigate(ROUTES.CLAIMS)} sx={{ width: 'fit-content' }}>
          Back to claims history
        </Button>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      {/* Navigation Back */}
      <Box>
        <Button
          variant="text"
          size="small"
          startIcon={<ArrowLeft size={16} />}
          onClick={() => navigate(ROUTES.CLAIMS)}
          sx={{ px: 0, '&:hover': { bgcolor: 'transparent', opacity: 0.8 } }}
        >
          Back to claims
        </Button>
      </Box>

      {/* Highlights Panel */}
      <Card>
        <CardContent sx={{ p: 3.5 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'flex-start' }}
            gap={3}
          >
            <Stack spacing={1.5} sx={{ flex: 1, minWidth: 0 }}>
              <Stack direction="row" alignItems="center" spacing={2} flexWrap="wrap" useFlexGap>
                <Typography variant="h1" sx={{ fontFamily: 'monospace', fontSize: '1.5rem', letterSpacing: '-0.01em' }}>
                  {claim.id}
                </Typography>
                <StatusBadge status={claim.status} />
                <Typography variant="caption" color="text.tertiary" sx={{ textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                  {claim.category}
                </Typography>
              </Stack>
              <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                {claim.title}
              </Typography>
            </Stack>

            <Stack alignItems={{ xs: 'flex-start', md: 'flex-end' }} spacing={0.5} sx={{ pl: { md: 4 }, borderLeft: { md: '1px solid' }, borderColor: 'divider' }}>
              <Typography variant="overline" color="text.tertiary">Claimed Amount</Typography>
              <Typography variant="h2" sx={{ fontSize: '1.75rem', fontWeight: 650, letterSpacing: '-0.02em' }}>
                {formatCurrency(claim.claimedAmount)}
              </Typography>
            </Stack>
          </Stack>

          {/* Action Required Callout */}
          {claim.nextAction && (
            <Box
              sx={{
                mt: 3,
                p: 2.5,
                borderRadius: 2,
                bgcolor: '#FFFBEB',
                border: '1px solid #FDE68A',
                display: 'flex',
                alignItems: { xs: 'flex-start', sm: 'center' },
                justifyContent: 'space-between',
                gap: 2,
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Box sx={{ color: '#B45309', mt: 0.25, flexShrink: 0 }}>
                  <AlertTriangle size={20} />
                </Box>
                <Stack spacing={0.5}>
                  <Typography variant="h4" color="#78350F">Action required</Typography>
                  <Typography variant="body2" color="#92400E">{claim.nextAction}</Typography>
                </Stack>
              </Stack>
              <Button
                variant="contained"
                color="accent"
                size="small"
                onClick={() => navigate(ROUTES.DOCUMENTS)}
                sx={{ flexShrink: 0, alignSelf: { xs: 'stretch', sm: 'auto' } }}
              >
                Upload document
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Workspace Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={(_, val) => setTab(val)} sx={{ minHeight: 42 }}>
          <Tab label="Overview & Timeline" sx={{ minHeight: 42, textTransform: 'none', fontWeight: 600 }} />
          <Tab label="Documents" sx={{ minHeight: 42, textTransform: 'none', fontWeight: 600 }} />
          <Tab label="Policy & Details" sx={{ minHeight: 42, textTransform: 'none', fontWeight: 600 }} />
        </Tabs>
      </Box>

      {/* Tab 0: Timeline */}
      {tab === 0 && (
        <Card>
          <CardContent sx={{ p: 3.5 }}>
            <Typography variant="h2" mb={3}>Claim Progress & Activity</Typography>
            <Stack spacing={3}>
              {claim.timeline?.map((event, idx) => (
                <Stack key={event.id ?? idx} direction="row" spacing={2.5} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: 'primary.tint',
                      color: 'primary.main',
                      display: 'grid',
                      placeItems: 'center',
                      flexShrink: 0,
                      mt: 0.25,
                    }}
                  >
                    <CheckCircle size={16} />
                  </Box>
                  <Stack spacing={0.75} sx={{ flex: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" gap={2}>
                      <Typography variant="h4">{event.title}</Typography>
                      <Typography variant="caption" color="text.tertiary" sx={{ flexShrink: 0 }}>
                        {formatDateTime(event.at)}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">{event.detail}</Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Tab 1: Documents */}
      {tab === 1 && (
        <Card>
          <CardContent sx={{ p: 3.5 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h2">Attached Documents</Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Upload size={14} />}
                onClick={() => navigate(ROUTES.DOCUMENTS)}
              >
                Add Document
              </Button>
            </Stack>
            <Stack spacing={2} divider={<Divider />}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" py={1}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <FileText size={20} color="#64748B" />
                  <Stack spacing={0.25}>
                    <Typography variant="h4">Incident_Photos_And_Estimate.pdf</Typography>
                    <Typography variant="caption" color="text.tertiary">
                      Uploaded on {formatDateTime(claim.submittedAt)}
                    </Typography>
                  </Stack>
                </Stack>
                <StatusBadge status="approved" size="small" />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Tab 2: Policy & Details */}
      {tab === 2 && (
        <Card>
          <CardContent sx={{ p: 3.5 }}>
            <Typography variant="h2" mb={3}>Incident & Policy Information</Typography>
            <Stack spacing={2.5}>
              <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                <Typography variant="body2" color="text.secondary">Policy Number</Typography>
                <Typography variant="h4" sx={{ fontFamily: 'monospace' }}>{claim.policyNumber}</Typography>
              </Stack>
              <Divider />
              <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                <Typography variant="body2" color="text.secondary">Incident Date & Time</Typography>
                <Typography variant="h4">{claim.incidentDate} at {claim.incidentTime}</Typography>
              </Stack>
              <Divider />
              <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                <Typography variant="body2" color="text.secondary">Location</Typography>
                <Typography variant="h4" sx={{ textAlign: 'right', maxWidth: '60%' }}>{claim.location}</Typography>
              </Stack>
              <Divider />
              <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                <Typography variant="body2" color="text.secondary">Assigned Adjuster</Typography>
                <Typography variant="h4">{claim.adjuster ?? 'Not assigned yet'}</Typography>
              </Stack>
              <Divider />
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">Description</Typography>
                <Typography variant="body1" sx={{ color: 'text.primary', lineHeight: 1.6 }}>
                  {claim.description || 'No description provided.'}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}

export default ClaimDetailsPage;