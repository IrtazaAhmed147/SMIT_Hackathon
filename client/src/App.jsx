import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Navbar from './components/navbar/Navbar'
import Login from './pages/login/Login.jsx'
import Signup from './pages/signup/Signup.jsx'
import NotFound from './pages/notFound/NotFound.jsx'
import ProtectedRoute from './components/protectedRoute/protectedRoute.jsx'
import ProductPage from './pages/products/ProductPage.jsx'
import Otp from './pages/otp/Otp.jsx'
import { ToastContainer } from 'react-toastify'

function App() {



  return (
    <>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/otp' element={<Otp />} />


        <Route path='/' index element={
          // <ProtectedRoute>
          <>
            <Navbar />
            <Home />
          </>

        } />

        <Route path='/products' element={
          <ProtectedRoute>
            <>
              <Navbar />
              <ProductPage />
            </>
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
