
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import DashBoard from './DashBoard';
import InvoicesNav from './Invoices/InvoicesNav';
import VoucherNav from './Vouchers/VouchersNav';
import Journalvouchers from './Vouchers/journalvouchers';
import Receipt from './Vouchers/Receipt';
import PurchaseVoucher from './Vouchers/PurchaseVoucher';
import PaymentVoucher from './Vouchers/PaymentVoucher';
import ContraVoucher from './Vouchers/ContraVoucher';
import BillInvoice from './Invoices/BillInvoice';
import Service from './Invoices/Service';
import Audittemp from './AuditTemp/Audittemp';
import Profitandloss from './Reports/Profitandloss';
import AuditReports from './Reports/AuditReport/AuditReports';
import Member from './Members/Member';
import Organization from './Society/organization';
import Ledgers from './Ledgers/Ledgers';
import TrialBal from './Reports/TrialBal';
import Signup from './Login_Signup/Signup';
import Login from './Login_Signup/Login';

function App() {
  return (

    <Router>
      <Routes>

        <Route index element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path="/" element={<Sidebar />}>

          <Route path="dashboard" element={<DashBoard />} />
          <Route path='members' element={<Member />} />
          <Route path='ledgers' element={<Ledgers />} />

          <Route path='/organization' element={<Organization />} />

          <Route path="invoice" element={<InvoicesNav />}>
            <Route path="billinvoice" element={<BillInvoice />} />
            <Route path="CreateService" element={<Service />} />
          </Route>
          {/* Vouchers */}
          <Route path="voucher" element={<VoucherNav />}>
            <Route path="journalvouchers" element={<Journalvouchers />} />
            <Route path="receiptvouchers" element={<Receipt />} />
            <Route path="purchasevoucher" element={<PurchaseVoucher />} />
            <Route path="paymentvoucher" element={<PaymentVoucher />} />
            <Route path="contravoucher" element={<ContraVoucher />} />

          </Route>

          <Route path="/auditTemplate" element={<Audittemp />} />
          <Route path="/profitloss" element={<Profitandloss />} />
          <Route path="/auditreport" element={<AuditReports />} />
          <Route path="/trialbalance" element={<TrialBal />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;