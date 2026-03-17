import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import DescriptionIcon from '@mui/icons-material/Description';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PaymentsIcon from '@mui/icons-material/Payments';

export const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <DashboardCustomizeRoundedIcon />,
    submenus: [],
  },


  {
    title: "Ledgers",
    path: '/ledgers',
    icon: <PersonAddAltIcon />,
  },


  {
    title: "Members",
    path: '/members',
    icon: <GroupIcon />,
  },

  {
    title: "Society",
    path: '/society',
    icon: <AccountBalanceIcon />,
    submenus: [
      {
        title: "Organization",
        path: "/organization",
        icon: <FiberManualRecordIcon sx={{ fontSize: 15 }} />,
      },

    ],
  },

    {
    title: "Vouchers",
    path: '/voucher/journalvouchers',
    icon: <PaymentsIcon />,
    submenus: [],
  },

  {
    title: "Invoice",
    path: '/invoice/billinvoice',
    icon: <ReceiptIcon />,
    submenus: [],
  },

  {
    title: "Audit Template",
    path: '/auditTemplate',
    icon: <DescriptionIcon />,
  },

  {
    title: "Reports",
    path: '/reports',
    icon: <SummarizeIcon />,
    submenus: [
      {
        title: "Profit & Loss",
        path: "/profitloss",
        icon: <FiberManualRecordIcon sx={{ fontSize: 15 }} />,
      },

       {
        title: "Trial Balance",
        path: "/trialbalance",
        icon: <FiberManualRecordIcon sx={{ fontSize: 15 }} />,
      },

      {
        title: "Audit Report",
        path: "/auditreport",
        icon: <FiberManualRecordIcon sx={{ fontSize: 15 }} />,
      },

    ],
  },

];
