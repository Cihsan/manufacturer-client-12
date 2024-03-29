import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/AccessUser/Login';
import AdminPath from './Pages/AccessUser/AdminPath';
import ProtectedPath from './Pages/AccessUser/ProtectedPath';
import Register from './Pages/AccessUser/Register';
import AllBlog from './Pages/AllBlog/AllBlog';
import AddProduct from './Pages/DashBoard/Admin/AddProduct';
import MakeAdmin from './Pages/DashBoard/Admin/MakeAdmin';
import ManageAllOrders from './Pages/DashBoard/Admin/ManageAllOrders';
import ManageProducts from './Pages/DashBoard/Admin/ManageProducts';
import DashBoard from './Pages/DashBoard/DashBoard';
import AddReview from './Pages/DashBoard/User/AddReview';
import MyOrders from './Pages/DashBoard/User/MyOrders';
import MyProfile from './Pages/DashBoard/User/MyProfile';
import Home from './Pages/Home/Home';
import NotFound from './Pages/NotFound/NotFound';
import Portfolio from './Pages/Portfolio/Portfolio';
import Purchase from './Pages/Purchase/Purchase';
import Header from './Shared/Header';

function App() {
  const [dark, setDark] = useState(false)
  console.log(dark);
  return (
    <div className="App" data-theme={dark ? "light" : "dark"}>
      <Header dark={dark} setDark={setDark}></Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/blogs" element={<AllBlog />}></Route>
        <Route path="/portfolio" element={<Portfolio />}></Route>
        <Route path="/purchase/:id" element={<ProtectedPath><Purchase /></ProtectedPath> }></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route path='/dashboard' element={<ProtectedPath><DashBoard /></ProtectedPath>}>
          <Route index element={<MyOrders />}></Route>
          <Route path='add-review' element={<AddReview />}></Route>
          <Route path='my-profile' element={<MyProfile />}></Route>
          <Route path='add-product' element={<AddProduct />}></Route>
          <Route path='make-admin' element={<AdminPath><MakeAdmin /></AdminPath>}></Route>
          <Route path='manage-all-orders' element={<ManageAllOrders />}></Route>
          <Route path='manage-products' element={<ManageProducts />}></Route>

        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
