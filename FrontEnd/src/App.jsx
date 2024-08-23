import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/sharepages/Header.jsx";
import Footer from "./components/sharepages/Footer.jsx";
import Homepage from "./components/pages/Homepage.jsx";
import SignIn from "./components/authority/SignIn.jsx";
import SignUp from "./components/authority/SignUp.jsx";
import Cart from "./components/pages/Cart.jsx";
import Order from "./components/pages/Order.jsx";
import Detail from "./components/pages/Detail.jsx";
import Report from "./components/pages/Report.jsx";
import ProductList from "./components/pages/ProductList.jsx";
import ProductDetail from "./components/pages/ProductDetail.jsx";
import CreateNewProduct from "./components/pages/admin/CreateNewProduct.jsx";
import ShowListProduct from "./components/pages/admin/ShowListProduct.jsx";
import UpdateProduct from "./components/pages/admin/UpdateProduct.jsx";
import ManageOrder from "./components/pages/admin/ManageOrder.jsx";
import OrderItemList from "./components/pages/admin/OrderItemList.jsx";
import SideBar from "./components/sharepages/SideBar.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import Profile from "./components/pages/Profile.jsx";
import StatisticsChart from './components/pages/admin/Chart.jsx';
import AdminRoute from "./contexts/AdminRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex">
          <AdminRoute>
            <SideBar />
          </AdminRoute>
          <div className="flex-1">
            <Header />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/logout" element={<SignUp />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<Order />} />
              <Route path="/detail" element={<Detail />} />
              <Route path="/report" element={<Report />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/profile/*" element={<Profile />} />

              {/* Bảo vệ các trang quản trị */}
              <Route path="/admin">
                <Route
                  path="create-new-product"
                  element={<CreateNewProduct />}
                />
                <Route
                  path="show-list-product"
                  element={
                    <AdminRoute>
                      <ShowListProduct />
                    </AdminRoute>
                  }
                />
                <Route
                  path="manage-orders"
                  element={
                    <AdminRoute>
                      <ManageOrder />
                    </AdminRoute>
                  }
                />
                <Route
                  path="order-items-list/:orderID"
                  element={
                    <AdminRoute>
                      <OrderItemList />
                    </AdminRoute>
                  }
                />
                <Route
                  path="edit-product/:productId"
                  element={<UpdateProduct />}
                />
                <Route path="statistics" element={<StatisticsChart />} />
          </Route>
            </Routes>
            <Footer />
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
