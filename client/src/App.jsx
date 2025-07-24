import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Layout from './layout/Layout';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute.jsx';

import Home from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';
import Signup from './pages/signup/Signup.jsx';
import Otp from './pages/otp/Otp.jsx';
import ProductPage from './pages/products/ProductPage.jsx';
import CreateProduct from './pages/createProduct/createProduct.jsx';
import NotFound from './pages/notFound/NotFound.jsx';

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />

        <Route element={<Layout />}>
          <Route index element={<Home />} />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/createProduct"
            element={
              <ProtectedRoute>
                <CreateProduct />
              </ProtectedRoute>
            }
          />
        </Route>

        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
