import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import DescriptionIcon from '@mui/icons-material/Description';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PaymentsIcon from '@mui/icons-material/Payments';
import SettingsIcon from '@mui/icons-material/Settings';
export const menuItems = [
  {
    title: "Dashboard",
    path: "dashboard",
    icon: <DashboardCustomizeRoundedIcon />,
    submenus: [],
  },


  {
    title: "Ledgers",
    path: 'ledgers',
    icon: <PersonAddAltIcon />,
  },


  {
    title: "Members",
    path: 'members',
    icon: <GroupIcon />,
  },

  {
    title: "Society",
    path: '/society',
    icon: <AccountBalanceIcon />,
    submenus: [
      {
        title: "Organization",
        path: "app/organization",
        icon: <FiberManualRecordIcon sx={{ fontSize: 15 }} />,
      },

    ],
  },

  {
    title: "Vouchers",
    path: '/app/voucher/journalvouchers',
    icon: <PaymentsIcon />,
    submenus: [],
  },

  {
    title: "Invoice",
    path: '/app/invoice/billinvoice',
    icon: <ReceiptIcon />,
    submenus: [],
  },

  {
    title: "Audit Template",
    path: '/app/auditTemplate',
    icon: <DescriptionIcon />,
  },

  {
    title: "Reports",
    path: '/reports',
    icon: <SummarizeIcon />,
    submenus: [
      {
        title: "Profit & Loss",
        path: "/app/profitloss",
        icon: <FiberManualRecordIcon sx={{ fontSize: 15 }} />,
      },

      {
        title: "Trial Balance",
        path: "/app/trialbalance",
        icon: <FiberManualRecordIcon sx={{ fontSize: 15 }} />,
      },

      {
        title: "Audit Report",
        path: "/app/auditreport",
        icon: <FiberManualRecordIcon sx={{ fontSize: 15 }} />,
      },

    ],
  },


  {
    title: "Settings",
    path: 'settings',
    icon: <SettingsIcon />,
  },


];
