import {
  BadgeCheck,
  CalendarClock,
  CircleCheck,
  CircleX,
  Clock,
  Eye,
  FileWarning,
  Pencil,
  Search,
  Send,
} from 'lucide-react';

export const CLAIM_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  SURVEY_SCHEDULED: 'survey_scheduled',
  DOCUMENTS_PENDING: 'documents_pending',
  INVESTIGATION: 'investigation',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SETTLEMENT_PROCESSING: 'settlement_processing',
  SETTLED: 'settled',
};

// tone must match a key in statusTones (styles/tokens.js)
export const CLAIM_STATUS_META = {
  [CLAIM_STATUS.DRAFT]: {
    label: 'Draft',
    tone: 'neutral',
    icon: Pencil,
    description: 'Saved but not yet submitted.',
  },
  [CLAIM_STATUS.SUBMITTED]: {
    label: 'Submitted',
    tone: 'info',
    icon: Send,
    description: 'We have received your claim.',
  },
  [CLAIM_STATUS.UNDER_REVIEW]: {
    label: 'Under Review',
    tone: 'primary',
    icon: Eye,
    description: 'An adjuster is reviewing your claim.',
  },
  [CLAIM_STATUS.SURVEY_SCHEDULED]: {
    label: 'Survey Scheduled',
    tone: 'info',
    icon: CalendarClock,
    description: 'A surveyor visit has been scheduled.',
  },
  [CLAIM_STATUS.DOCUMENTS_PENDING]: {
    label: 'Documents Pending',
    tone: 'warning',
    icon: FileWarning,
    description: 'We need additional documents from you.',
  },
  [CLAIM_STATUS.INVESTIGATION]: {
    label: 'Investigation',
    tone: 'accent',
    icon: Search,
    description: 'The claim is being investigated in detail.',
  },
  [CLAIM_STATUS.APPROVED]: {
    label: 'Approved',
    tone: 'success',
    icon: CircleCheck,
    description: 'Your claim has been approved.',
  },
  [CLAIM_STATUS.REJECTED]: {
    label: 'Rejected',
    tone: 'error',
    icon: CircleX,
    description: 'Your claim could not be approved.',
  },
  [CLAIM_STATUS.SETTLEMENT_PROCESSING]: {
    label: 'Settlement Processing',
    tone: 'success',
    icon: Clock,
    description: 'Your payment is being processed.',
  },
  [CLAIM_STATUS.SETTLED]: {
    label: 'Settled',
    tone: 'success',
    icon: BadgeCheck,
    solid: true,
    description: 'Payment completed. The claim is settled.',
  },
};

// Stages shown in the progress tracker, in order.
export const CLAIM_STAGES = [
  'Submitted',
  'Under review',
  'Survey',
  'Investigation',
  'Decision',
  'Settlement',
  'Settled',
];

// Maps each status to its position in CLAIM_STAGES (-1 = not started).
export const STATUS_STAGE_INDEX = {
  [CLAIM_STATUS.DRAFT]: -1,
  [CLAIM_STATUS.SUBMITTED]: 0,
  [CLAIM_STATUS.UNDER_REVIEW]: 1,
  [CLAIM_STATUS.DOCUMENTS_PENDING]: 1,
  [CLAIM_STATUS.SURVEY_SCHEDULED]: 2,
  [CLAIM_STATUS.INVESTIGATION]: 3,
  [CLAIM_STATUS.APPROVED]: 4,
  [CLAIM_STATUS.REJECTED]: 4,
  [CLAIM_STATUS.SETTLEMENT_PROCESSING]: 5,
  [CLAIM_STATUS.SETTLED]: 6,
};

// Statuses that count as "open" for dashboard totals.
export const OPEN_STATUSES = [
  CLAIM_STATUS.SUBMITTED,
  CLAIM_STATUS.UNDER_REVIEW,
  CLAIM_STATUS.SURVEY_SCHEDULED,
  CLAIM_STATUS.DOCUMENTS_PENDING,
  CLAIM_STATUS.INVESTIGATION,
  CLAIM_STATUS.APPROVED,
  CLAIM_STATUS.SETTLEMENT_PROCESSING,
];

export const CLOSED_STATUSES = [CLAIM_STATUS.REJECTED, CLAIM_STATUS.SETTLED];