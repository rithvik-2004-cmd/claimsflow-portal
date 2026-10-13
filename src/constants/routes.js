// Single source of truth for every URL in the app.
// Use these constants in links and navigation instead of typing strings.
// For paths with parameters, use generatePath from react-router-dom:
//   generatePath(ROUTES.CLAIM_DETAILS, { claimId: 'CLM-2026-01042' })

export const ROUTES = {
  // Public
  LANDING: '/',
  LOGIN: '/login',

  // Customer app
  APP: '/app',
  DASHBOARD: '/app/dashboard',
  NEW_CLAIM: '/app/claims/new',
  CLAIMS: '/app/claims',
  CLAIM_DETAILS: '/app/claims/:claimId',
  TRACKING: '/app/tracking',
  TRACKING_DETAILS: '/app/tracking/:claimId',
  DOCUMENTS: '/app/documents',
  NOTIFICATIONS: '/app/notifications',
  FAQ: '/app/faq',
  PROCESS_GUIDE: '/app/process-guide',
  SUPPORT: '/app/support',
  REPORTS: '/app/reports',
  PROFILE: '/app/profile',
  SETTINGS: '/app/settings',
};