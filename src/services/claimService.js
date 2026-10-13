import { CLAIM_STATUS } from '../constants/claimStatus';
import { USE_MOCKS } from '../constants/env';
import claimsData from '../mock-data/claims.json';
import apiClient from './apiClient';
import { notFound, withLatency } from './mockUtils';

// In-memory copy so created claims show up everywhere during a session.
let claimsStore = [...claimsData];
let nextSequence = 1058;

const APPROVED_STATUSES = [
  CLAIM_STATUS.APPROVED,
  CLAIM_STATUS.SETTLEMENT_PROCESSING,
  CLAIM_STATUS.SETTLED,
];
const byUpdatedDesc = (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt);

function applyFilters(claims, { status, category, search } = {}) {
  const term = search?.trim().toLowerCase();
  return claims.filter((claim) => {
    if (status && claim.status !== status) return false;
    if (category && claim.category !== category) return false;
    if (term) {
      const haystack = `${claim.id} ${claim.title} ${claim.policyNumber}`.toLowerCase();
      if (!haystack.includes(term)) return false;
    }
    return true;
  });
}

// GET /claims?status=&category=&search=
export async function getClaims(filters) {
  if (!USE_MOCKS) {
    const { data } = await apiClient.get('/claims', { params: filters });
    return data;
  }
  return withLatency(() => applyFilters(claimsStore, filters).sort(byUpdatedDesc));
}

// GET /claims/:id
export async function getClaimById(id) {
  if (!USE_MOCKS) {
    const { data } = await apiClient.get(`/claims/${id}`);
    return data;
  }
  return withLatency(() => {
    const claim = claimsStore.find((item) => item.id === id);
    if (!claim) throw notFound(`Claim ${id} was not found`);
    return claim;
  });
}

// POST /claims
export async function createClaim(payload) {
  if (!USE_MOCKS) {
    const { data } = await apiClient.post('/claims', payload);
    return data;
  }
  return withLatency(() => {
    const now = new Date().toISOString();
    const claim = {
      description: '',
      claimedAmount: 0,
      approvedAmount: null,
      settledAmount: null,
      adjuster: null,
      nextAction: null,
      ...payload,
      id: `CLM-2026-${String(nextSequence++).padStart(5, '0')}`,
      status: CLAIM_STATUS.SUBMITTED,
      submittedAt: now,
      updatedAt: now,
      timeline: [
        { id: 't1', title: 'Claim submitted', detail: 'Claim registered successfully.', at: now },
      ],
    };
    claimsStore = [claim, ...claimsStore];
    return claim;
  }, 800);
}

// GET /claims/stats
export async function getClaimStats() {
  if (!USE_MOCKS) {
    const { data } = await apiClient.get('/claims/stats');
    return data;
  }
  return withLatency(() => {
    const count = (statuses) => claimsStore.filter((c) => statuses.includes(c.status)).length;
    return {
      total: claimsStore.length,
      open: count([
        CLAIM_STATUS.SUBMITTED,
        CLAIM_STATUS.UNDER_REVIEW,
        CLAIM_STATUS.SURVEY_SCHEDULED,
        CLAIM_STATUS.DOCUMENTS_PENDING,
        CLAIM_STATUS.INVESTIGATION,
        CLAIM_STATUS.APPROVED,
        CLAIM_STATUS.SETTLEMENT_PROCESSING,
      ]),
      closed: count([CLAIM_STATUS.REJECTED, CLAIM_STATUS.SETTLED]),
      approved: count(APPROVED_STATUSES),
      rejected: count([CLAIM_STATUS.REJECTED]),
      settlementValue: claimsStore.reduce((sum, c) => sum + (c.settledAmount ?? 0), 0),
      statusDistribution: Object.values(CLAIM_STATUS).map((status) => ({
        status,
        count: claimsStore.filter((c) => c.status === status).length,
      })),
    };
  });
}