
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import DashBoard from './DashBoard';
import InvoicesNav from './Invoices/InvoicesNav';
import BillInvoice from './Invoices/BillInvoice';
import Service from './Invoices/Service';
import Audittemp from './AuditTemp/Audittemp';
import Profitandloss from './Reports/Profitandloss';
import AuditReports from './Reports/AuditReport/AuditReports';
import Member from './Members/Member';

function App() {
  return (
    <Router>
      <Routes>
           <Route path="/" element={<Sidebar />}>
          
          <Route path="dashboard" element={<DashBoard />} />
          <Route path='members' element={<Member/>}/>
         
          <Route path="invoice" element={<InvoicesNav />}>
            <Route path="billinvoice" element={<BillInvoice />} />
            <Route path="CreateService" element={<Service />} />
          </Route> 
          
          <Route path="/auditTemplate" element={<Audittemp />} />
          <Route path="/profitloss" element={<Profitandloss />} />
         
          <Route path="/auditreport" element={<AuditReports />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;