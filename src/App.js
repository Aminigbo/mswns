import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Screen/Login';
import Create from './Screen/Create';
import Dashboard from './Screen/Dashboard';
import Sales from './Screen/Sales';
import Invoice from './Screen/Invoice';
import { PersistGate } from 'redux-persist/integration/react';
import store from './redux/store';
import { Provider } from 'react-redux';
import ProductSales from './Screen/product-sales';

// admin
import Dashboardadmin from "./Screen/admin/dashboard"
import SalesMgt from './Screen/admin/sales-mgt';
import StaffMgt from './Screen/admin/staff-mgt';
import ProductMgt from './Screen/admin/product-mgt';
import Payroll from './Screen/admin/Payroll';
import InvoiceMgt from './Screen/admin/invoice-mgt';
import WojiDashboard from './Screen/admin/woji-dashboard';
import MarketersMgt from './Screen/admin/marketers-mgt';
import Leave from './Screen/leave';
import WojiSalsesMgt from './Screen/admin/woji-salses-mgt';
import WojiInvoiceMgt from './Screen/admin/woji-invoice-mgt';
import MarketerDashboard from './Screen/marketer-dashboard';

function App() {
  return (
    <div className="App">
      <Provider store={store().store}>
        <PersistGate loading={null} persistor={store().persistor}>

          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/create' element={<Create />} />
            {/* <Route path='/dashboard' element={<Sales />} /> */}
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/Marketer-dashboard' element={<MarketerDashboard />} />
            <Route path='/sales' element={<Sales />} />
            <Route path='/apply-for-leave' element={<Leave />} />
            <Route path='/product-sales' element={<ProductSales />} />
            <Route path='/invoice' element={<Invoice />} />



            {/* Admin */}
            <Route path='/admin-dashboard' element={<Dashboardadmin />} />
            <Route path='/woji-dashboard' element={<WojiDashboard />} />
            <Route path='/admin-salse-management' element={<SalesMgt />} />
            <Route path='/woji-salse-management' element={<WojiSalsesMgt />} />
            <Route path='/admin-staff-management' element={<StaffMgt />} />
            <Route path='/admin-all-marketers' element={<MarketersMgt />} />
            <Route path='/admin-product-management' element={<ProductMgt />} />
            <Route path='/payroll' element={<Payroll />} />
            <Route path='/invoice-mgt' element={<InvoiceMgt />} />
            <Route path='/woji-invoice-mgt' element={<WojiInvoiceMgt />} />


          </Routes>
        </PersistGate>
      </Provider>
    </div >
  );
}

export default App;
