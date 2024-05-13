import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Checkout from './pages/Checkout';
import SignUpPage from './pages/SignUpPage';
import CartPage from './pages/CartPage';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ProductDetailsPage from './pages/ProductDetailsPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';




const router = createBrowserRouter([
  {
    path: "/",
    element: (<Protected>
          <Home></Home>
      </Protected>),
  },
  {
    path: "/admin",
    element: (<ProtectedAdmin>
          <AdminHome></AdminHome>
      </ProtectedAdmin>),
  },
  {
    path: "/login",
    element:<LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element:<SignUpPage></SignUpPage>,
  },
  {
    path: "/cart",
    element:(<Protected>
      <CartPage></CartPage>
      </Protected>),
  },
  {
    path: "/checkout",
    element:(<Protected>
      <Checkout></Checkout>
    </Protected>),
  },
  {
    path: "/product-details/:id",
    element:(<Protected>
      <ProductDetailsPage></ProductDetailsPage>
    </Protected>),
  },
  {
    path: "/admin/product-details/:id",
    element:(<ProtectedAdmin>
      <AdminProductDetailPage></AdminProductDetailPage>
    </ProtectedAdmin>),
  },
  {
    path: "/admin/product-form",
    element:(<ProtectedAdmin>
      <AdminProductFormPage></AdminProductFormPage>
    </ProtectedAdmin>),
  },
  {
    path: "/admin/orders",
    element:(<ProtectedAdmin>
      <AdminOrdersPage></AdminOrdersPage>
    </ProtectedAdmin>),
  },
  {
    path: "/admin/product-form/edit/:id",
    element:(<ProtectedAdmin>
      <AdminProductFormPage></AdminProductFormPage>
    </ProtectedAdmin>),
  },
  {
    path: "*",
    element:<PageNotFound></PageNotFound>,
  },
  {
    path: "/order-success/:id",
    element:<OrderSuccessPage></OrderSuccessPage>,
  },
  {
    path: "/orders",
    element:<UserOrdersPage></UserOrdersPage>
  },
  {
    path: "/profile",
    element:<UserProfilePage></UserProfilePage>
  },
  {
    path: "/logout",
    element:<Logout></Logout>
  },

]);

function App() {
  const dispatch=useDispatch();
  const user=useSelector(selectLoggedInUser);
  // console.log('user->',user)
  useEffect(()=>{
    if(user)
    {
     dispatch(fetchItemsByUserIdAsync(user.id))
     dispatch(fetchLoggedInUserAsync(user.id))
    }
  },[dispatch,user])
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
