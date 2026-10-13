import {
  Bell,
  ChartColumn,
  CircleHelp,
  FilePlus2,
  FileText,
  FolderOpen,
  LayoutDashboard,
  LifeBuoy,
  Settings,
} from 'lucide-react';
import { ROUTES } from './routes';

// `excludes`: paths that should NOT mark this item active (e.g. /claims/new belongs to "New Claim").
export const NAV_SECTIONS = [
  {
    id: 'workspace',
    label: 'Workspace',
    items: [
      { label: 'Dashboard', to: ROUTES.DASHBOARD, icon: LayoutDashboard },
      { label: 'New Claim', to: ROUTES.NEW_CLAIM, icon: FilePlus2 },
      { label: 'Claims', to: ROUTES.CLAIMS, icon: FileText, excludes: [ROUTES.NEW_CLAIM] },
      { label: 'Documents', to: ROUTES.DOCUMENTS, icon: FolderOpen },
      { label: 'Notifications', to: ROUTES.NOTIFICATIONS, icon: Bell },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    items: [
      { label: 'FAQ', to: ROUTES.FAQ, icon: CircleHelp },
      { label: 'Reports', to: ROUTES.REPORTS, icon: ChartColumn },
    ],
  },
  {
    id: 'account',
    label: 'Account',
    items: [
      { label: 'Settings', to: ROUTES.SETTINGS, icon: Settings },
      { label: 'Help Center', to: ROUTES.SUPPORT, icon: LifeBuoy },
    ],
  },
];