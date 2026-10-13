import { createBrowserRouter, Navigate } from 'react-router-dom';
import PageLoader from '../components/common/PageLoader';
import { ROUTES } from '../constants/routes';
import AppLayout from '../layouts/AppLayout';
import PublicLayout from '../layouts/PublicLayout';

// Wraps a dynamic import so the page is downloaded only when it is visited.
const page = (importer) => async () => {
  const module = await importer();
  return { Component: module.default };
};

const router = createBrowserRouter([
  {
    HydrateFallback: PageLoader,
    children: [
      // Public area
      {
        element: <PublicLayout />,
        children: [
          { path: ROUTES.LANDING, lazy: page(() => import('../pages/Landing/LandingPage')) },
          { path: ROUTES.LOGIN, lazy: page(() => import('../pages/Login/LoginPage')) },
        ],
      },

      // Customer app (route guards are added in a later step)
      {
        path: ROUTES.APP,
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to={ROUTES.DASHBOARD} replace /> },
          { path: ROUTES.DASHBOARD, lazy: page(() => import('../pages/Dashboard/DashboardPage')) },
          { path: ROUTES.NEW_CLAIM, lazy: page(() => import('../pages/NewClaim/NewClaimPage')) },
          { path: ROUTES.CLAIMS, lazy: page(() => import('../pages/ClaimsHistory/ClaimsHistoryPage')) },
          { path: ROUTES.CLAIM_DETAILS, lazy: page(() => import('../pages/ClaimDetails/ClaimDetailsPage')) },
          { path: ROUTES.TRACKING, lazy: page(() => import('../pages/ClaimTracking/ClaimTrackingPage')) },
          { path: ROUTES.TRACKING_DETAILS, lazy: page(() => import('../pages/ClaimTracking/ClaimTrackingPage')) },
          { path: ROUTES.DOCUMENTS, lazy: page(() => import('../pages/UploadDocuments/UploadDocumentsPage')) },
          { path: ROUTES.NOTIFICATIONS, lazy: page(() => import('../pages/Notifications/NotificationsPage')) },
          { path: ROUTES.FAQ, lazy: page(() => import('../pages/Faq/FaqPage')) },
          { path: ROUTES.PROCESS_GUIDE, lazy: page(() => import('../pages/ClaimsProcessGuide/ClaimsProcessGuidePage')) },
          { path: ROUTES.SUPPORT, lazy: page(() => import('../pages/SupportCenter/SupportCenterPage')) },
          { path: ROUTES.REPORTS, lazy: page(() => import('../pages/Reports/ReportsPage')) },
          { path: ROUTES.PROFILE, lazy: page(() => import('../pages/Profile/ProfilePage')) },
          { path: ROUTES.SETTINGS, lazy: page(() => import('../pages/Settings/SettingsPage')) },
        ],
      },

      // Anything else
      { path: '*', lazy: page(() => import('../pages/NotFound/NotFoundPage')) },
    ],
  },
]);

export default router;