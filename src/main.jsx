import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './global.css';
import {ToastContainer, Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login/Login.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import PanelLayout from './layouts/PanelLayout/PanelLayout.jsx';
import Panel from './pages/Panel/Panel.jsx';
import Categories from './pages/Categories/Categories.jsx';
import Products from './pages/Products/Products.jsx';
import Tables from './pages/Tables/Tables.jsx';
import Users from './pages/Users/Users.jsx';
import Orders from './pages/Orders/Orders.jsx';
import Order from './pages/Order/Order.jsx';
import Main from './pages/Main/Main.jsx';
import Menu from './pages/Menu/Menu.jsx';
import Payments from './pages/Payments/Payments.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main/>,
    errorElement: <Main/>,
  },
  {
    path: '/:id',
    element: <Menu/>,
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    element: <RequireAuth>
      <PanelLayout/>
    </RequireAuth>,
    children: [
      {
        index: true,
        path: 'dashboard',
        element: <Panel/>,
      },
      {
        path: 'categories',
        element: <Categories/>,
      },
      {
        path: 'products',
        element: <Products/>,
      },
      {
        path: 'tables',
        element: <Tables/>,
      },
      {
        path: 'users',
        element: <Users/>,
      },
      {
        path: 'orders',
        element: <Orders/>,
      },
      {
        path: 'orders/:id',
        element: <Order/>,
      },
      {
        path: 'payments',
        element: <Payments/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router}/>
    <ToastContainer hideProgressBar closeOnClick transition={Zoom}
                    position={'bottom-right'}
                    autoClose={1500}
    />
  </>,
);
